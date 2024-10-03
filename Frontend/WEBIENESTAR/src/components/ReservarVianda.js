import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import "./ReservarVianda.css";

const ReservarVianda = () => {
  const { id } = useParams(); // Captura el id del estudiante desde la URL
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [viandas, setViandas] = useState([]); // Estado para las viandas obtenidas del backend
  const [tieneReserva, setTieneReserva] = useState(false); // Estado para verificar la reserva del día
  const precioEstatico = 260; // Precio estático definido aquí

  // Obtener si el estudiante ya tiene una reserva del día actual
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const reservaResponse = await axios.get(
          `http://localhost:8080/reservas/verificar/${id}`
        );
        console.log(
          "Respuesta de verificación de reserva:",
          reservaResponse.data
        );
        setTieneReserva(reservaResponse.data); // Se espera que este sea un booleano
      } catch (error) {
        console.error("Error al verificar la reserva:", error);
      }
    };

    fetchReservas();
  }, [id]);

  // Obtener las viandas
  useEffect(() => {
    const fetchViandas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/viandas");
        setViandas(response.data); // Guardar los datos de las viandas en el estado
      } catch (error) {
        console.error("Error al obtener las viandas:", error);
      }
    };

    fetchViandas();
  }, []);

  // Manejar la reserva de vianda
  const handleReserve = async (vianda) => {
    if (vianda.cantidadDelDia <= 0) {
      alert("No hay más viandas disponibles para reservar.");
      return; // Si no hay más viandas, no se puede reservar
    }

    if (tieneReserva) {
      alert("Ya tienes una reserva para hoy.");
      return; // No permite realizar una nueva reserva si ya hay una para hoy
    }

    try {
      // Crear un objeto de reserva
      const reservaData = {
        fecha: new Date().toLocaleDateString("es-AR"), // Asegúrate de que sea en formato dd-MM-yyyy
        opinion: "",
        calificacion: "",
        estado: "RESERVADA",
        idEstudiante: id,
        idVianda: vianda.id,
      };

      // Realiza la solicitud POST para crear la reserva
      const response = await axios.post(
        `http://localhost:8080/reservas`,
        reservaData
      );

      // Manejo de la respuesta
      if (response.status === 201) {
        alert("Reserva realizada con éxito.");

        // Actualiza el estado de las viandas después de la reserva
        setViandas((prevViandas) =>
          prevViandas.map((v) =>
            v.id === vianda.id
              ? { ...v, cantidadDelDia: v.cantidadDelDia - 1 }
              : v
          )
        );

        // Recarga la página para reflejar cambios
        window.location.reload(); // Recarga la página completamente
      }
    } catch (error) {
      console.error(
        "Error al reservar la vianda:",
        error.response ? error.response.data : error
      );
      alert(
        "Hubo un error al realizar la reserva. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navegar a la página anterior
  };

  // Si el estudiante ya tiene una reserva para hoy, mostrar un mensaje y no cargar las viandas
  if (tieneReserva) {
    return (
      <div className="container">
        <div className="alert alert-info text-center">
          Ya tienes una reserva para el día de hoy.
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-back" onClick={handleGoBack}>
            Volver Atrás
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Menú del Día</title>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        />
        <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
      </Helmet>

      <section className="pricing-table">
        <div className="container">
          <div className="block-heading text-center d-flex align-items-center justify-content-center">
            <img
              src="/restaurante.png" // Ruta relativa a la imagen en public
              alt="Icono de restaurante"
              className="menu-icon"
            />
            <h1 className="ml-2">Menú del día</h1>{" "}
          </div>

          <div className="row justify-content-md-center">
            {viandas
              .filter((vianda) => vianda.cantidadDelDia > 0) // Mostrar solo viandas disponibles
              .map((vianda) => (
                <div key={vianda.id} className="col-md-5 col-lg-4">
                  <div className="item">
                    {vianda.tipo === "Clasico" && (
                      <div className="ribbon">Más Elegido</div>
                    )}
                    <div className="heading">
                      <h3>{vianda.tipo}</h3>
                    </div>
                    <p>¡Que disfrutes tu elección!</p>
                    <div className="features">
                      <h4>
                        <span className="feature">Plato y Postre</span> :{" "}
                        <span className="value">
                          {vianda.plato} y {vianda.postre}
                        </span>
                      </h4>
                    </div>
                    <div className="price">
                      <h4>${precioEstatico}</h4> {/* Precio estático */}
                    </div>
                    <button
                      className="btn btn-block btn-outline-primary"
                      type="button"
                      onClick={() => handleReserve(vianda)}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Botón para volver atrás */}
          <div className="text-center mt-4">
            <button className="btn btn-back" onClick={handleGoBack}>
              Volver Atrás
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReservarVianda;
