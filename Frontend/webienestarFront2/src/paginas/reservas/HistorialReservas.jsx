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

  const CABECERAS = ["id", "fecha", "estado"];
  const CABECERAS_PERSONALIZADAS = ["Numero de reserva", "Fecha", "Estado"];
  const TITULO = "Historial de reservas";
  const DESCRIPCION =
    "En este apartado podrá encontrar todas las reservas que tiene hasta la fecha.";


  const fetchReservas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reservas");

      const reservasDeEstudiante = response.data.filter(
        (reserva) => reserva.idEstudiante === parseInt(id, 10)
      );
      setReservas(reservasDeEstudiante);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservas.slice(indexOfFirstItem, indexOfLastItem);
  
  console.log(error,loading,currentItems);
  
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

  console.log(paginate);
  
  return (
    <>
      <TablaHistorial
        titulo={TITULO}
        descripcion={DESCRIPCION}
        datos={reservas}
        cabeceras={CABECERAS}
        cabecerasPersonalizadas={CABECERAS_PERSONALIZADAS}
        onRefresh={handleRefresh}
        idEstudiante={id}  // Pasamos el id del estudiante
      />
    </>
  );
  
};

export default HistorialReservas;
