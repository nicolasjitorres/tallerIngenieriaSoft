import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Rating } from "@material-tailwind/react";

const RetroVianda = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opinion, setOpinion] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [reservaParaCalificar, setReservaParaCalificar] = useState(null);

  const fetchReserva = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reservas/${id}`);
      console.log(response.data);
      
      setReservaParaCalificar(response.data);
    } catch (error) {
      console.error("Error al obtener la reserva:", error);
    }
  };

  useEffect(() => {
    fetchReserva();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmAprobar = window.confirm(
      "¿Estás seguro de enviar la retroalimentación?"
    );
    if (confirmAprobar) {
      try {
        await axios.put(`http://localhost:8080/reservas/retroalimentacion`, {
          id: id,
          calificacion: calificacion,
          opinion: opinion,
        });

        fetchReserva();
      } catch (error) {
        console.error("Error al emitir la retroalimentación:", error);
      }
    }
  };

  if (reservaParaCalificar == null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-blue-500 text-white p-4 rounded-md shadow-md text-center">
          ¡Lo sentimos! No existe la reserva.
        </div>
        <div className="mt-4">
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
            onClick={() => navigate("/")}
          >
            Volver Atrás
          </button>
        </div>
      </div>
    );
  }

  if (reservaParaCalificar.opinion !== null && reservaParaCalificar.opinion.trim() !== '') {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-blue-500 text-white p-4 rounded-md shadow-md text-center">
          ¡Muchas gracias! Tendremos en cuenta su opinión.
        </div>
        <div className="mt-4">
          <Button onClick={() => navigate("/")}> Volver atras</Button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="bg-white p-6 rounded-lg shadow-md w-full max-w-md m-5">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Retroalimentación</h2>
          <p className="text-gray-600">
            Por favor, comparte tu opinión sobre nuestro servicio.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Deja tu opinión</h3>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe tu opinión aquí..."
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Califica tu vianda</h3>
            <Rating value={0} onChange={(value) => setCalificacion(value)} />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Enviar Opinión
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default RetroVianda;
