// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Vista de inicio de sesión
import Register from './components/Register-Form'; // Vista de registro
import InicioEstudiante from './components/InicioEstudiante';
import ListaReservas from './components/listaReservas';
import ListaBecas from './components/listaBecas';
import MenuDia from './components/menuDia';
import VisualizarBeca from './components/visualizarBeca';
import Configuracion from './components/configuracion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inicio_estudiante" element={<InicioEstudiante />} />
        <Route path="/lista_reservas" element={<ListaReservas />} />
        <Route path="/lista_becas" element={<ListaBecas />} />
        <Route path="/menu_dia" element={<MenuDia />} />
        <Route path="/visualizar_beca" element={<VisualizarBeca />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </Router>
  );
}

export default App;
