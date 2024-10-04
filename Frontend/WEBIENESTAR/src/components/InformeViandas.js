import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto"; // Necesario para chart.js
import axios from "axios";
import { parse } from 'date-fns';

const InformeViandas = () => {
  const [Opcion, setOpcion] = useState("menu");
  const [fecha, setFecha] = useState(""); // Cambiado a una sola fecha
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [datosGrafico, setDatosGrafico] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [viandas, setViandas] = useState([]);

  const parseDateFromBackend = (fecha) => {
    const [year, month, day] = fecha.split("-"); // Divide en día, mes y año
    // Crea un objeto Date en formato YYYY-MM-DD// mes - 1 porque los meses empiezan desde 0
    return new Date(day, month - 1, year); // Formatea la fecha como DD-MM-YYYY
};

const parseDateFromFrontend = (fecha) => {
  const [day, month, year] = fecha.split("-"); 
  return new Date(day, month - 1, year); // Formatea la fecha como DD-MM-YYYY
};

const obtenerOpcion = (idVianda) => {
  const vianda = viandas.find(vianda => vianda.id === idVianda);
  return vianda ? vianda.tipo : null; // Retorna el tipo si se encuentra, de lo contrario null
};

useEffect(() => {
  const fetchViandas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/viandas');
      setViandas(response.data);
    } catch (error) {
      console.error('Error al obtener las viandas:', error);
    }
  };

  fetchViandas();
}, []);

  const fetchReservas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reservas");
      const reservasReservadas = response.data.filter(
        (reserva) => reserva.estado !== "CANCELADA"
      );
      setReservas(reservasReservadas);
    } catch (error) {
      setError("Error al obtener las reservas.");
      console.error("Error al obtener las reservas:", error);
    }
  };

  const fetchInscripciones = async () => {
    try {
      const response = await axios.get("http://localhost:8080/becascomedor");
      setInscripciones(response.data);
    } catch (error) {
      setError("Error al obtener las inscripciones.");
      console.error("Error al obtener las inscripciones.", error);
    }
  };

  useEffect(() => {
    fetchReservas();
    fetchInscripciones();
  }, []);

  console.log("Inscripciones: "+inscripciones.length);

  const handlerFiltrarPorTipoMenu = (fechaInicio, fechaFin) => {
    const reservasFiltradas = reservas.filter((reserva) => {
      const fechaReservaFormateada = parseDateFromBackend(reserva.fecha);
      const fechaInicioFormateada = parseDateFromFrontend(fechaInicio);
      const fechaFinFormateada = parseDateFromFrontend(fechaFin);
  
      return (
        fechaReservaFormateada >= fechaInicioFormateada &&
        fechaReservaFormateada <= fechaFinFormateada
      );
    });
  
    const reservasPorTipo = {
      clásico: reservasFiltradas.filter(
        (reserva) => obtenerOpcion(reserva.idVianda) === "Clasico"
      ).length,
      saludable: reservasFiltradas.filter(
        (reserva) => obtenerOpcion(reserva.idVianda) === "Saludable"
      ).length,
    };
  
    return { reservasPorTipo, reservasFiltradas };
  };


  const handlerFiltrarPorTipoEstudiante = (fecha) => {
    const reservasFiltradas = reservas.filter((reserva) => {
      const fechaReservaFormateada = parseDateFromBackend(reserva.fecha);
      const fechaFormateada = parseDateFromFrontend(fecha);
    
      return fechaReservaFormateada.getTime() === fechaFormateada.getTime(); // Compara con la fecha seleccionada
    });
  
    console.log("Reservas Filtradas: " + reservasFiltradas.length);
  
    // Filtrar inscripciones según el tipo de alumno
    const inscripcionesFiltradas = inscripciones.filter((inscripcion) => {
      const anioInscripcionFormateada = parse(inscripcion.anio, 'yyyy', new Date());
      const anioActual = new Date().getFullYear(); // Obtén el año actual
  
      return (
        anioInscripcionFormateada.getFullYear() === anioActual && // Compara solo los años
        inscripcion.estadoBeca === "APROBADA" // Se filtran solo becarios aprobados
      ); 
    });
  
    return { reservasFiltradas, inscripcionesFiltradas};
  };

  const handleFiltrar = (e) => {
    e.preventDefault();
  
    if (Opcion === "menu" && (!fechaInicio || !fechaFin)) {
      setError("Por favor, ingrese un rango de fechas válido.");
      return;
    } else if (Opcion === "estudiante" && !fecha) {
      setError("Por favor, ingrese una fecha válida.");
      return;
    }
  
    let reservasPorTipo = { clásico: 0, saludable: 0 }; // Inicializa con valores por defecto
    let reservasFiltradas;
    let inscripcionesFiltradas = [];
  
    if (Opcion === "menu") {
      const resultado = handlerFiltrarPorTipoMenu(fechaInicio, fechaFin);
      reservasPorTipo = resultado.reservasPorTipo;
      reservasFiltradas = resultado.reservasFiltradas;
    } else {
      const resultado = handlerFiltrarPorTipoEstudiante(fecha);
      reservasFiltradas = resultado.reservasFiltradas;
      inscripcionesFiltradas = resultado.inscripcionesFiltradas;
    }
  
    const viandasPorTipoAlumno = {
      becario: reservasFiltradas.length > 0 ? inscripcionesFiltradas.length : 0, // Total de inscripciones filtradas para becarios
      noBecario: reservasFiltradas.length > 0 ? (reservasFiltradas.length - inscripcionesFiltradas.length) : 0,
    };
  
    const datos = {
      reservasPorTipo,
      viandasPorTipoAlumno,
    };
  
    setDatosGrafico(datos);
    setError("");
    setSuccess("Informe generado exitosamente.");
  };
  
  const datosBarra = {
    labels: ["Clásico", "Saludable"],
    datasets: [
      {
        label: "Cantidad de reservas",
        data: datosGrafico && datosGrafico.reservasPorTipo
          ? [
              datosGrafico.reservasPorTipo.clásico,
              datosGrafico.reservasPorTipo.saludable,
            ]
          : [0, 0], // Valor por defecto en caso de que no haya datos
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };
  
  const datosTorta = {
    labels: ["Becarios", "No Becarios"],
    datasets: [
      {
        data: datosGrafico && datosGrafico.viandasPorTipoAlumno
          ? [
              datosGrafico.viandasPorTipoAlumno.becario,
              datosGrafico.viandasPorTipoAlumno.noBecario,
            ]
          : [0, 0], // Valor por defecto en caso de que no haya datos
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };
  
  return (
    <div className="container">
      <h2>Informe de Viandas</h2>
      <form className="informe-vianda" onSubmit={handleFiltrar}>
        <div>
          <label>Filtrar por:</label>
          <select
            value={Opcion}
            onChange={(e) => setOpcion(e.target.value)}
          >
            <option value="menu">Tipo de menú</option>
            <option value="estudiante">Tipo de estudiante</option>
          </select>
        </div>

        {Opcion === "menu" && (
          <>
            <div>
              <label>Fecha Inicio:</label>
              <input
                type="date"
                value={fechaInicio} // Formato YYYY-MM-DD
                onChange={(e) => setFechaInicio(e.target.value)} // Almacena en DD-MM-YYYY
              />
            </div>
            <div>
              <label>Fecha Fin:</label>
              <input
                type="date"
                value={fechaFin} // Formato YYYY-MM-DD
                onChange={(e) => setFechaFin(e.target.value)} // Almacena en DD-MM-YYYY
              />
            </div>
          </>
        )}

        {Opcion === "estudiante" && (
          <div>
            <label>Fecha:</label>
            <input
              type="date"
              value={fecha} // Formato YYYY-MM-DD
              onChange={(e) => setFecha(e.target.value)} // Almacena en DD-MM-YYYY
            />
          </div>
        )}
        <button type="submit">Generar Informe</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div className="graficos">
        {Opcion === "menu" && (
          <>
            <h3>Reservas por tipo de vianda</h3>
            <Bar data={datosBarra} />
          </>
        )}

        {Opcion === "estudiante" && (
          <>
            <h3>Viandas entregadas (becarios vs no becarios)</h3>
            <Pie data={datosTorta} />
          </>
        )}
      </div>
    </div>
  );
};

export default InformeViandas;
