// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Vista de inicio de sesión
import Register from './components/Register-Form'; // Vista de registro
import BecaComedor from './components/BecaComedor-Form';
import ReservarVianda from './components/ReservarVianda';
import RetroVianda from './components/RetroVianda';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/BecaComedor" element={<BecaComedor />} />
        <Route path="/ReservarVianda" element={<ReservarVianda />} />
        <Route path="/RetroVianda" element={<RetroVianda />} />
      </Routes>
    </Router>
  );
}

export default App;
