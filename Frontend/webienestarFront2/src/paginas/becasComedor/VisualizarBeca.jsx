import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const VisualizarBeca = () => {
  const { id } = useParams();
  const [inscripcion, setInscripcion] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.rol || "No definido"; // Acceder al rol del usuario
  console.log("Rol del usuario:", userRole);

  const fetchInscripcion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/becascomedor/${id}`
      );
      setInscripcion(response.data);
    } catch (error) {
      console.error("Error al obtener la inscripción:", error);
    }
  };

  useEffect(() => {
    fetchInscripcion();
  }, [id]);

  const handleAprobar = async (id) => {
    const confirmAprobar = window.confirm(
      "¿Estás seguro de aprobar esta beca?"
    );
    if (confirmAprobar) {
      try {
        await axios.put(`http://localhost:8080/becascomedor/aprobar`, {
          id: id,
        });
        await fetchInscripcion();
      } catch (error) {
        console.error("Error al aprobar la beca comedor:", error);
      }
    }
  };

  const handleDenegar = async (id) => {
    const confirmDenegar = window.confirm(
      "¿Estás seguro de denegar esta beca?"
    );
    if (confirmDenegar) {
      try {
        await axios.put(`http://localhost:8080/becascomedor/denegar`, {
          id: id,
        });
        await fetchInscripcion(); // Obtener la lista actualizada
      } catch (error) {
        console.error("Error al denegar la inscripción:", error);
      }
    }
  };

  if (!inscripcion) {
    return <div>Cargando...</div>;
  }

  // Verificar si el usuario es empleado
  if (userRole === "EMPLEADO_CONTROL" && inscripcion.estadoBeca !== "EN_EVALUACION") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-blue-500 text-white p-4 rounded-md shadow-md text-center">
          ¡Lo sentimos! Esta Beca no se encuentra en evaluación.
        </div>
        <div className="mt-4">
          <Button onClick={() => window.history.back()}> Volver atrás</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-10 flex flex-wrap w-full justify-center">
      <Card className="mt-6 w-96">
        <CardBody className="p-10 pb-3 gap-5">
          <Typography variant="h4" color="black" className="mb-2 text-center">
            Inscripción a Beca N° {inscripcion.id}
          </Typography>
          <Typography>
            Ingresos: {inscripcion.ingresos ? "Sí" : "No"}
          </Typography>
          <Typography>Tipo de vivienda: {inscripcion.tipoVivienda}</Typography>
          <Typography>Condición: {inscripcion.condVivienda}</Typography>
          <Typography>Grupo familiar: {inscripcion.grupoFamiliar}</Typography>
          <Typography>Año de inscripción: {inscripcion.anio}</Typography>

          <div className="w-full flex flex-wrap justify-center gap-5">
            {userRole === "EMPLEADO_CONTROL" && inscripcion.estadoBeca === "EN_EVALUACION" && (
              <>
                <Button
                  onClick={() => handleAprobar(inscripcion.id)}
                  className="bg-green-600 mt-5"
                >
                  Aprobar
                </Button>
                <Button
                  onClick={() => handleDenegar(inscripcion.id)}
                  className="bg-red-600 mt-5 "
                >
                  Denegar
                </Button>
              </>
            )}
          </div>
        </CardBody>

        <CardFooter className="p-10 pt-0">
          <Button onClick={() => window.history.back()} className="w-full">
            Volver
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VisualizarBeca;

