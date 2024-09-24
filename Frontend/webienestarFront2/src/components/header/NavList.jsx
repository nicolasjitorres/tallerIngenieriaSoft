import React from "react";
import { Typography, MenuItem, Input } from "@material-tailwind/react";
import { UserCircleIcon, CubeTransparentIcon, CodeBracketSquareIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const navListItems = [
  { label: "Estudiantes", icon: UserCircleIcon, path: '/estudiantes' },
  { label: "Empleados", icon: CubeTransparentIcon, path: '/empleados' },
  { label: "Viandas", icon: CodeBracketSquareIcon, path: '/viandas' },
];

function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center bg-gray-500">

      <div className="p-2">
        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
      </div>

      {navListItems.map(({ label, icon, path }) => (
        <Typography
          key={label}
          as="a"
          href={path}
          variant="small"
          color="white"
          className="font-medium text-white"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full hover:bg-[#c09696] hover:text-gray-900 group">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-white group-hover:text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

export default NavList;
