import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BecaComedorFormulario = () => {
  const { id } = useParams(); // Obtiene el parámetro id de la URL
  const [ingresos, setIngresos] = useState("");
  const [tipoV, setTipoV] = useState("");
  const [condV, setCondV] = useState("");
  const [grupoF, setGrupoF] = useState([]);
  const [idEstudiante] = useState(id); // El id del estudiante se obtiene de la URL
  const navigate = useNavigate();
  const [tieneBeca, settieneBeca] = useState(false); 

  useEffect(() => {
    const fetchBecasComedor = async () => {
      try {
        const reservaResponse = await axios.get(
          `http://localhost:8080/becascomedor/${id}`
        );
        setTieneReserva(reservaResponse.data);
      } catch (error) {
        console.error("Error al verificar la reserva:", error);
      }
    };

    fetchBecasComedor();
  }, [id]);

  const handleIngresosChange = (event) => {
    setIngresos(event.target.value === "true");
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
      idEstudiante: idEstudiante, // Cambia esto para usar el ID del estudiante directamente
    };

    console.log("Datos de Beca Comedor:", becaComedor);

    try {
      const response = await fetch("http://localhost:8080/becascomedor/guardar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(becaComedor),
      });

      if (response.ok) {
        alert("Formulario enviado correctamente");
        navigate(-1); // Regresa a la vista anterior
      } else {
        const errorData = await response.json();
        console.error("Error al enviar inscripción:", errorData);
        alert(`Error al enviar la inscripción: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      alert("Error en la conexión al servidor.");
      console.error("Error en la conexión:", error);
    }
  };

  const handleReset = () => {
    setIngresos("");
    setTipoV("");
    setCondV("");
    setGrupoF([]);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6">BECA COMEDOR UNIVERSITARIO</h2>

          {/* Ingresos - Radio buttons */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">¿Tiene Ingresos?</label>
            <div className="flex items-center">
              <div className="mr-4">
                <input
                  className="form-radio text-green-500"
                  type="radio"
                  name="ingresos"
                  value="true"
                  checked={ingresos === true}
                  onChange={handleIngresosChange}
                />
                <label className="ml-2">SI</label>
              </div>
              <div>
                <input
                  className="form-radio text-red-500"
                  type="radio"
                  name="ingresos"
                  value="false"
                  checked={ingresos === false}
                  onChange={handleIngresosChange}
                />
                <label className="ml-2">NO</label>
              </div>
            </div>
          </div>

          {/* Tipo de Vivienda - Radio buttons */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Tipo de Vivienda</label>
            {["CASA", "DEPARTAMENTO", "RESIDENCIA", "PENSION", "OTRO"].map((tipo) => (
              <div className="flex items-center mb-2" key={tipo}>
                <input
                  className="form-radio text-blue-500"
                  type="radio"
                  name="tipoV"
                  value={tipo}
                  checked={tipoV === tipo}
                  onChange={handleTipoVChange}
                />
                <label className="ml-2">{tipo}</label>
              </div>
            ))}
          </div>

          {/* Condición de la Vivienda - Radio buttons */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Condición de la Vivienda</label>
            {["PROPIA", "ALQUILADA", "HEREDADA"].map((cond) => (
              <div className="flex items-center mb-2" key={cond}>
                <input
                  className="form-radio text-yellow-500"
                  type="radio"
                  name="condV"
                  value={cond}
                  checked={condV === cond}
                  onChange={handleCondVChange}
                />
                <label className="ml-2">{cond}</label>
              </div>
            ))}
          </div>

          {/* Grupo Familiar - Checkbox */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Grupo Familiar</label>
            {["PADRE", "MADRE", "HERMANO/A", "TIO/A", "ABUELO/A", "OTRO"].map((member) => (
              <div className="flex items-center mb-2" key={member}>
                <input
                  className="form-checkbox text-indigo-600"
                  type="checkbox"
                  value={member}
                  checked={grupoF.includes(member)}
                  onChange={handleGrupoFChange}
                />
                <label className="ml-2">{member}</label>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            {/* Botón Borrar Formulario */}
            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
              type="button"
              onClick={handleReset}
            >
              Borrar Formulario
            </button>

            {/* Botón Enviar Inscripción */}
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600" type="submit">
              Enviar Inscripción
            </button>

            {/* Botón Volver Atrás */}
            <button
              className="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500"
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




export default BecaComedorFormulario;