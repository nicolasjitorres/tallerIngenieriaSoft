// CancelarVianda.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CancelarVianda.css";
import { Helmet } from "react-helmet";

const CancelarVianda = () => {
  const navigate = useNavigate();
  const [opinion, setOpinion] = useState("");
  const [calificacion, setCalificacion] = useState("");

  const handleRegisterClick = () => {
    navigate("/CancelarVianda");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(opinion, calificacion);
    setOpinion("");
    setCalificacion("");
  };

  return (
    <>
      <Helmet>
        <title>Reserva del dia 23 de Septiembre del 2024</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <main className="page payment-page">
        <section className="payment-form dark">
          <div className="container">
            <div className="block-heading text-center d-flex align-items-center justify-content-center">
              <h2>Reserva del dia 23 de Septiembre del 2024</h2>
            </div>
            <div className="cancelar-section d-flex align-items-center">
              <img
                src="./reserva.png"
                alt="Icono de restaurante"
                className="menu-icon-c"
              />
              <div className="menu-details-c">
              <h3 className="title"></h3>
                <div className="col-md-5 col-lg-4">
                  <div className="item">
                    <div className="features">
                      <h4>
                        <span className="feature">Menú</span>:{" "}
                        <span className="value">Clásico</span>
                      </h4>
                      <h4>
                        <span className="feature">Plato</span>:{" "}
                        <span className="value">Tarta de acelga y Dulce de Batata</span>
                      </h4>
                    </div>
                    <h3 className="title"></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-group text-center">
            <button type="submit" className="btn btn-white-c">
              Cancelar
            </button>
            <button type="button" className="btn btn-back">
              Volver Atrás
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default CancelarVianda;

