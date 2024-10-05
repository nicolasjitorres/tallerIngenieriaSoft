import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Rating,
  Typography,
} from "@material-tailwind/react";

const VisualizarReserva = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [reserva, setReserva] = useState(null); // Estado para la inscripción

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/reservas/${id}`
        );
        setReserva(response.data); // Guardar los datos obtenidos del backend
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
      }
    };

    fetchReserva();
  }, [id]); // Ejecutar el efecto cuando cambie el ID

  if (!reserva) {
    return <div>Cargando...</div>; // Mostrar un mensaje mientras se cargan los datos
  }

  return (
    <div className="container mt-10 flex flex-wrap w-full justify-center">
      <Card className="mt-6 w-96">
        <CardBody className="p-10 pb-3 gap-5">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Reserva N° {reserva.id}
          </Typography>
          <Typography>Fecha: {reserva.fecha}</Typography>
          <Typography>
            {reserva.opinion == null
              ? "Opinión: Sin opinión aún."
              : `Opinión: ${reserva.opinion}`}
          </Typography>
          <Typography>Estado: {reserva.estado}</Typography>
          <Rating value={reserva.calificacion} readonly className="pt-3"/>
        </CardBody>
        <CardFooter className="p-10 pt-0">
          <Button onClick={() => window.history.back()}>Volver</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VisualizarReserva;
