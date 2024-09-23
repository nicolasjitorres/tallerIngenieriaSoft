import React, { useState } from "react";
import "./BecaComedor-Form.css";

const BecaComedor = () => {
  const [ingresos, setIngresos] = useState("");
  const [tipoV, setTipoV] = useState("");
  const [condV, setCondV] = useState("");
  const [grupoF, setGrupoF] = useState("");

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
    setGrupoF(event.target.value);
  };

  return (
    <div className="register-photo">
      <div className="form-container">
        <form method="post">
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
                  value="Si"
                  checked={ingresos === "Si"}
                  onChange={handleIngresosChange}
                />
                <label className="form-check-label">Si</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ingresos"
                  value="No"
                  checked={ingresos === "No"}
                  onChange={handleIngresosChange}
                />
                <label className="form-check-label">No</label>
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
                  value="Casa"
                  checked={tipoV === "Casa"}
                  onChange={handleTipoVChange}
                />
                <label className="form-check-label">Casa</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoV"
                  value="Departamento"
                  checked={tipoV === "Departamento"}
                  onChange={handleTipoVChange}
                />
                <label className="form-check-label">Departamento</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoV"
                  value="Residencia/Pension"
                  checked={tipoV === "Residencia/Pension"}
                  onChange={handleTipoVChange}
                />
                <label className="form-check-label">Residencia/Pensión</label>
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
                  value="Propia"
                  checked={condV === "Propia"}
                  onChange={handleCondVChange}
                />
                <label className="form-check-label">Propia</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condV"
                  value="Alquilada"
                  checked={condV === "Alquilada"}
                  onChange={handleCondVChange}
                />
                <label className="form-check-label">Alquilada</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condV"
                  value="Heredada"
                  checked={condV === "Heredada"}
                  onChange={handleCondVChange}
                />
                <label className="form-check-label">Heredada</label>
              </div>
            </div>
          </div>

          {/* Grupo Familiar - Radio buttons */}
          <div className="form-group-bc">
            <label className="label-bold">Grupo Familiar</label>
            <div className="form-check-group-bc">
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="grupoF"
                  value="Padre"
                  checked={grupoF === "Padre"}
                  onChange={handleGrupoFChange}
                />
                <label className="form-check-label">Padre</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="grupoF"
                  value="Madre"
                  checked={grupoF === "Madre"}
                  onChange={handleGrupoFChange}
                />
                <label className="form-check-label">Madre</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="grupoF"
                  value="Hermano/a"
                  checked={grupoF === "Hermano/a"}
                  onChange={handleGrupoFChange}
                />
                <label className="form-check-label">Hermano/a</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="grupoF"
                  value="Tio/a"
                  checked={grupoF === "Tio/a"}
                  onChange={handleGrupoFChange}
                />
                <label className="form-check-label">Tío/a</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="grupoF"
                  value="Abuelo/a"
                  checked={grupoF === "Abuelo/a"}
                  onChange={handleGrupoFChange}
                />
                <label className="form-check-label">Abuelo/a</label>
              </div>
              <div className="form-check-bc">
                <input
                  className="form-check-input"
                  type="radio"
                  name="grupoF"
                  value="Otro"
                  checked={grupoF === "Otro"}
                  onChange={handleGrupoFChange}
                />
                <label className="form-check-label">Otro</label>
              </div>
            </div>
          </div>

          {/* Subida de Archivos Postulante*/}
          <h3>Subir Archivos del Postulante</h3>
          <div className="file-upload-group">
            <div className="file-upload-row">
              <div className="file-upload-column">
                <label>DNI (Ambos Lados) (*)</label>
                <input type="file" className="form-control" />
              </div>
              <div className="file-upload-column">
                <label>Constancia Alumno (*)</label>
                <input type="file" className="form-control" />
              </div>
            </div>
            <div className="file-upload-row">
              <div className="file-upload-column">
                <label>Constancia de Ingresos (*)</label>
                <input type="file" className="form-control" />
              </div>
              <div className="file-upload-column">
                <label>Declaración Jurada</label>
                <input type="file" className="form-control" />
              </div>
            </div>
            <div className="file-upload-row">
              <div className="file-upload-column">
                <label>Certificación Negativa (*)</label>
                <input type="file" className="form-control" />
              </div>
              <div className="file-upload-column">
                <label>C.U.D (si lo tuviera)</label>
                <input type="file" className="form-control" />
              </div>
            </div>
          </div>

          {/* Subida de Archivos Familia*/}
          <h3>Subir Archivos de Familia</h3>
          <div className="file-upload-group">
            <div className="file-upload-row">
              <div className="file-upload-column">
                <label>DNI (Ambos Lados) (*)</label>
                <input type="file" className="form-control" />
              </div>
            </div>
            <div className="file-upload-row">
              <div className="file-upload-column">
                <label>Constancia de Ingresos (*)</label>
                <input type="file" className="form-control" />
              </div>
            </div>
            <div className="file-upload-row">
              <div className="file-upload-column">
                <label>Certificación Negativa (*)</label>
                <input type="file" className="form-control" />
              </div>
            </div>
          </div>

          <div className="form-group d-flex justify-content-between">
            {/* Botón borrar Formulario */}
            <button
              className="btn btn-borrar btn-bold"
              style={{ marginRight: "25px" }}
              type="submit"
            >
              Borrar Formulario
            </button>
            {/* Botón Enviar Inscripción */}
            <button
              className="btn btn-enviar btn-bold"
              style={{ marginRight: "25px" }}
              type="submit"
            >
              Enviar Inscripción
            </button>
            {/* Botón Volver Atrás */}
            <button className="btn btn-volver btn-bold" type="submit">
              Volver Atrás
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecaComedor;
