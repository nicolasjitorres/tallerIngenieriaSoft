import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HistorialReservas.css";
import { useParams } from "react-router-dom";

const HistorialReservas = () => {
  const { id } = useParams(); // Captura el id de la URL
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [currentPage, setCurrentPage] = useState(1); // Estado de la página actual
  const itemsPerPage = 3; // Cantidad de items por página
  const navigate = useNavigate();

  // Obtener la fecha actual en formato YYYY-MM-DD
  const obtenerFechaActual = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Asegura que el día tenga 2 dígitos
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son base 0, por lo que sumamos 1
    const year = today.getFullYear();
  
    return `${day}-${month}-${year}`; // Devuelve la fecha en formato DD-MM-YYYY
  };

  console.log(obtenerFechaActual());

  const fetchReservas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reservas");

      console.log("Respuesta de reservas:", response.data);
      console.log("ID del estudiante:", id);

      // Convertir el id de la URL a número
      const reservasDeEstudiante = response.data.filter(
        (reserva) => reserva.idEstudiante === parseInt(id, 10)
      );

      console.log("Reservas del estudiante:", reservasDeEstudiante);
      setReservas(reservasDeEstudiante);
    } catch (error) {
      setError(error);
      console.error("Error al obtener las reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(reservas);
  useEffect(() => {
    fetchReservas();
  }, []);

  // Calcular las reservas actuales según la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservas.slice(indexOfFirstItem, indexOfLastItem);

  // Total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reservas.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleVisualizar = (id) => {
    navigate(`/visualizar_reserva/${id}`); // Navega a la ruta de la reserva con el id seleccionado
  };

  const handleRetroalimentacion = (id) => {
    navigate(`/RetroVianda/${id}`); // Navega a la ruta de la reserva con el id seleccionado
  };

  const fechaActual = obtenerFechaActual();
  console.log(fechaActual); // Obtener la fecha actual

  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
      />
      <h2 className="title">Mi Historial de Reservas</h2>

      {loading && <p>Cargando reservas...</p>}
      {error && <p>Error al cargar las reservas: {error.message}</p>}

      {!loading && !error && (
        <>
          <table className="reserva-table">
            <thead>
              <tr>
                <th>ID Reserva</th>
                <th>Fecha de Reserva</th>
                <th>Estado de Reserva</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((reserva, index) => (
                <tr key={reserva.id}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{reserva.fecha}</td>
                  <td>{reserva.estado}</td>
                  <td>
                    <button
                      className="btn visualize-btn"
                      onClick={() => handleVisualizar(reserva.id)}
                    >
                      Visualizar
                    </button>
                    {/* Solo mostrar si la vianda fue retirada y la fecha de la reserva coincide con la actual */}
                    {reserva.estado === "RETIRADA" && reserva.fecha === fechaActual && (
                      <button
                        className="btn feedback-btn"
                        onClick={() => handleRetroalimentacion(reserva.id)}
                      >
                        Dar retroalimentación
                      </button>
                    )}
                  </td>
                </tr>
              ))}
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

export default HistorialReservas;
