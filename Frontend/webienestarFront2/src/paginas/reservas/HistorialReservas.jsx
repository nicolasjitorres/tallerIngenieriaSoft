import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TablaHistorial from "../../components/tabla/historial/TablaHistorial";

const HistorialReservas = () => {
  const { id } = useParams(); // Captura el id de la URL
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [currentPage, setCurrentPage] = useState(1); // Estado de la página actual
  const itemsPerPage = 3; // Cantidad de items por página
  const [refresh, setRefresh] = useState(false);
  const [viandas, setViandas] = useState({}); // Estado para almacenar la información de las viandas

  const CABECERAS = ["id", "fecha", "estado", "tipo", "plato", "postre"];
  const CABECERAS_PERSONALIZADAS = ["Numero de reserva", "Fecha", "Estado", "Tipo de menú", "Plato", "Postre"];
  const TITULO = "Historial de reservas";
  const DESCRIPCION =
    "En este apartado podrá encontrar todas las reservas que tiene hasta la fecha.";

  const fetchReservas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reservas");
      console.log("Reservas recibidas:", response.data); // Verifica la respuesta de reservas
      const reservasDeEstudiante = response.data.filter(
        (reserva) => reserva.idEstudiante === parseInt(id, 10)
      );
      setReservas(reservasDeEstudiante);

      // Fetch viandas para cada reserva
      const viandasPromises = reservasDeEstudiante.map(reserva => 
        axios.get(`http://localhost:8080/viandas/${reserva.idVianda}`)
      );
      const viandasResponses = await Promise.all(viandasPromises);
      console.log("Viandas recibidas:", viandasResponses); // Verifica las respuestas de viandas
      const viandasData = viandasResponses.reduce((acc, response) => {
        const viandaData = response.data; // Accede al objeto 'data'
        acc[viandaData.id] = {
          id: viandaData.id,
          plato: viandaData.plato,
          postre: viandaData.postre,
          tipo: viandaData.tipo // Asegúrate de que 'tipo' es la propiedad correcta
        }; // Guarda la vianda por su ID
        return acc;
      }, {});
      setViandas(viandasData); // Almacena toda la información de las viandas
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservas.slice(indexOfFirstItem, indexOfLastItem);
  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reservas.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchReservas();
  }, [id, refresh]); // Agregar 'refresh' como dependencia

  const handleRefresh = () => {
    setRefresh(!refresh); // Alterna el valor de 'refresh' para disparar el useEffect
  };

  // Combina las reservas con la información de las viandas
  const reservasConViandas = currentItems.map(reserva => ({
    ...reserva,
    tipo: viandas[reserva.idVianda] ? viandas[reserva.idVianda].tipo : "Desconocido", // Asegúrate de que estás usando la propiedad correcta
    plato: viandas[reserva.idVianda] ? viandas[reserva.idVianda].plato : "Desconocido", // Agrega el plato
    postre: viandas[reserva.idVianda] ? viandas[reserva.idVianda].postre : "Desconocido" // Agrega el postre
  }));

  return (
    <>
      <TablaHistorial
        titulo={TITULO}
        descripcion={DESCRIPCION}
        datos={reservasConViandas} // Pasa las reservas con información de viandas
        cabeceras={CABECERAS}
        cabecerasPersonalizadas={CABECERAS_PERSONALIZADAS}
        onRefresh={handleRefresh}
        idEstudiante={id} // Pasamos el id del estudiante
      />
    </>
  );
};

export default HistorialReservas;
