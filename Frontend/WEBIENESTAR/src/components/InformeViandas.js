import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto"; // Necesario para chart.js

const InformeViandas = () => {
  const [tipoVianda, setTipoVianda] = useState("clásico");
  const [tipoAlumno, setTipoAlumno] = useState("becario");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [datosGrafico, setDatosGrafico] = useState(null);

  const handleFiltrar = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    // Validación básica
    if (!fechaInicio || !fechaFin) {
      setError("Por favor, ingrese un rango de fechas válido.");
      return;
    }

    // Aquí deberías hacer una solicitud al backend para obtener los datos filtrados
    // Simulando una respuesta
    const datos = {
      reservasPorTipo: {
        clásico: 40,
        saludable: 60,
      },
      viandasPorTipoAlumno: {
        becario: 30,
        noBecario: 70,
      },
    };

    setError("");
    setSuccess("Informe generado exitosamente.");
    setDatosGrafico(datos);
  };

  // Datos de ejemplo para los gráficos
  const datosBarra = {
    labels: ["Clásico", "Saludable"],
    datasets: [
      {
        label: "Cantidad de reservas",
        data: datosGrafico
          ? [datosGrafico.reservasPorTipo.clásico, datosGrafico.reservasPorTipo.saludable]
          : [0, 0],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const datosTorta = {
    labels: ["Becarios", "No Becarios"],
    datasets: [
      {
        data: datosGrafico
          ? [datosGrafico.viandasPorTipoAlumno.becario, datosGrafico.viandasPorTipoAlumno.noBecario]
          : [0, 0],
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
          <label>Fecha Inicio:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha Fin:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <div>
          <label>Tipo de Vianda:</label>
          <select value={tipoVianda} onChange={(e) => setTipoVianda(e.target.value)}>
            <option value="clásico">Clásico</option>
            <option value="saludable">Saludable</option>
          </select>
        </div>
        <div>
          <label>Tipo de Alumno:</label>
          <select value={tipoAlumno} onChange={(e) => setTipoAlumno(e.target.value)}>
            <option value="becario">Becario</option>
            <option value="noBecario">No Becario</option>
          </select>
        </div>
        <button type="submit">
          Generar Informe
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div className="graficos">
        <h3>Reservas por tipo de vianda</h3>
        <Bar data={datosBarra} />

        <h3>Viandas entregadas (becarios vs no becarios)</h3>
        <Pie data={datosTorta} />
      </div>
    </div>
  );
};

export default InformeViandas;
