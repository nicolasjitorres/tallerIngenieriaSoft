import React, { useState, useEffect } from "react";
import axios from "axios";
import "./listaReservas.css";

const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [viandas, setViandas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Número de reservas por página

  // Obtiene la fecha actual en formato YYYY-MM-DD
  const obtenerFechaActual = () => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, "0");
    const day = String(hoy.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  // Filtra las reservas por la fecha actual
  const filtrarReservasPorFecha = (reservas) => {
    const fechaActual = obtenerFechaActual();
    return reservas.filter((reserva) => reserva.fecha === fechaActual);
  };

  const fetchEstudiantes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/estudiantes");
      setEstudiantes(response.data);
    } catch (error) {
      setError(error);
      console.error("Error al obtener las becas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);
  console.log(reservas);

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

  useEffect(() => {
    const fetchViandas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/viandas");
        setViandas(response.data); // Guardar los datos obtenidos en el estado
        console.log("Datos recibidos:", response.data);
      } catch (error) {
        setError(error);
        console.error("Error al obtener las viandas:", error);
      } finally {
        setLoading(false); // Cambiar el estado de carga
      }
    };

    fetchViandas();
  }, []);

  // Calcular las reservas actuales según la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservas.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reservas.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleEntregar = async (id) => {
    const confirmEntrega = window.confirm("¿Estás seguro de entregar la vianda?");
    if (confirmEntrega) {
        try {
            // Enviar el objeto que contiene el id y el estado que deseas establecer
            await axios.put(`http://localhost:8080/reservas`, { id: id, estado: 'ENTREGADA' }); // Asegúrate de usar el estado correcto
            await fetchReservas(); // Obtener la lista actualizada
        } catch (error) {
            console.error("Error al entregar la vianda:", error);
        }
    }
};

  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
      />
      <h2 className="title">Lista de Reservas del dia </h2>

      {loading && <p>Cargando reservas...</p>}
      {error && <p>Error al cargar las reservas: {error.message}</p>}

      {!loading && !error && (
        <>
          <table className="reserva-table">
            <thead>
              <tr>
                <th>ID reserva</th>
                <th>Nombre y Apellido</th>
                <th>Tipo de menú</th>
                <th>Plato</th>
                <th>Postre</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((reserva, index) => {
                const estudiante = estudiantes.find(
                  (est) => est.id === reserva.idEstudiante
                );

                const vianda = viandas.find(
                  (v) => v.id === reserva.idVianda // Cambia idVianda por la propiedad correspondiente en tu reserva
                );

                return (
                  <tr key={reserva.id}>
                    <td>{index + 1 + indexOfFirstItem}</td>
                    <td>
                      {estudiante
                        ? estudiante.nombre
                        : "Estudiante no encontrado"}
                    </td>
                    <td>{vianda ? vianda.tipo : "N/A"}</td>
                    <td>{vianda ? vianda.plato : "N/A"}</td>
                    <td>{vianda ? vianda.postre : "N/A"}</td>
                    <td>
                      <button
                        className="btn approve-btn"
                        onClick={() => handleEntregar(reserva.id)}
                      >
                        Entregar
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

export default ListaReservas;
