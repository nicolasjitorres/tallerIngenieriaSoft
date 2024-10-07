import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // Importa useParams
import Tabla from "../../components/tabla/Tabla";

function HistorialInscripcionesIndex() {
    const [becasComedor, setBecasComedor] = useState([]);
    const { id } = useParams();  // Obtén el id del estudiante desde la URL
    const CABECERAS = ['tipoVivienda', 'condVivienda', 'anio', 'idEstudiante', 'grupoFamiliar'];
    const CABECERAS_PERSONALIZADAS = ['Tipo de vivienda', 'Condicion de vivienda', 'Año', 'Id estudiante', 'Grupo familiar'];
    const TITULO = 'Historial de Beca Comedor';
    const DESCRIPCION = 'Aquí podrás visualizar todas tus inscripciones de la Beca Comedor';

    useEffect(() => {
        const fetchBecasComedor = async () => {
            try {
                const response = await axios.get('http://localhost:8080/becascomedor');
                const filteredBecas = response.data.filter(beca => beca.idEstudiante === parseInt(id));  // Filtra por el id del estudiante
                setBecasComedor(filteredBecas);
            } catch (error) {
                console.log('Error al obtener becas comedor, ' + error);
            }
        };
        fetchBecasComedor();
    }, [id]);  // Asegúrate de ejecutar el efecto cuando cambie el id

    return (
        <Tabla 
            titulo={TITULO} 
            descripcion={DESCRIPCION} 
            datos={becasComedor} 
            cabeceras={CABECERAS} 
            cabecerasPersonalizadas={CABECERAS_PERSONALIZADAS} 
        />
    );
};

export default HistorialInscripcionesIndex;