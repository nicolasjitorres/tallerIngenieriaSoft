import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./RetroVianda.css";
import { Helmet } from "react-helmet";

// Función para formatear la fecha a dd-MM-yyyy
const formatFecha = (date) => {
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const anio = date.getFullYear();
  return `${dia}-${mes}-${anio}`;
};

const RetroVianda = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opinion, setOpinion] = useState("");
  const [calificacion, setCalificacion] = useState(""); 
  const [reservaParaCalificar, setReservaParaCalificar] = useState(null); 
  const [mensaje, setMensaje] = useState(""); 

  const fechaActual = formatFecha(new Date());

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/reservas/calificar/${id}`
        );

        if (response.status === 200 && response.data) {
          const reserva = response.data;
          if (reserva.estado === "RETIRADA" && reserva.fecha === fechaActual) {
            setReservaParaCalificar(reserva);
          } else {
            setMensaje("No hay reservas para calificar hoy.");
          }
        } else {
          setMensaje("No se encontraron reservas.");
        }
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
        setMensaje(error.response ? error.response.data : "Error desconocido.");
      }
    };

    fetchReserva();
  }, [id, fechaActual]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!reservaParaCalificar) {
      return; 
    }

    // Validar la calificación
    if (!opinion || calificacion === "") {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    const calificacionNumero = parseInt(calificacion, 10);
    if (isNaN(calificacionNumero) || calificacionNumero < 1 || calificacionNumero > 5) {
      alert("La calificación debe ser un número entre 1 y 5.");
      return;
    }

    try {
      const updatedReserva = {
        ...reservaParaCalificar,
        opinion,
        calificacion: calificacionNumero, 
      };

      console.log("Actualizando reserva:", updatedReserva);

      await axios.put(
        `http://localhost:8080/reservas/${reservaParaCalificar.id}`,
        updatedReserva,
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );

      alert("Retroalimentación enviada con éxito.");
      setOpinion(""); 
      setCalificacion(""); 
      navigate("/"); 
    } catch (error) {
      console.error("Error al enviar la retroalimentación:", error);
      alert(
        "Error al enviar la retroalimentación. " +
          (error.response ? error.response.data : "Error desconocido.")
      );
    }
  };

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
                  {Array.from({ length: 5 }, (_, i) => (
                    <label key={i + 1} className="radio-option">
                      <input
                        type="radio"
                        value={i + 1}
                        checked={calificacion === (i + 1).toString()}
                        onChange={(e) => setCalificacion(e.target.value)}
                        required
                      />
                      {i + 1}
                    </label>
                  ))}
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
