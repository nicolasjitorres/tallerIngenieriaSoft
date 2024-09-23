// ReservarVianda.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // Importar Helmet para manejar el <head>
import "./ReservarVianda.css";

const ReservarVianda = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación

  // Obtener la fecha actual
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDate = today.toLocaleDateString("es-ES", options);

  const handleRegisterClick = () => {
    navigate("/register"); // Redirige a la ruta de registro
  };

  const handleGoBack = () => {
    navigate(-1); // Navegar a la página anterior
  };

  return (
    <>
      {/* Helmet para manejar las etiquetas del <head> */}
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

      <body>
        <section className="pricing-table">
          <div className="container">
            <div className="block-heading text-center d-flex align-items-center justify-content-center">
              <img
                src="./restaurante.png" // Ruta relativa a la imagen en public
                alt="Icono de restaurante"
                className="menu-icon"
              />
              <h1 className="ml-2">Menú del día</h1>{" "}
              {/* Agregar margen izquierdo */}
            </div>
            <div className="row justify-content-md-center">
              <div className="col-md-5 col-lg-4">
                <div className="item">
                  <div className="ribbon">Más Elegido</div>
                  <div className="heading">
                    <h3>Clásico</h3>
                  </div>
                  <p>¡Que disfrutes tu elección!</p>
                  <div className="features">
                    <h4>
                      <span className="feature">Plato y Postre</span> :{" "}
                      <span className="value">
                        Pizza a la piedra y Flan con dulce de leche
                      </span>
                    </h4>
                  </div>
                  <div className="price">
                    <h4>$260</h4>
                  </div>
                  <button
                    className="btn btn-block btn-outline-primary"
                    type="submit"
                  >
                    Reservar
                  </button>
                </div>
              </div>
              <div className="col-md-5 col-lg-4">
                <div className="item">
                  <div className="heading">
                    <h3>Saludable</h3>
                  </div>
                  <p>¡Que disfrutes tu elección!</p>
                  <div className="features">
                    <h4>
                      <span className="feature">Plato y Postre</span> :{" "}
                      <span className="value">
                        Tarta de acelga y Dulce de Batata
                      </span>
                    </h4>
                  </div>
                  <div className="price">
                    <h4>$260</h4>
                  </div>
                  <button
                    className="btn btn-block btn-outline-primary"
                    type="submit"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>

            {/* Botón para volver atrás */}
            <div className="text-center mt-4">
              <button className="btn btn-back" onClick={() => navigate(-1)}>
                Volver Atrás
              </button>
            </div>
          </div>
        </section>
      </body>
    </>
  );
};

export default ReservarVianda;
