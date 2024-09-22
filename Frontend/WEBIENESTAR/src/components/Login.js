// Login.js
import React from 'react';
import './Login.css';

const Login = () => {
  return (
    /*<div className="login-container">
      <div className="login-logo">
      <img src="/logo.png" alt="Logo" className="logo-image" />
      </div>
      <h2 className="login-title">Iniciar Sesión</h2>
      <form className="login-form">
        <input type="email" placeholder="Email address" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">Sign in</button>
      </form>
      <footer className="footer">
        © 2017-2019
      </footer>
    </div>*/
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
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary btn-block" type="submit">
          Log In
        </button>
      </div>
      <a href="#" className="forgot">
        Forgot your email or password?
      </a>
    </form>
  </div>
  );
};

export default Login;
