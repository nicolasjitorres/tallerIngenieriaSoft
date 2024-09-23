// Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {

  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleRegisterClick = () => {
    navigate('/register'); // Redirige a la ruta de registro
  };

  const handleHomeStudentClick = () => {
    navigate('/inicio_estudiante'); // Redirige a la ruta de registro
  };

  return (
    <div className="login-clean">
    <form method="post">
      <h2 className="sr-only">WEBIENESTAR</h2>
      <div className="illustration">
        {/* Icono del logo */}
        <img src="/logo.png" alt="Logo" className="logo-image" />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="DNI"
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
        <button className="btn btn-primary btn-block" 
        type="submit" onClick={handleHomeStudentClick} // Maneja el clic del botón
        >
          Ingresar
        </button>
      </div>
      <a className="forgot">
        ¿Olvidaste tu contraseña?
      </a>
      <div className="form-group">
          <button
            className="btn btn-primary btn-block"
            type="button"
            onClick={handleRegisterClick} // Maneja el clic del botón
          >
            Crear cuenta nueva
          </button>
        </div>
    </form>
  </div>
  );
};

export default Login;
