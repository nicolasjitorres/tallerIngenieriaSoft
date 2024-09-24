import axios from "axios";
import { useEffect, useState } from "react";
import Tabla from "../../components/tabla/Tabla";

function EstudiantesIndex() {
    const [estudiantes, setEstudiantes] = useState([]);
    const CABECERAS = ['Nombre', 'dni', 'Legajo', 'Facultad', 'Carrera'];
    const CABECERAS_PERSONALIZADAS = ['Nombre', 'DNI', 'Legajo', 'Facultad', 'Carrera'];
    const TITULO = 'Estudiantes';
    const DESCRIPCION = 'CRUD estudiantes, bienvenido.'

    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/estudiantes');
                setEstudiantes(response.data);
            } catch (error) {
                console.log('Error al obtener estudiantes, ' + error);
            }
        }
        fetchEstudiantes();
    }, []);

    return (
        <Tabla titulo={TITULO} descripcion={DESCRIPCION} datos={estudiantes} cabeceras={CABECERAS} cabecerasPersonalizadas={CABECERAS_PERSONALIZADAS} />
    );
};

export default EstudiantesIndex;