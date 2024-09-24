import axios from "axios";
import { useEffect, useState } from "react";
import Tabla from "../../components/tabla/Tabla";

function ReservasIndex() {
    const [reservas, setReservas] = useState([]);
    const CABECERAS = ['fecha', 'opinion', 'calificacion', 'estado', 'idEstudiante', 'idVianda'];
    const CABECERAS_PERSONALIZADAS = ['Fecha', 'Opinión', 'Calificación', 'Estado', 'Id estudiante', 'Id vianda'];
    const TITULO = 'Reservas';
    const DESCRIPCION = 'CRUD reservas, bienvenido.'

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/reservas');
                setReservas(response.data);
            } catch (error) {
                console.log('Error al obtener reservas, ' + error);
            }
        }
        fetchReservas();
    }, []);

    return (
        <Tabla titulo={TITULO} descripcion={DESCRIPCION} datos={reservas} cabeceras={CABECERAS} cabecerasPersonalizadas={CABECERAS_PERSONALIZADAS} />
    );
};

export default ReservasIndex;