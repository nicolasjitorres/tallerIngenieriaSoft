<<<<<<< HEAD
// Login.js
import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="register">
        Hola
=======
// Register.js
import React, { useState } from "react";
import "./Register-Form.css";

const carrerasPorFacultad = {
  exactas: [
    "Licenciatura en Sistemas de Información",
    "Técnico Universitario en Hidrología Subterránea",
    "Profesorado en Informática",
    "Técnico Universitario Vial",
    "Profesorado en Física",
    "Ingeniería en Agrimensura",
    "Técnico Universitario en Construcciones",
    "Ingeniería Civil",
    "Profesorado en Matemática",
    "Ingeniería Vial",
    "Licenciatura en Matemática",
    "Ingeniería Hidráulica",
    "Ingeniería Electromecánica",
    "Ingeniería Electrónica",
    "Ingeniería Eléctrica",
    "Técnico Universitario en Organización y Control de la Producción",
    "Ingeniería Industrial",
    "Programador Universitario en Informática",
    "Licenciatura en Hidrología Subterránea",
  ],
  sociales: [
    "Licenciatura en Obstetricia",
    "Licenciatura en Administración",
    "Licenciatura en Trabajo Social",
    "Licenciatura en Filosofía",
    "Profesorado en Educación para la Salud",
    "Licenciatura en Educación para la Salud",
    "Contador Público Nacional",
    "Licenciatura en Enfermería",
    "Tec. Sup. en Educación Intercultural Bilingüe",
    "Licenciatura en Sociología",
  ],
  agronomia: [
    "Tecnicatura Universitaria en Apicultura",
    "Ingeniería Agronómica",
    "Profesorado en Química",
    "Licenciatura en Biotecnología",
    "Ingeniería en Alimentos",
    "Licenciatura En Química",
  ],
  medicas: ["Medicina"],
  forestales: [
    "Tecnicatura Universitaria Fitosanitarista",
    "Ingeniería Forestal",
    "Tecnicatura Universitaria en Viveros y Plantaciones Forestales",
    "Tecnicatura Universitaria en Aserraderos y Carpintería Industrial",
    "Ingeniería en Industrias Forestales",
    "Licenciatura En Ecología Y Conservación Del Ambiente",
    "Ingeniería en Industrias Forestales",
  ],
};

const Register = () => {
  const [facultadSeleccionada, setFacultadSeleccionada] = useState("");
  const [carrerasDisponibles, setCarrerasDisponibles] = useState([]);
  const [genero, setGenero] = useState("");

  const handleFacultadChange = (event) => {
    const facultad = event.target.value;
    setFacultadSeleccionada(facultad);
    setCarrerasDisponibles(carrerasPorFacultad[facultad] || []);
  };

  const handleGeneroChange = (event) => {
    setGenero(event.target.value);
  };

  return (
    <div className="register-photo">
      <div className="form-container">
        <form method="post">
          <h2 className="text-center">
            <strong>Crear</strong> una cuenta
          </h2>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="legajo"
              placeholder="Legajo"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="dni"
              placeholder="DNI"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="nombre"
              placeholder="Nombre"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="mail"
              placeholder="Mail"
            />
          </div>

          {/* Género - Radio buttons */}
          <div className="form-group-g">
            <label>Género:</label>
            <div className="form-check-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genero"
                  value="Femenino"
                  checked={genero === "Femenino"}
                  onChange={handleGeneroChange}
                />
                <label className="form-check-label">Femenino</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genero"
                  value="Masculino"
                  checked={genero === "Masculino"}
                  onChange={handleGeneroChange}
                />
                <label className="form-check-label">Masculino</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genero"
                  value="Otro"
                  checked={genero === "Otro"}
                  onChange={handleGeneroChange}
                />
                <label className="form-check-label">Otro</label>
              </div>
            </div>
          </div>

          {/* Facultad dropdown */}
          <div className="form-group">
            <select
              id="facultad"
              className="form-control"
              value={facultadSeleccionada}
              onChange={handleFacultadChange}
            >
              <option value="">--Seleccione una facultad--</option>
              <option value="exactas">
                Facultad de Ciencias Exactas y Tecnológicas
              </option>
              <option value="sociales">
                Facultad de Ciencias Sociales y Humanidades
              </option>
              <option value="agronomia">
                Facultad de Agronomía y Agroindustria
              </option>
              <option value="medicas">Facultad de Ciencias Médicas</option>
              <option value="forestales">
                Facultad de Ciencias Forestales
              </option>
            </select>
          </div>

          {/* Carrera dropdown */}
          <div className="form-group">
            <select id="carrera" className="form-control">
              <option value="">--Seleccione una carrera--</option>
              {carrerasDisponibles.map((carrera, index) => (
                <option key={index} value={carrera}>
                  {carrera}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="localidad"
              placeholder="Localidad"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="direccion"
              placeholder="Dirección"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Contraseña"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password-repeat"
              placeholder="Repetir Contraseña"
            />
          </div>
          <div className="form-group">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" />
                Acepto todos los términos y condiciones.
              </label>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Registrarse
            </button>
          </div>
          <a href="/" className="already">
            ¿Ya tienes una Cuenta? Ingresá aquí.
          </a>
        </form>
      </div>
>>>>>>> 39fba4a784674778b6e7466a992b0463b31eeec3
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Register;
>>>>>>> 39fba4a784674778b6e7466a992b0463b31eeec3
