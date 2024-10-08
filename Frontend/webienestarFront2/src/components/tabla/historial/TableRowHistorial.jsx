import PropTypes from "prop-types";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router";

const TableRowHistorial = ({ data, columns, onRefresh }) => {
  const navigate = useNavigate();

  const handleEntregar = async (id) => {
    const confirmEntrega = window.confirm(
      "¿Estás seguro de entregar la vianda?"
    );
    if (confirmEntrega) {
      try {
        await axios.put(`http://localhost:8080/reservas`, {
          id: id,
          estado: "ENTREGADA",
        });
      } catch (error) {
        console.error("Error al entregar la vianda:", error);
      }
    }
    onRefresh();
  };

  const handleVisualizar = async (id) => {
    navigate(`/becasComedor/visualizar/${id}`);
  };

  // Función para navegar a la página de Ver Reserva
  const handleVerReserva = (id) => {
    navigate(`/reservas/${id}`); // Ruta a la página de ver la reserva
  };

  const handleCalificar = (id) => {
    console.log(id);
    navigate(`/reservas/${id}/calificar/`);
  };

  const handleCancelarReserva = async (id) => {
    const confirmCancelacion = window.confirm(
      "¿Estás seguro de cancelar la reserva?"
    );
    if (confirmCancelacion) {
      try {
        await axios.put(`http://localhost:8080/reservas/cancelar/${id}`, {
          id: id,
          estado: "CANCELADA",
        });
        if (onRefresh) onRefresh(); // Llamar a onRefresh después de la cancelación
      } catch (error) {
        console.error("Error al cancelar la reserva:", error);
      }
    }
  };

  // Convertir data.fecha de 'YYYY-MM-DD' a 'DD-MM-YYYY'
  const formatFecha = (fecha) => {
    const [year, month, day] = fecha.split("-");
    return `${day}-${month}-${year}`;
  };

  // Obtener la fecha actual en formato 'DD-MM-YYYY'
  const currentDate = new Date();
  const formattedCurrentDate = `${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}-${String(currentDate.getMonth() + 1).padStart(
    2,
    "0"
  )}-${currentDate.getFullYear()}`;

  return (
    <tr key={data.id}>
      {columns.map((col, index) => (
        <td key={index} className="p-4 border-b border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {data[col.charAt(0).toLowerCase() + col.slice(1)] || "N/A"}
          </Typography>
        </td>
      ))}

      <td className="p-4 border-b border-blue-gray-50 gap-1 flex">
        {data.estado === "RETIRADA" ? (
          <Tooltip content="Dar una calificación">
            <Button onClick={() => handleCalificar(data.id)}>Calificar</Button>
          </Tooltip>
        ) : data.estado === "RESERVADA" && data.fecha === formattedCurrentDate ? (
          <>
            <Tooltip content="Ver reserva">
              <Button onClick={() => handleVerReserva(data.id)}>
                Ver Reserva
              </Button>
            </Tooltip>
            <Tooltip content="Cancelar reserva">
              <Button onClick={() => handleCancelarReserva(data.idEstudiante)}>
                Cancelar Reserva
              </Button>
            </Tooltip>
          </>
        ) : (
          <></>
        )}
        {data.nombreEstudiante ? (
          <Tooltip content="Entregar vianda en la reserva">
            <Button onClick={() => handleEntregar(data.id)}>Entregar</Button>
          </Tooltip>
        ) : (
          <></>
        )}
        {data.nombreEst ? (
          <Tooltip content="Entregar vianda en la reserva">
            <Button onClick={() => handleVisualizar(data.id)}>
              Visualizar
            </Button>
          </Tooltip>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
};

TableRowHistorial.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRefresh: PropTypes.func,
};

export default TableRowHistorial;
