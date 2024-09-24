import axios from "axios";
import { useEffect, useState } from "react";
import Tabla from "../../components/tabla/Tabla";

function EmpleadosIndex() {
    const [empleados, setEmpleados] = useState([]);
    const CABECERAS = ['Nombre', 'dni', 'Rol', 'Direccion', 'Mail'];
    const CABECERAS_PERSONALIZADAS = ['Nombre', 'DNI', 'Rol', 'Direccion', 'Mail'];
    const TITULO = 'Empleados';
    const DESCRIPCION = 'CRUD empleados, bienvenido.'    

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await axios.get('http://localhost:8080/empleados');
                setEmpleados(response.data);
            } catch (error) {
                console.log('Error al obtener empleados, ' + error);
            }
        }
        fetchEmpleados();
    }, []);

    return (
        <Tabla titulo={TITULO} descripcion={DESCRIPCION} datos={empleados} cabeceras={CABECERAS} cabecerasPersonalizadas={CABECERAS_PERSONALIZADAS} />
    );
};

export default EmpleadosIndex;