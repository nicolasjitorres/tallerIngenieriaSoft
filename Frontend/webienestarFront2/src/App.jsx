import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/header/Header';
import Dashboard from './paginas/dashboard/Dashboard'
import EstudiantesIndex from './paginas/estudiantes/EstudiantesIndex';
import EmpleadosIndex from './paginas/empleados/EmpleadosIndex';
import ViandasIndex from './paginas/viandas/ViandasIndex';
import BecasComedorIndex from './paginas/becasComedor/becasComedorIndex';
import ReservasIndex from './paginas/reservas/ReservasIndex';
import Login from './paginas/auth/Login';
import Register from './paginas/auth/Register';
import Perfil from './paginas/perfil/perfil';

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' exact element={<Dashboard />} />
        <Route path='/estudiantes' exact element={<EstudiantesIndex />} />
        <Route path='/empleados' exact element={<EmpleadosIndex />} />
        <Route path='/viandas' exact element={<ViandasIndex />} />
        <Route path='/becasComedor' exact element={<BecasComedorIndex />} />
        <Route path='/reservas' exact element={<ReservasIndex />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/perfil' exact element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;