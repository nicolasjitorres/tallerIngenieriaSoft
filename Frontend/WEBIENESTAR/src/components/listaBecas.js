import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./listaBecas.css";

const ListaBecas = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]); // Estado para las inscripciones obtenidas del backend
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [currentPage, setCurrentPage] = useState(1); // Estado de la página actual
  const itemsPerPage = 3; // Cantidad de items por página
  const navigate = useNavigate();

  const fetchInscripciones = async () => {
    try {
      const response = await axios.get("http://localhost:8080/becascomedor");
      const inscripcionesEnEvaluacion = response.data.filter(inscripcion => inscripcion.estadoBeca === 'EN_EVALUACION');
      setInscripciones(inscripcionesEnEvaluacion);
    } catch (error) {
      setError(error);
      console.error("Error al obtener las becas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInscripciones();
  }, []);
  console.log(inscripciones);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/estudiantes");
        setEstudiantes(response.data); // Guardar los datos obtenidos en el estado
        console.log("Datos recibidos:", response.data);
      } catch (error) {
        setError(error);
        console.error("Error al obtener los estudiantes:", error);
      } finally {
        setLoading(false); // Cambiar el estado de carga
      }
    };

    fetchEstudiantes();
  }, []);

  // Calcular las inscripciones actuales según la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inscripciones.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(inscripciones.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleAprobar = async (id) => {
    const confirmAprobar = window.confirm("¿Estás seguro de aprobar esta beca?");
    if (confirmAprobar) {
      try {
        await axios.put(`http://localhost:8080/becascomedor/aprobar`, { id: id });
        await fetchInscripciones(); // Obtener la lista actualizada
      } catch (error) {
        console.error("Error al aprobar la beca comedor:", error);
      }
    }
  };
  
  const handleDenegar = async (id) => {
    const confirmDenegar = window.confirm("¿Estás seguro de denegar esta beca?");
    if (confirmDenegar) {
      try {
        await axios.put(`http://localhost:8080/becascomedor/denegar`, { id: id });
        await fetchInscripciones(); // Obtener la lista actualizada
      } catch (error) {
        console.error("Error al denegar la inscripción:", error);
      }
    }
  };

  const handleVisualizar = (id) => {
    navigate(`/visualizar_beca/${id}`); // Navega a la ruta de la inscripción seleccionada
  };

  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
      />
      <h2 className="title">Inscripciones Beca Comedor</h2>

      {loading && <p>Cargando inscripciones...</p>}
      {error && <p>Error al cargar las inscripciones: {error.message}</p>}

      {!loading && !error && (
        <>
          <table className="reserva-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((inscripcion, index) => {
                // Buscar al estudiante correspondiente al idEstudiante en inscripcion
                const estudiante = estudiantes.find(
                  (est) => est.id === inscripcion.idEstudiante
                );

                return (
                  <tr key={inscripcion.id}>
                    <td>{index + 1 + indexOfFirstItem}</td>
                    <td>
                      {estudiante
                        ? estudiante.nombre
                        : "Estudiante no encontrado"}
                    </td>
                    <td>{estudiante ? estudiante.carrera : "N/A"}</td>
                    <td>{estudiante ? estudiante.mail : "N/A"}</td>
                    <td>
                      <span className="badge">{inscripcion.estadoBeca}</span>
                    </td>
                    <td>
                      <button
                        className="btn approve-btn"
                        onClick={() => handleAprobar(inscripcion.id)} // Verifica que inscripcion.id no sea null
                      >
                        Aprobar
                      </button>
                      <button
                        className="btn deny-btn"
                        onClick={() => handleDenegar(inscripcion.id)}
                      >
                        Denegar
                      </button>
                      <button
                        className="btn visualize-btn"
                        onClick={() => handleVisualizar(inscripcion.id)}
                      >
                        Visualizar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <nav>
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default ListaBecas;
