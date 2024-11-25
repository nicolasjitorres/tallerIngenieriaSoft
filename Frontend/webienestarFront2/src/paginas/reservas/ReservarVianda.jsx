import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
  Alert,
  CardFooter,
} from "@material-tailwind/react";

const ReservarVianda = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viandas, setViandas] = useState([]);
  const [tieneReserva, setTieneReserva] = useState(false);
  const [ultimoEstadoReserva, setUltimoEstadoReserva] = useState(null);

  function obtenerFechaActual() {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();

    return `${dia}-${mes}-${anio}`;
  }

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const reservaResponse = await axios.get(
          `http://localhost:8080/reservas/verificar/${id}`
        );
        setTieneReserva(reservaResponse.data);
      } catch (error) {
        console.error("Error al verificar la reserva:", error);
      }
    };

    fetchReservas();
  }, [id]);

  useEffect(() => {
    const fetchUltimaReserva = async () => {
      try {
        const reservaResponse = await axios.get(
          `http://localhost:8080/reservas/ultima-reserva/${id}`
        );
        setUltimoEstadoReserva(reservaResponse.data);
        console.log("Último estado de reserva:", reservaResponse.data);
      } catch (error) {
        console.error("Error al verificar la última reserva:", error);
      }
    };

    fetchUltimaReserva();
  }, [id]);

  useEffect(() => {
    const fetchViandas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/viandas");
        setViandas(response.data);
      } catch (error) {
        console.error("Error al obtener las viandas:", error);
      }
    };

    fetchViandas();
  }, []);

  const handleReserve = async (vianda) => {
    if (vianda.cantidad <= 0) {
      alert("No hay más viandas disponibles para reservar.");
      return;
    }

    if (tieneReserva) {
      alert("Ya tienes una reserva para hoy.");
      return;
    }

    if (ultimoEstadoReserva.estado == "RESERVADA") {
      alert(
        "No puedes reservar debido a que fuiste penalizado por incumplimiento al no retirar tu ultima reserva."
      );
      return;
    }

    try {
      const reservaData = {
        fecha: new Date().toLocaleDateString("es-AR"),
        opinion: "",
        calificacion: "",
        estado: "RESERVADA",
        idEstudiante: id,
        idVianda: vianda.id,
      };

      const response = await axios.post(
        `http://localhost:8080/reservas`,
        reservaData
      );

      if (response.status === 201) {
        alert("Reserva realizada con éxito.");
        setViandas((prevViandas) =>
          prevViandas.map((v) =>
            v.id === vianda.id ? { ...v, cantidad: v.cantidad - 1 } : v
          )
        );
        window.location.reload();
      }
    } catch (error) {
      console.error(
        "Error al reservar la vianda:",
        error.response ? error.response.data : error
      );
      alert(
        "Hubo un error al realizar la reserva. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePenalizacion = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/reservas/penalizar`,
        ultimoEstadoReserva
      );

      if (response.status === 200) {
        alert("Penalización completada con éxito.");
        window.location.reload();
      }
    } catch (error) {
      console.error(
        "Error al actualizar la vianda penalizada:",
        error.response ? error.response.data : error
      );
      alert(
        "Hubo un error al realizar la penalización. Por favor, inténtalo de nuevo."
      );
    }
  };

  if (tieneReserva) {
    return (
      <div className="container mx-auto p-4">
        <Alert color="blue" className="text-center">
          Ya tienes una reserva para el día de hoy.
        </Alert>
        <div className="text-center mt-4">
          <Button onClick={handleGoBack} color="gray">
            Volver Atrás
          </Button>
        </div>
      </div>
    );
  }

  if (ultimoEstadoReserva && ultimoEstadoReserva.estado === "RESERVADA") {
    return (
      <div className="container mx-auto p-4">
        <Alert color="blue" className="text-center">
          No puedes reservar debido a que fuiste penalizado por incumplimiento
          al no retirar tu última reserva.
        </Alert>
        <div className="text-center mt-4">
          <Button onClick={handlePenalizacion} color="gray">
            Cumplir penalizacion
          </Button>
          <Button onClick={handleGoBack} color="gray">
            Volver Atrás
          </Button>
        </div>
      </div>
    );
  }

  if (
    ultimoEstadoReserva &&
    ultimoEstadoReserva.estado === "PENALIZADA" &&
    ultimoEstadoReserva.fechaPenalizacion != null &&
    obtenerFechaActual() == ultimoEstadoReserva.fechaPenalizacion
  ) {
    return (
      <div className="container mx-auto p-4">
        <Alert color="blue" className="text-center">
          No puedes reservar de momento, pero ya cumpliste con la penalización.
          Espera a el siguiente día.
        </Alert>
        <div className="text-center mt-4">
          <Button onClick={handleGoBack} color="gray">
            Volver Atrás
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="p-4">
      {viandas.filter((vianda) => vianda.cantidad > 0).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {viandas
            .filter((vianda) => vianda.cantidad > 0)
            .map((vianda) => (
              <Card key={vianda.id} className="mt-6 pt-10 w-full">
                <CardHeader className="text-center relative">
                  <img
                    src={
                      vianda.tipo === "Saludable"
                        ? "https://www.herbalife.com/dmassets/regional-reusable-assets/workflow/amer/samcam/lifestyle/como-armar-un-menu-saludable-para-la-semana.png"
                        : "https://gesgourmet.es/wp-content/uploads/2022/11/menu-casero-semanal.jpg"
                    }
                    alt="Imagen del plato"
                    className=" bg-cover"
                  />
                </CardHeader>

                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    Menú {vianda.tipo}
                  </Typography>
                  <Typography>
                    {vianda.plato} y {vianda.postre}
                  </Typography>
                  <Typography>Cantidad restante: {vianda.cantidad}</Typography>
                </CardBody>

                <CardFooter className="pt-0">
                  <Button
                    className="mt-4 w-full"
                    color="blue"
                    onClick={() => handleReserve(vianda)}
                  >
                    Reservar
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      ) : (
        <Typography variant="h6" color="gray" className="text-center w-full">
          No hay viandas disponibles en este momento.
        </Typography>
      )}

      <div className="text-center mt-4">
        <Button onClick={handleGoBack} color="gray">
          Volver Atrás
        </Button>
      </div>
    </section>
  );
};

export default ReservarVianda;
