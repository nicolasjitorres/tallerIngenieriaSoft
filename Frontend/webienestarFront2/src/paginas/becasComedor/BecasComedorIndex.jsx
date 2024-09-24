import axios from "axios";
import { useEffect, useState } from "react";
import Tabla from "../../components/tabla/Tabla";

function BecasComedorIndex() {
    const [becasComedor, setBecasComedor] = useState([]);
    const CABECERAS = ['tipoVivienda', 'condVivienda', 'anio', 'idEstudiante', 'grupoFamiliar'];
    const CABECERAS_PERSONALIZADAS = ['Tipo de vivienda', 'Condicion de vivienda', 'Año', 'Id estudiante', 'Grupo familiar'];
    const TITULO = 'Becas comedor';
    const DESCRIPCION = 'CRUD becas comedor, bienvenido.'

    useEffect(() => {
        const fetchBecasComedor = async () => {
            try {
                const response = await axios.get('http://localhost:8080/becascomedor');
                setBecasComedor(response.data);
            } catch (error) {
                console.log('Error al obtener becas comedor, ' + error);
            }
        }
        fetchBecasComedor();
    }, []);

    return (
        <Tabla titulo={TITULO} descripcion={DESCRIPCION} datos={becasComedor} cabeceras={CABECERAS} cabecerasPersonalizadas={CABECERAS_PERSONALIZADAS} />
    );
};

export default BecasComedorIndex;