import PropTypes from 'prop-types';
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

const TableRow = ({ data, columns }) => {
    return (

        <tr key={data.id}>
            {columns.map((col, index) => (
                <td key={index} className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        {data[col.charAt(0).toLowerCase() + col.slice(1)] || "N/A"}
                    </Typography>
                </td>
            ))}

            <td className="p-4 border-b border-blue-gray-50">
                <Tooltip content="Edit">
                    <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
            </td>

        </tr>

    );
};

TableRow.propTypes = {
    data: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableRow;
