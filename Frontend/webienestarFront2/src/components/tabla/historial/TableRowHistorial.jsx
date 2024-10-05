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
        {data.estado == "RETIRADA" ? (
          <Tooltip content="Dar una calificación">
            <Button>Calificar</Button>
          </Tooltip>
        ) : (
          <></>
        )}
        {data.estado == "RESERVADA" ? (
          <>
            <Tooltip content="Ver reserva">
              <Button>Ver</Button>
            </Tooltip>
            <Tooltip content="Cancelar reserva">
              <Button>Cancelar</Button>
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
