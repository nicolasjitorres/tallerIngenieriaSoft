import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './HistorialReservas.css';

const HistorialReservas = () => {
  const { id } = useParams(); // Captura el id de la URL
  const [estudiante, setEstudiante] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los datos del estudiante y sus reservas
  const fetchDatos = useCallback(async () => {
    try {
      setLoading(true);
      const [estudianteResponse, reservasResponse] = await Promise.all([
        axios.get(`http://localhost:8080/estudiantes/${id}`),
        axios.get("http://localhost:8080/reservas"),
      ]);
      setEstudiante(estudianteResponse.data);
      setReservas(reservasResponse.data);
    } catch (error) {
      setError(error);
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false);
    }
  }, [id]); // Dependencia del id

  // useEffect para obtener los datos al cargar el componente
  useEffect(() => {
    fetchDatos(); // Llama a fetchDatos
  }, [fetchDatos]); // Incluye fetchDatos como dependencia

  // Filtra las reservas del estudiante actual
  const reservasEstudiante = reservas.filter((reserva) => reserva.estudianteId === estudiante?.id);

  if (loading) {
    return <div>Cargando información del estudiante y sus reservas...</div>;
  }

  if (error) {
    return <div>Error al cargar la información: {error.message}</div>;
  }

  return (
    <div>
      {estudiante ? (
        <div>
          <h1>Reservas de {estudiante.nombre}</h1>
          {reservasEstudiante.length > 0 ? (
            <ul>
              {reservasEstudiante.map((reserva) => (
                <li key={reserva.id}>
                  {reserva.fecha}: {reserva.vianda}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay reservas para este estudiante.</p>
          )}
        </div>
      ) : (
        <p>No se encontró el estudiante.</p>
      )}
    </div>
  );
};

export default HistorialReservas;
