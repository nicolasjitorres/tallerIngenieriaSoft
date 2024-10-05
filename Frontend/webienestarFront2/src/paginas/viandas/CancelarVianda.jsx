import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const CancelarVianda = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Asumiendo que id es el ID del estudiante
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [reserva, setReserva] = useState(null);

  // Obtener la reserva al cargar el componente
  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reservas/verificar/${id}`);
        if (response.data) {
          // Verificar si la reserva está cancelada
          if (response.data.estado === "CANCELADA") {
            setMensaje("No hay reservas para cancelar.");
            setTipoMensaje("warning");
            setReserva(null); // No hay reserva activa
          } else {
            setReserva(response.data); // Almacena la reserva con los detalles del plato y postre
          }
        } else {
          setMensaje("No hay reservas para cancelar.");
          setTipoMensaje("warning");
        }
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
        setMensaje("Error al verificar la reserva.");
        setTipoMensaje("error");
      }
    };

    fetchReserva();
  }, [id]);

  const handleCancelarClick = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/reservas/cancelar/${id}`);
      console.log("Respuesta de cancelación:", response.data);
      setMensaje("Reserva cancelada con éxito.");
      setTipoMensaje("success");
      setReserva(null); // Limpia la reserva después de cancelarla
      setTimeout(() => {
        navigate("/"); // Cambia a la página que desees
      }, 2000);
    } catch (error) {
      console.error("Error al cancelar la vianda:", error);
      if (error.response && error.response.status === 404) {
        setMensaje("No se encontró una reserva para cancelar.");
      } else {
        setMensaje(
          typeof error.response?.data === "string"
            ? error.response.data
            : "Ocurrió un error al cancelar la reserva."
        );
      }
      setTipoMensaje("error");
    }
  };

  const handleVolverAtras = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <>
      <Helmet>
        <title>Cancelar Vianda</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <main className="page payment-page">
        <section className="payment-form dark">
          <div className="container">
            <div className="block-heading text-center d-flex align-items-center justify-content-center">
              <h2>Cancelar Vianda</h2>
            </div>

            {reserva ? (
              <div className="cancelar-section d-flex align-items-center">
                <img
                  src="/reserva.png"
                  alt="Icono de restaurante"
                  className="menu-icon-c"
                />
                <div className="menu-details-c">
                  <h3 className="title">{reserva.vianda.tipo}</h3>
                  <div className="col-md-5 col-lg-4">
                    <div className="item">
                      <div className="features">
                        <h4>
                          <span className="feature">Plato</span>:{" "}
                          <span className="value">{reserva.vianda.plato}</span>
                        </h4>
                        <h4>
                          <span className="feature">Postre</span>:{" "}
                          <span className="value">{reserva.vianda.postre}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Solo muestra el mensaje si no hay reserva
              mensaje && (
                <div className="alert alert-warning text-center mt-3 no-reserva">
                  {mensaje}
                </div>
              )
            )}

            {mensaje && tipoMensaje !== "warning" && (
              <div className={`alert alert-${tipoMensaje} mt-3`} role="alert">
                {mensaje}
              </div>
            )}
          </div>
          <div className="button-group text-center">
            {reserva && (
              <button
                type="button"
                className="btn btn-white-c" // Cambiamos el botón "Cancelar" al estilo que proporcionaste
                onClick={handleCancelarClick}
              >
                Cancelar Reserva
              </button>
            )}
            <button
              type="button"
              className="btn btn-back" // Utiliza el estilo definido en tu CSS
              onClick={handleVolverAtras}
            >
              Volver Atrás
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default CancelarVianda;



