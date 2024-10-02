import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './visualizarBeca.css';

const VisualizarBeca = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [inscripcion, setInscripcion] = useState(null); // Estado para la inscripción

  useEffect(() => {
    const fetchInscripcion = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/inscripciones/${id}`);
        setInscripcion(response.data); // Guardar los datos obtenidos del backend
      } catch (error) {
        console.error("Error al obtener la inscripción:", error);
      }
    };

    fetchInscripcion();
  }, [id]); // Ejecutar el efecto cuando cambie el ID

  if (!inscripcion) {
    return <div>Cargando...</div>; // Mostrar un mensaje mientras se cargan los datos
  }

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

export default VisualizarBeca;
