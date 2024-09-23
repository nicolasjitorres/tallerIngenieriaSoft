// RetroVianda.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RetroVianda.css";
import { Helmet } from "react-helmet";

const RetroVianda = () => {
  const navigate = useNavigate();
  const [opinion, setOpinion] = useState("");
  const [calificacion, setCalificacion] = useState("");

  const handleRegisterClick = () => {
    navigate("/RetroVianda");
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
        <title>Retroalimentación</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <main className="page payment-page">
        <section className="payment-form dark">
          <div className="container">
            <div className="block-heading text-center d-flex align-items-center justify-content-center">
              <img
                src="./opiniones.png"
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
                />
              </div>
              <div className="form-group col-sm-12">
                <button type="submit" className="btn btn-custom btn-block">
                  Enviar Opinión
                </button>
              </div>
            </form>
            {/* Sección de Calificación */}
            <div className="calificacion-section">
              <h3 className="title">Califica tu vianda</h3>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    value="Mala"
                    checked={calificacion === "Mala"}
                    onChange={(e) => setCalificacion(e.target.value)}
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
          </div>
          <div className="button-group text-center">
            <button type="submit" className="btn btn-white">
              Enviar
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

export default RetroVianda;
