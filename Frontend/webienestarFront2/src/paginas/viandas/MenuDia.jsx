import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";

const MenuDia = () => {
  const [clasico, setClasico] = useState('');
  const [saludable, setSaludable] = useState('');
  const [viandas, setViandas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [menuConfirmado, setMenuConfirmado] = useState(false);
  const [cantidadesActualizadas, setCantidadesActualizadas] = useState(false);

  useEffect(() => {
    const fetchViandas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/viandas');
        setViandas(response.data);
      } catch (error) {
        console.error('Error al obtener las viandas:', error);
      }
    };
    fetchViandas();
  }, []);

  const handleSelect = (tipo, value) => {
    if (tipo === 'clasico') setClasico(value);
    else if (tipo === 'saludable') setSaludable(value);
  };

  const handleCantidadChange = (id, cantidadDelDia) => {
    // Validar que la cantidad no sea 0 o menor
    if (cantidadDelDia >= 0) {
      setViandas(
        viandas.map((vianda) =>
          vianda.id === id ? { ...vianda, cantidadDelDia } : vianda
        )
      );
      setMensaje(''); // Limpiar mensaje
    } else {
      setMensaje('La cantidad no puede ser 0 o negativa');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMenuConfirmado(true);
  };

  const handleActualizarCantidades = async () => {
    const confirmar = window.confirm('¿Está seguro de que desea actualizar las cantidades?');
    if (confirmar) {
      try {
        const viandasConCantidad = viandas
          .filter((vianda) => clasico.includes(vianda.plato) || saludable.includes(vianda.plato))
          .map((vianda) => ({
            id: vianda.id,
            cantidad: vianda.cantidadDelDia,
          }));
        await axios.put('http://localhost:8080/viandas', viandasConCantidad);
        setCantidadesActualizadas(true);
        setMensaje('Cantidades actualizadas correctamente');
      } catch (error) {
        setMensaje('Error al actualizar las cantidades');
        console.error('Error al actualizar las cantidades:', error);
      }
    }
  };

  return (
    <div className="p-6 m-auto flex flex-wrap w-full justify-center">
      <Card className="mt-6 mb-6 w-96 p-5 justify-center">
        <Typography variant="h5" color="black" className="mb-8 text-center text-2xl">
          Selecciona el Menú del Día 
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Menú Clásico:</label>
            <select
              value={clasico}
              onChange={(e) => handleSelect('clasico', e.target.value)}
              className="block w-full p-2 border rounded-md bg-white"
              disabled={menuConfirmado}
            >
              <option value="">Selecciona un menú clásico</option>
              {viandas.filter((vianda) => vianda.tipo === 'Clasico').map((vianda) => (
                <option key={vianda.id} value={`${vianda.plato} y ${vianda.postre}`}>
                  {vianda.plato} y {vianda.postre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Menú Saludable:</label>
            <select
              value={saludable}
              onChange={(e) => handleSelect('saludable', e.target.value)}
              className="block w-full p-2 border rounded-md bg-white"
              disabled={menuConfirmado}
            >
              <option value="">Selecciona un menú saludable</option>
              {viandas.filter((vianda) => vianda.tipo === 'Saludable').map((vianda) => (
                <option key={vianda.id} value={`${vianda.plato} y ${vianda.postre}`}>
                  {vianda.plato} y {vianda.postre}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
            disabled={!clasico || !saludable || menuConfirmado}
          >
            Confirmar Menú
          </button>
        </form>

        {menuConfirmado && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Actualizar Cantidades de Viandas</h3>
            <div className="space-y-4">
              {viandas
                .filter((vianda) => clasico.includes(vianda.plato) || saludable.includes(vianda.plato))
                .map((vianda) => (
                  <div key={vianda.id} className="flex items-center space-x-4">
                    <span className="w-48">{vianda.plato}</span>
                    <input
                      type="number"
                      value={vianda.cantidadDelDia || ''}
                      onChange={(e) => handleCantidadChange(vianda.id, Number(e.target.value))}
                      className="p-2 border rounded-md w-full"
                      placeholder="Cantidad del Día"
                      min="1" // Evitar que se ingrese 0
                      disabled={cantidadesActualizadas}
                    />
                  </div>
                ))}
              {mensaje && <p className="text-green-500">{mensaje}</p>}
              <button
                onClick={handleActualizarCantidades}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition disabled:opacity-50"
                disabled={cantidadesActualizadas}
              >
                Actualizar Cantidades
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MenuDia;
