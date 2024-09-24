import PropTypes from 'prop-types';
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";

const TableHeader = ({ headers = [] }) => {
  return (
    <thead>
      <tr>
        {headers.map((head, index) => (
          <th
            key={head}
            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
          >
            <Typography
              variant="small"
              color="blue-gray"
              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
            >
              {head}{" "}
              {index !== headers.length && (
                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
              )}
            </Typography>
          </th>
        ))}
        <th
          key="operations"
          className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
        >
          <Typography
            variant="small"
            color="blue-gray"
            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
          >
            ABM{" "}
          </Typography>
        </th>
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string)
};

export default TableHeader;
