import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Importa useParams para obtener el parámetro id
import "./BecaComedor-Form.css";

const BecaComedor = () => {
  const { id } = useParams(); // Obtiene el parámetro id de la URL
  const [ingresos, setIngresos] = useState("");
  const [tipoV, setTipoV] = useState("");
  const [condV, setCondV] = useState("");
  const [grupoF, setGrupoF] = useState([]);

  // Usa el id del estudiante obtenido desde la URL
  const [idEstudiante, setIdEstudiante] = useState(id);
  const navigate = useNavigate();

  useEffect(() => {
    // Si el id cambia (nueva ruta), actualiza el estado del idEstudiante
    setIdEstudiante(id);
  }, [id]);

  const handleIngresosChange = (event) => {
    setIngresos(event.target.value);
  };

  const handleTipoVChange = (event) => {
    setTipoV(event.target.value);
  };

  const handleCondVChange = (event) => {
    setCondV(event.target.value);
  };

  const handleGrupoFChange = (event) => {
    const { value } = event.target;
    if (grupoF.includes(value)) {
      setGrupoF(grupoF.filter((item) => item !== value));
    } else {
      setGrupoF([...grupoF, value]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const becaComedor = {
      ingresos: ingresos,
      tipoVivienda: tipoV,
      condVivienda: condV,
      grupoFamiliar: grupoF.join(", "),
      anio: new Date().getFullYear().toString(),
      idEstudiante: idEstudiante,
    };

    console.log("Datos de Beca Comedor:", becaComedor);

    try {
      const response = await fetch("http://localhost:8080/becascomedor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(becaComedor),
      });

      if (response.ok) {
        alert("Formulario enviado correctamente"); // Alerta de éxito
        navigate(-1); // Regresa a la vista anterior
      } else {
        const errorData = await response.json();
        console.error("Error al enviar inscripción:", errorData);
        alert(`Error al enviar la inscripción: ${errorData.message || 'Error desconocido'}`);
        navigate(-1); // Regresa a la vista anterior en caso de error también
      }
    } catch (error) {
      alert("Error en la conexión al servidor.");
      console.error("Error en la conexión:", error);
      navigate(-1); // Regresa a la vista anterior si hay un error
    }
  };

  const handleReset = () => {
    setIngresos("");
    setTipoV("");
    setCondV("");
    setGrupoF([]);
  };

  const handleGoBack = () => {
    navigate(-1); // Volver atrás usando navigate
  };

  return (
    <div className="register-photo">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>BECA COMEDOR UNIVERSITARIO</h2>

          {/* Ingresos - Radio buttons */}
          <div className="form-group-bc">
            <label className="label-bold">¿Tiene Ingresos?</label>
            <div className="form-check-group-bc">
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ingresos"
                  value="true"
                  checked={ingresos === "true"}
                  onChange={handleIngresosChange}
                />
                <label className="form-check-label">SI</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ingresos"
                  value="false"
                  checked={ingresos === "false"}
                  onChange={handleIngresosChange}
                />
                <label className="form-check-label">NO</label>
              </div>
            </div>
          </div>

          {/* Tipo de Vivienda - Radio buttons */}
          <div className="form-group-bc">
            <label className="label-bold">Tipo de Vivienda</label>
            <div className="form-check-group-bc">
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoV"
                  value="CASA"
                  checked={tipoV === "CASA"}
                  onChange={handleTipoVChange}
                />
                <label className="form-check-label">CASA</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoV"
                  value="DEPARTAMENTO"
                  checked={tipoV === "DEPARTAMENTO"}
                  onChange={handleTipoVChange}
                />
                <label className="form-check-label">DEPARTAMENTO</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoV"
                  value="RESIDENCIA"
                  checked={tipoV === "RESIDENCIA"}
                  onChange={handleTipoVChange}
                />
                <label className="form-check-label">RESIDENCIA</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoV"
                  value="PENSION"
                  checked={tipoV === "PENSION"}
                  onChange={handleTipoVChange}
                />
                <label className="form-check-label">PENSION</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoV"
                  value="OTRO"
                  checked={tipoV === "OTRO"}
                  onChange={handleTipoVChange}
                />
                <label className="form-check-label">OTRO</label>
              </div>
            </div>
          </div>

          {/* Condición de la Vivienda - Radio buttons */}
          <div className="form-group-bc">
            <label className="label-bold">Condición de la Vivienda</label>
            <div className="form-check-group-bc">
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condV"
                  value="PROPIA"
                  checked={condV === "PROPIA"}
                  onChange={handleCondVChange}
                />
                <label className="form-check-label">PROPIA</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condV"
                  value="ALQUILADA"
                  checked={condV === "ALQUILADA"}
                  onChange={handleCondVChange}
                />
                <label className="form-check-label">ALQUILADA</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condV"
                  value="HEREDADA"
                  checked={condV === "HEREDADA"}
                  onChange={handleCondVChange}
                />
                <label className="form-check-label">HEREDADA</label>
              </div>
            </div>
          </div>

          {/* Grupo Familiar - Checkbox */}
          <div className="form-group-bc">
            <label className="label-bold">Grupo Familiar</label>
            <div className="form-check-group-bc">
              {["PADRE", "MADRE", "HERMANO/A", "TIO/A", "ABUELO/A", "OTRO"].map(
                (member) => (
                  <div className="form-check-bc" key={member}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={member}
                      checked={grupoF.includes(member)}
                      onChange={handleGrupoFChange}
                    />
                    <label className="form-check-label">{member}</label>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="form-group d-flex justify-content-between">
            {/* Botón Borrar Formulario */}
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleReset}
            >
              Borrar Formulario
            </button>

            {/* Botón Enviar Inscripción */}
            <button className="btn btn-success" type="submit">
              Enviar Inscripción
            </button>

            {/* Botón Volver Atrás */}
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleGoBack}
            >
              Volver Atrás
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecaComedor;

