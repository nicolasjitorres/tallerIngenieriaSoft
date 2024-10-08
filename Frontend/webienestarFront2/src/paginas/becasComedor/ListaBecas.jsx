import { useState, useEffect } from "react";
import axios from "axios";
import TablaHistorialBecaComedor from "../../components/tabla/becaComedor/TablaHistorialBecaComedor";

const ListaBecas = () => {
  const [listaBecas, setListaBecas] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 3;

  const CABECERAS = ["id", "nombreEst", "carrera", "email", "estado"];
  const CABECERAS_PERSONALIZADAS = [
    "Id",
    "Nombre",
    "Carrera",
    "Email",
    "Estado",
  ];
  const TITULO = "Lista de becas en evaluación";
  const DESCRIPCION =
    "En este apartado podrá encontrar todas las becas que se encuentran en evaluación.";

  const fetchListaBecas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/becascomedor/lista"
      );
      setListaBecas(response.data);
    } catch (error) {
      setError(error);
      console.error("Error al obtener las becas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListaBecas();
  }, []);

  // Calcular las listaBecas actuales según la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listaBecas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(listaBecas.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

console.log(loading, error, currentItems);


  return (
    <>
      <TablaHistorialBecaComedor
        titulo={TITULO}
        descripcion={DESCRIPCION}
        datos={listaBecas}
        cabeceras={CABECERAS}
        cabecerasPersonalizadas={CABECERAS_PERSONALIZADAS}
        onRefresh={fetchListaBecas}
      />

      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default ListaBecas;
