import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./RetroVianda.css";
import { Helmet } from "react-helmet";

// Función para formatear la fecha a dd-MM-yyyy
const formatFecha = (date) => {
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JS empiezan desde 0
  const anio = date.getFullYear();
  return `${dia}-${mes}-${anio}`;
};

const RetroVianda = () => {
  const { id } = useParams(); // Obtener el ID del estudiante de la URL
  const navigate = useNavigate();
  const [opinion, setOpinion] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [reservaParaCalificar, setReservaParaCalificar] = useState(null); // Guardar la reserva que debe calificar
  const [mensaje, setMensaje] = useState(""); // Mostrar un mensaje si no hay reservas

  // Obtener la fecha actual formateada en dd-MM-yyyy
  const fechaActual = formatFecha(new Date());

  // Obtener la reserva que está en estado "RETIRADA" y corresponde a la fecha actual
  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/reservas/calificar/${id}` // Solo pasamos el ID del estudiante
        );
        
        const reserva = response.data;
        // Verificamos si la reserva tiene estado "RETIRADA" y es para la fecha de hoy
        if (reserva && reserva.estado === "RETIRADA" && reserva.fecha === fechaActual) {
          setReservaParaCalificar(reserva); // Si existe la reserva y cumple con las condiciones
        } else {
          setMensaje("No hay reservas para calificar hoy.");
        }
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
        setMensaje("Error al obtener la reserva.");
      }
    };

    fetchReserva();
  }, [id, fechaActual]);

  // Manejar el envío de la retroalimentación
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reservaParaCalificar) {
      return;
    }

    try {
      const updatedReserva = {
        ...reservaParaCalificar,
        opinion,
        calificacion,
      };

      // Actualizar la reserva en el backend
      await axios.put(
        `http://localhost:8080/reservas/${reservaParaCalificar.id}`,
        updatedReserva
      );

      alert("Retroalimentación enviada con éxito.");
      setOpinion("");
      setCalificacion("");
      navigate("/"); // Navegar a la página principal después de enviar la retroalimentación
    } catch (error) {
      console.error("Error al enviar la retroalimentación:", error);
      alert("Error al enviar la retroalimentación.");
    }
  };

  // Si no hay reservas para calificar, mostrar el mensaje
  if (mensaje) {
    return (
      <div className="container">
        <div className="alert alert-info text-center">{mensaje}</div>
        <div className="text-center mt-4">
          <button className="btn btn-back" onClick={() => navigate("/")}>
            Volver Atrás
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Retroalimentación</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <main className="page payment-page">
        <section className="payment-form dark">
          <div className="container">
            <div className="block-heading text-center d-flex align-items-center justify-content-center">
              <img
                src="/opiniones.png"
                alt="Icono de restaurante"
                className="menu-icon"
              />
              <h2>Retroalimentación</h2>
              <p>Por favor, comparte tu opinión sobre nuestro servicio.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="opinion-section">
                <h3 className="title">Deja tu opinión</h3>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Escribe tu opinión aquí..."
                  value={opinion}
                  onChange={(e) => setOpinion(e.target.value)}
                  required
                />
              </div>
              <div className="calificacion-section">
                <h3 className="title">Califica tu vianda</h3>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="Mala"
                      checked={calificacion === "Mala"}
                      onChange={(e) => setCalificacion(e.target.value)}
                      required
                    />
                    Mala
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="Buena"
                      checked={calificacion === "Buena"}
                      onChange={(e) => setCalificacion(e.target.value)}
                    />
                    Buena
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="Excelente"
                      checked={calificacion === "Excelente"}
                      onChange={(e) => setCalificacion(e.target.value)}
                    />
                    Excelente
                  </label>
                </div>
              </div>
              <div className="form-group col-sm-12">
                <button type="submit" className="btn btn-custom btn-block">
                  Enviar Opinión
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default RetroVianda;

