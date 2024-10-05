import { useState, useEffect } from "react";
import axios from "axios";
import TablaHistorial from "../../components/tabla/historial/TablaHistorial";

const ListaReservas = () => {
  const [reservasDelDia, setReservasDelDia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const CABECERAS = ["id", "fecha", "nombreEstudiante", "plato", "postre"];
  const CABECERAS_PERSONALIZADAS = [
    "Numero",
    "Fecha",
    "Nombre del estudiante",
    "Plato",
    "Postre",
  ];
  const TITULO = "Lista de reservas del dia";
  const DESCRIPCION =
    "En este apartado podrá encontrar todas las reservas que se realizaron en el dia.";

  const fetchReservasDelDia = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/reservas/lista-dia"
      );
      setReservasDelDia(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservasDelDia();
  }, []);

  // Calcular las reservas actuales según la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservasDelDia.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reservasDelDia.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(loading, error, currentItems, paginate);
  

  

  return (
    <>
      <TablaHistorial
        titulo={TITULO}
        descripcion={DESCRIPCION}
        datos={reservasDelDia}
        cabeceras={CABECERAS}
        cabecerasPersonalizadas={CABECERAS_PERSONALIZADAS}
        onRefresh={fetchReservasDelDia}
      />
    </>
  );
};

export default ListaReservas;
