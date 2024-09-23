import React from "react";
import './visualizarBeca.css';

const visualizarBeca = () => {
  const inscripcion = {
    ingresos: true,
    tipoVivienda: "CASA",
    condVivienda: "PROPIA",
    grupoFamiliar: "Mama, Papa",
    archivos: "Archivos_1.zip",
    anio: "2024",
    idEstudiante: 1,
  };

  return (
    <div className="container mt-5">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
      />
      <h2 className="text-center">Visualizar Inscripción a la Beca Comedor</h2>
      <hr />
      <div className="form-group">
        <label htmlFor="ingresos">Ingresos:</label>
        <input
          type="text"
          className="form-control"
          id="ingresos"
          value={inscripcion.ingresos ? "Sí" : "No"}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="tipoVivienda">Tipo de Vivienda:</label>
        <input
          type="text"
          className="form-control"
          id="tipoVivienda"
          value={inscripcion.tipoVivienda}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="condVivienda">Condición de Vivienda:</label>
        <input
          type="text"
          className="form-control"
          id="condVivienda"
          value={inscripcion.condVivienda}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="grupoFamiliar">Grupo Familiar:</label>
        <input
          type="text"
          className="form-control"
          id="grupoFamiliar"
          value={inscripcion.grupoFamiliar}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="archivos">Archivos Adicionales:</label>
        <input
          type="text"
          className="form-control"
          id="archivos"
          value={inscripcion.archivos}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="anio">Año:</label>
        <input
          type="text"
          className="form-control"
          id="anio"
          value={inscripcion.anio}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="idEstudiante">ID del Estudiante:</label>
        <input
          type="text"
          className="form-control"
          id="idEstudiante"
          value={inscripcion.idEstudiante}
          readOnly
        />
      </div>
      <div className="text-center">
        <button
          className="btn btn-secondary"
          onClick={() => window.history.back()}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default visualizarBeca;
