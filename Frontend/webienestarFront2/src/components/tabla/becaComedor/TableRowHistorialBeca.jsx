import PropTypes from "prop-types";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";

const TableRowHistorialBeca = ({ data, columns, onRefresh }) => {
  const navigate = useNavigate();

  const handleVisualizar = async (id) => {
    navigate(`/becasComedor/visualizar/${id}`);
  };

  // Convertir data.fecha de 'YYYY-MM-DD' a 'DD-MM-YYYY'
  const formatFecha = (fecha) => {
    const [year, month, day] = fecha.split("-");
    return `${day}-${month}-${year}`;
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
      {data.id ? ( 
        <Tooltip content="Visualizar">
          <Button onClick={() => handleVisualizar(data.id)}>
            Visualizar
          </Button>
        </Tooltip>
      ) : null}
    </tr>
  );
};

TableRowHistorialBeca.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRefresh: PropTypes.func,
};

export default TableRowHistorialBeca;
