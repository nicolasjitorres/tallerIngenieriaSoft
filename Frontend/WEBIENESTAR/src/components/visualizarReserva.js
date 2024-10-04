import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './visualizarReserva.css';

const VisualizarReserva = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [reserva, setReserva] = useState(null); // Estado para la inscripción

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reservas/${id}`);
        setReserva(response.data); // Guardar los datos obtenidos del backend
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
      }
    };

    fetchReserva();
  }, [id]); // Ejecutar el efecto cuando cambie el ID

  if (!reserva) {
    return <div>Cargando...</div>; // Mostrar un mensaje mientras se cargan los datos
  }

  return (
    <div className="container mt-5">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
      />
      <h2 className="text-center">Visualizar Reserva</h2>
      <hr />
      <div className="form-group">
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          className="form-control"
          id="id"
          value={reserva.id}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="idVianda">Id Vianda:</label>
        <input
          type="text"
          className="form-control"
          id="idVianda"
          value={reserva.idVianda}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="fecha">Fecha de reserva:</label>
        <input
          type="text"
          className="form-control"
          id="fecha"
          value={reserva.fecha}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="opinion">Opinion:</label>
        <input
          type="text"
          className="form-control"
          id="opinion"
          value={reserva.opinion}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="calificacion">Calificacion de reserva:</label>
        <input
          type="text"
          className="form-control"
          id="calificacion"
          value={reserva.calificacion}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado de reserva:</label>
        <input
          type="text"
          className="form-control"
          id="estado"
          value={reserva.estado}
          readOnly
        />
      </div>
      <div className="text-center">
        <button
          className="btn btn-secondary"
          onClick={() => window.history.back()}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default VisualizarReserva;