import { useState, useEffect } from "react";
import axios from "axios";


const Estudiantes = () => {

    const [estudiantes, setEstudiantes] = useState([]);


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
        <div>
            <h3>Lista de estudiantes</h3>
            {estudiantes.length == 0 ? (
                <p>No existen estudiantes</p>
            ) : (
                estudiantes.map((estudiante) => (
                    <div key={estudiante.id}>
                        <li key={estudiante.id}>
                            {`Nombre: ${estudiante.nombre}, legajo: ${estudiante.legajo}`}
                        </li>
                    </div>
                ))
            )}


        </div>
    )



}

export default Estudiantes;