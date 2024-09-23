import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './menuDia.css';

const MenuDia = () => {
  const [clasico, setClasico] = useState('');
  const [saludable, setSaludable] = useState('');
  const [viandas, setViandas] = useState([]); // Estado para las viandas obtenidas del backend

  // Obtener las viandas desde el backend al montar el componente
  useEffect(() => {
    const fetchViandas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/viandas');
        setViandas(response.data); // Guardar los datos de las viandas en el estado
      } catch (error) {
        console.error('Error al obtener las viandas:', error);
      }
    };

    fetchViandas();
  }, []);

  // Maneja la selección de menú
  const handleSelect = (tipo, value) => {
    if (tipo === 'clasico') setClasico(value);
    else if (tipo === 'saludable') setSaludable(value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Menú del día seleccionado:\nClásico: ${clasico}\nSaludable: ${saludable}`
    );
  };

  return (
    <div className="menu-dia">
      <h2>Selecciona el Menú del Día</h2>
      <form onSubmit={handleSubmit}>
        {/* Selección de Menú Clásico */}
        <div className="menu-section">
          <label>Menú Clásico:</label>
          <select
            value={clasico}
            onChange={(e) => handleSelect('clasico', e.target.value)}
          >
            <option value="">Selecciona un menú clásico</option>
            {viandas
              .filter((vianda) => vianda.tipo === 'Clasico')
              .map((vianda) => (
                <option key={vianda.id} value={`${vianda.plato} y ${vianda.postre}`}>
                  {vianda.plato} y {vianda.postre}
                </option>
              ))}
          </select>
        </div>

        {/* Selección de Menú Saludable */}
        <div className="menu-section">
          <label>Menú Saludable:</label>
          <select
            value={saludable}
            onChange={(e) => handleSelect('saludable', e.target.value)}
          >
            <option value="">Selecciona un menú saludable</option>
            {viandas
              .filter((vianda) => vianda.tipo === 'Saludable')
              .map((vianda) => (
                <option key={vianda.id} value={`${vianda.plato} y ${vianda.postre}`}>
                  {vianda.plato} y {vianda.postre}
                </option>
              ))}
          </select>
        </div>

        {/* Botón para enviar el menú */}
        <button type="submit" disabled={!clasico || !saludable}>
          Confirmar Menú
        </button>
      </form>
    </div>
  );
};

export default MenuDia;
