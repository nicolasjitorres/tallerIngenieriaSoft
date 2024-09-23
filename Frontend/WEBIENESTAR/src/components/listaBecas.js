import React, { useState } from "react";
import "./listaBecas.css";

const ListaReservas = () => {
  const inscripciones = [
    {
      id: 1,
      nombre: "Juan Pérez",
      carrera: "Ingeniería de Sistemas",
      email: "juan.perez@universidad.com",
      estado: "Pendiente",
    },
    {
      id: 2,
      nombre: "Ana Gómez",
      carrera: "Administración de Empresas",
      email: "ana.gomez@universidad.com",
      estado: "Pendiente",
    },
    {
      id: 3,
      nombre: "Carlos Ruiz",
      carrera: "Derecho",
      email: "carlos.ruiz@universidad.com",
      estado: "Pendiente",
    },
    {
      id: 4,
      nombre: "Laura Martínez",
      carrera: "Psicología",
      email: "laura.martinez@universidad.com",
      estado: "Pendiente",
    },
    {
      id: 5,
      nombre: "Pedro López",
      carrera: "Contabilidad",
      email: "pedro.lopez@universidad.com",
      estado: "Pendiente",
    },
    {
      id: 6,
      nombre: "Sofía Torres",
      carrera: "Biología",
      email: "sofia.torres@universidad.com",
      estado: "Pendiente",
    },
    {
      id: 7,
      nombre: "Andrés Jiménez",
      carrera: "Física",
      email: "andres.jimenez@universidad.com",
      estado: "Pendiente",
    },
    {
      id: 8,
      nombre: "María Gómez",
      carrera: "Química",
      email: "maria.gomez@universidad.com",
      estado: "Pendiente",
    },
    {
      id: 9,
      nombre: "Lucía Fernández",
      carrera: "Matemáticas",
      email: "lucia.fernandez@universidad.com",
      estado: "Pendiente",
    },
    {
      id: 10,
      nombre: "Diego Castillo",
      carrera: "Historia",
      email: "diego.castillo@universidad.com",
      estado: "Pendiente",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calcular las inscripciones actuales
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inscripciones.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(inscripciones.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
      />
      <h2 className="title">Inscripciones Beca Comedor</h2>
      <table className="reserva-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((inscripcion, index) => (
            <tr key={inscripcion.id}>
              <td>{index + 1 + indexOfFirstItem}</td>
              <td>{inscripcion.nombre}</td>
              <td>{inscripcion.carrera}</td>
              <td>{inscripcion.email}</td>
              <td>
                <span className="badge">{inscripcion.estado}</span>
              </td>
              <div class="btn-container">
                <button class="btn approve-btn">Aprobar</button>
                <button class="btn deny-btn">Denegar</button>
                <button class="btn visualize-btn">Visualizar</button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default ListaReservas;
