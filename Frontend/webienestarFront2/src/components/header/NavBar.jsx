import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/solid";

import logo from '../../assets/logo.png'
import { Sidebar } from "./Sidebar";
import { useLocation } from "react-router-dom"; // Importar useLocation

function NavBar() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const location = useLocation(); // Obtener la ubicación actual

    const toggleIsSidebarOpen = () => setIsSidebarOpen((cur) => !cur);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setIsSidebarOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Rutas donde no se debe mostrar el Sidebar
    const noSidebarRoutes = ["/login", "/register"];

    return (
        <>
            <Navbar className="z-50 fixed mx-auto max-w-screen-3xl p-2 rounded-none lg:pl-6 bg-[#a70000] !border-none">
                <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">

                    <IconButton
                        size="sm"
                        color="white"
                        variant="text"
                        onClick={toggleIsSidebarOpen}
                        className="ml-2 mr-2"
                        disabled={noSidebarRoutes.includes(location.pathname)} // Deshabilitar botón en rutas sin Sidebar
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </IconButton>

                    <Typography
                        as="a"
                        className="mr-4 ml-4 cursor-pointer py-1.5 font-bold text-white flex gap-1"
                    >
                        <img src={logo} className="h-6" />
                        WEBIENESTAR
                    </Typography>
                </div>
            </Navbar>

            {/* Solo mostrar Sidebar si no estamos en Login o Register */}
            {!noSidebarRoutes.includes(location.pathname) && (
                <div className={`fixed top-15 left-0 h-full transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <Collapse open={isSidebarOpen}>
                        <Sidebar />
                    </Collapse>
                </div>
            )}
        </>
    );
}

export default NavBar;
