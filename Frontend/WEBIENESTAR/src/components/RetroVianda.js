import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./RetroVianda.css";

const RetroVianda = () => {
  const { id } = useParams(); // Obtener el id de la reserva desde la URL
  const navigate = useNavigate();
  const [opinion, setOpinion] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [reservaParaCalificar, setReservaParaCalificar] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReserva = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reservas/${id}`);
      setReservaParaCalificar(response.data); // Asegúrate de usar response.data
    } catch (error) {
      setError(error);
      console.error("Error al obtener la reserva:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReserva();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario
    const confirmAprobar = window.confirm("¿Estás seguro de enviar la retroalimentación?");
    if (confirmAprobar) {
      try {
        // Enviar la retroalimentación
        await axios.put(`http://localhost:8080/reservas/retroalimentacion`, {
          id: id,
          calificacion: calificacion, // Asegúrate de enviar la calificación
          opinion: opinion // Asegúrate de enviar la opinión
        });

        // Mostrar un mensaje o manejar el estado si es necesario
        setMensaje("Retroalimentación enviada correctamente");
        // Navegar de vuelta a la vista anterior
        setTimeout(() => {
          navigate(-1); // Navegar hacia atrás
        }, 2000); // Esperar 2 segundos antes de navegar
      } catch (error) {
        console.error("Error al emitir la retroalimentación:", error);
      }
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
  );
};

export default RetroVianda;
