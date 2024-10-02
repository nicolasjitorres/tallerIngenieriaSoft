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

  // Obtener las inscripciones desde el backend al montar el componente
  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const response = await axios.get("http://localhost:8080/becascomedor");
        setInscripciones(response.data); // Guardar los datos obtenidos en el estado
        console.log("Datos recibidos:", response.data);
      } catch (error) {
        setError(error);
        console.error("Error al obtener las becas:", error);
      } finally {
        setLoading(false); // Cambiar el estado de carga
      }
    };

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

  // Funciones para manejar las acciones de los botones
  const handleAprobar = async (id) => {
    try {
      await axios.post(`http://localhost:8080/becascomedor/${id}/aprobar`);
      // Actualizar la inscripción localmente o recargar los datos
    } catch (error) {
      console.error("Error al aprobar la beca comedor:", error);
    }
  };

  const handleDenegar = async (id) => {
    try {
      await axios.post(`http://localhost:8080/becascomedor/${id}/denegar`);
      // Actualizar la inscripción localmente o recargar los datos
    } catch (error) {
      console.error("Error al denegar la inscripción:", error);
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
                      <span className="badge">{inscripcion.estado}</span>
                    </td>
                    <td>
                      <button
                        className="btn approve-btn"
                        onClick={() => handleAprobar(inscripcion.id)}
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
