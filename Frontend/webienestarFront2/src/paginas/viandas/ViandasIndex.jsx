import axios from "axios";
import { useEffect, useState } from "react";
import Tabla from "../../components/tabla/Tabla";

function ViandasIndex() {
    const [viandas, setViandas] = useState([]);
    const CABECERAS = ['Tipo', 'Plato', 'Postre'];
    const TITULO = 'Viandas';
    const DESCRIPCION = 'CRUD viandas, bienvenido.'

    useEffect(() => {
        const fetchViandas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/viandas');
                setViandas(response.data);
            } catch (error) {
                console.log('Error al obtener viandas, ' + error);
            }
        }
        fetchViandas();
    }, []);

    return (
        <Tabla titulo={TITULO} descripcion={DESCRIPCION} datos={viandas} cabeceras={CABECERAS} />
    );
};

export default ViandasIndex;