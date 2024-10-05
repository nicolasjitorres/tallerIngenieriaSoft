import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/header/Header";
import Dashboard from "./paginas/dashboard/Dashboard";
import EstudiantesIndex from "./paginas/estudiantes/EstudiantesIndex";
import EmpleadosIndex from "./paginas/empleados/EmpleadosIndex";
import ViandasIndex from "./paginas/viandas/ViandasIndex";
import BecasComedorIndex from "./paginas/becasComedor/becasComedorIndex";
import ReservasIndex from "./paginas/reservas/ReservasIndex";
import Login from "./paginas/auth/Login";
import Register from "./paginas/auth/Register";
import Perfil from "./paginas/perfil/perfil";
import HistorialReservas from "./paginas/reservas/HistorialReservas";
import ListaReservas from "./paginas/reservas/ListaReservas";
import ReservarVianda from "./paginas/reservas/ReservarVianda";
import RetroVianda from "./paginas/reservas/RetroVianda";
import VisualizarReserva from "./paginas/reservas/VisualizarReserva";
import InformeViandas from "./paginas/viandas/InformeViandas";
import ListaBecas from "./paginas/becasComedor/ListaBecas";
import VisualizarBeca from "./paginas/becasComedor/VisualizarBeca";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {" "}
        {/* Contenedor principal */}
        <Header />
        <div className="flex-grow mt-28">
          {" "}
          {/* Contenedor del contenido */}
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/estudiantes" exact element={<EstudiantesIndex />} />
            <Route path="/empleados" exact element={<EmpleadosIndex />} />
            <Route path="/viandas" exact element={<ViandasIndex />} />
            <Route path="/viandas/informe" exact element={<InformeViandas />} />
            <Route path="/becasComedor" exact element={<BecasComedorIndex />} />
            <Route path="/becasComedor/lista" exact element={<ListaBecas />} />
            <Route
              path="/becasComedor/visualizar/:id"
              exact
              element={<VisualizarBeca />}
            />
            <Route path="/reservas" exact element={<ReservasIndex />} />
            <Route path="/reservas/:id" exact element={<VisualizarReserva />} />
            <Route path="/reservas/lista" exact element={<ListaReservas />} />
            <Route
              path="/reservas/:id/calificar"
              exact
              element={<RetroVianda />}
            />
            <Route
              path="/reservas/reservar/:id"
              exact
              element={<ReservarVianda />}
            />
            <Route
              path="/reservas/historial/:id"
              exact
              element={<HistorialReservas />}
            />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/perfil" exact element={<Perfil />} />
          </Routes>
        </div>
        <Footer /> {/* Footer siempre en la parte inferior */}
      </div>
    </BrowserRouter>
  );
}

export default App;
