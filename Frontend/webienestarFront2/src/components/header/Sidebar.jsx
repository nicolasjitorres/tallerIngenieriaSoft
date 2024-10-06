import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
  HomeIcon,
  FolderOpenIcon,
  BellIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CheckIcon,
  BookmarkIcon,
  FolderIcon,
  TvIcon,
} from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';


export function Sidebar() {
  const userRole = "estudiante";

  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="bg-white mt-14 !rounded-none h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Menu inicio
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to={`/`}>Inicio</Link>
        </ListItem>

        {userRole === "estudiante" && (
          <>
            {/* Sección Beca Comedor */}
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FolderOpenIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Beca Comedor
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>Inscripción a Beca Comedor</ListItem>
                  <ListItem>Historial de Becas</ListItem>
                </List>
              </AccordionBody>
            </Accordion>

            {/* Sección Reservas */}
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <BellIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Reservas
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem><Link to={`/reservas/reservar/1`}>Realizar una Reserva</Link></ListItem>
                  <ListItem><Link to={`/reservas/historial/1`}>Historial de Reservas</Link></ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          </>
        )}

        {userRole === "empleado_control" && (
          <>
            {/* Sección Beca Comedor */}
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FolderOpenIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Beca Comedor
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItem><Link to={`/becasComedor`}>Lista de Inscripciones</Link></ListItem>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          </>
        )}

        {userRole === "empleado_comedor" && (
          <>
            {/* Sección Beca Comedor */}
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <BellIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Reservas
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix></ListItemPrefix>
                    <Link to={`/reservas/lista`}>Lista de Reservas</Link>
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix></ListItemPrefix>
                    <Link to={`/viandas/menu_del_dia`}>Elegir el Menú del Dia</Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          </>
        )}

        {userRole === "empleado_secretario" && (
          <>
            {/* Sección Beca Comedor */}
            <Accordion
              open={open === 3}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 3}>
                <AccordionHeader
                  onClick={() => handleOpen(3)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Informes
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix></ListItemPrefix>
                    <Link to={`/viandas/informe`}>Informes de Reservas</Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          </>
        )}

        {userRole === "admi" && (
          <>
            {/* Sección Beca Comedor */}
            <Accordion
              open={open === 4}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 4}>
                <AccordionHeader
                  onClick={() => handleOpen(4)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <UserGroupIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Usuarios
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix></ListItemPrefix>
                    <Link to={`/estudiantes`}>Estudiantes</Link>
                  </ListItem>
                </List>
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix></ListItemPrefix>
                    <Link to={`/empleados`}>Empleados</Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          </>
        )}

        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to={`/perfil`}>Perfil</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
