import React, { useState, useEffect } from "react";
import axios from "axios";
import "./listaReservas.css";

const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Número de reservas por página

  // Obtiene la fecha actual en formato YYYY-MM-DD
  const obtenerFechaActual = () => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, "0");
    const day = String(hoy.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  // Filtra las reservas por la fecha actual
  const filtrarReservasPorFecha = (reservas) => {
    const fechaActual = obtenerFechaActual();
    return reservas.filter((reserva) => reserva.fecha === fechaActual);
  };

  const fetchEstudiantes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/estudiantes");
      setEstudiantes(response.data);
    } catch (error) {
      setError(error);
      console.error("Error al obtener los estudiantes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  // Función para obtener las iniciales a partir del nombre del estudiante
  const obtenerIniciales = (nombre) => {
    if (!nombre) return ""; // Verificar que el nombre no sea undefined o null
    return nombre.charAt(0).toUpperCase(); // Obtener la primera letra y convertirla a mayúscula
  };

  // Obtiene las reservas y estudiantes
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/reservas");
        const reservasDeHoy = filtrarReservasPorFecha(response.data);
        setReservas(reservasDeHoy);
      } catch (error) {
        setError(error);
        console.error("Error al obtener las reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

   const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reservas.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
        integrity="sha256-3sPp8BkKUE7QyPSl6VfBByBroQbKxKG7tsusY2mhbVY="
        crossOrigin="anonymous"
      />

      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="career-search mb-60">
              <form action="#" className="career-form mb-60">
                <div className="row">
                  <div className="col-md-6 col-lg-3 my-3">
                    <div className="input-group position-relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por DNI"
                        id="keywords"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 my-3">
                    <div className="select-container">
                      <select className="custom-select">
                        <option defaultValue={" "}>Tipo de Menu</option>
                        <option value="1">Clasico</option>
                        <option value="2">Saludable</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 my-3">
                    <button
                      type="button"
                      className="btn btn-lg btn-block btn-light btn-custom"
                      id="contact-submit"
                    >
                      Aplicar filtros
                    </button>
                  </div>
                </div>
              </form>

              <div className="filter-result">
                <p className="mb-30 ff-montserrat">
                  Total de reservas: {reservas.length}
                </p>

                {reservas.map((reserva) => (
                  <div
                    key={reserva.id}
                    className="job-box d-md-flex align-items-center justify-content-between mb-30"
                  >
                    <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                      <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                        {reserva.estudiante
                          ? obtenerIniciales(reserva.estudiante.nombre)
                          : ""}
                      </div>
                      <div className="job-content">
                        <h5 className="text-center text-md-left">
                          {reserva.estudiante
                            ? reserva.estudiante.nombre
                            : "Nombre no disponible"}
                        </h5>
                        <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                          <li className="mr-md-4">
                            <i className="zmdi zmdi-pin mr-2"></i>{" "}
                            {reserva.tipoMenu}
                          </li>
                          <li className="mr-md-4">
                            <i className="zmdi zmdi-money mr-2"></i>
                            {reserva.estadoBeca === "APROBADA"
                              ? "Becario"
                              : "No Becario"}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="job-right my-4 flex-shrink-0">
                      <button className="btn d-block w-100 d-sm-inline-block btn-light">
                        Marcar como entregada
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-reset justify-content-center">
                <li className="page-item disabled">
                  <a
                    className="page-link"
                    href="#"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    <i className="zmdi zmdi-long-arrow-left"></i>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item d-none d-md-inline-block">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item d-none d-md-inline-block">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    8
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <i className="zmdi zmdi-long-arrow-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaReservas;
