// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Vista de inicio de sesión
import Register from './components/Register-Form'; // Vista de registro
import BecaComedor from './components/BecaComedor-Form';
import ReservarVianda from './components/ReservarVianda';
import RetroVianda from './components/RetroVianda';
import CancelarVianda from './components/CancelarVianda';
import Configuracion from './components/configuracion';
import ListaBecas from './components/listaBecas';
import ListaReservas from './components/listaReservas';
import MenuDia from './components/menuDia';
import VisualizarBeca from './components/visualizarBeca';
import HistorialReservas from './components/HistorialReservas';
import VisualizarReserva from './components/visualizarReserva';
import InformeViandas from './components/InformeViandas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/BecaComedor/:id" element={<BecaComedor />} />
        <Route path="/ReservarVianda/:id" element={<ReservarVianda />} />
        <Route path="/RetroVianda/:id" element={<RetroVianda />} />
        <Route path="/CancelarVianda/:id" element={<CancelarVianda />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/lista_becas" element={<ListaBecas />} />
        <Route path="/lista_reservas" element={<ListaReservas />} />
        <Route path="/menu_dia" element={<MenuDia />} />
        <Route path="/visualizar_beca/:id" element={<VisualizarBeca />} />
        <Route path="/historial_reservas/:id" element={<HistorialReservas />} />
        <Route path="/visualizar_reserva/:id" element={<VisualizarReserva />} />
        <Route path="/informe_viandas" element={<InformeViandas />} />
      </Routes>
    </Router>
  );
}

export default App;
