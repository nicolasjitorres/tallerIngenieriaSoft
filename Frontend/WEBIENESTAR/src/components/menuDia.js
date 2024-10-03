import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './menuDia.css';

const MenuDia = () => {
  const [clasico, setClasico] = useState('');
  const [saludable, setSaludable] = useState('');
  const [viandas, setViandas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [menuConfirmado, setMenuConfirmado] = useState(false);
  const [cantidadesActualizadas, setCantidadesActualizadas] = useState(false);
  const [cantidadesConfirmadas, setCantidadesConfirmadas] = useState([]);

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
    setViandas(
      viandas.map((vianda) =>
        vianda.id === id ? { ...vianda, cantidadDelDia } : vianda
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Menú del día seleccionado:\nClásico: ${clasico}\nSaludable: ${saludable}`
    );
    setMenuConfirmado(true);
  };

  const handleActualizarCantidades = async () => {
    const confirmar = window.confirm('¿Está seguro de que desea actualizar las cantidades?');

    if (confirmar) {
      try {
        const viandasConCantidad = viandas
          .filter((vianda) => {
            const esClasicoSeleccionado = clasico.includes(vianda.plato);
            const esSaludableSeleccionado = saludable.includes(vianda.plato);
            return esClasicoSeleccionado || esSaludableSeleccionado;
          })
          .map((vianda) => ({
            id: vianda.id,
            cantidadDelDia: vianda.cantidadDelDia,
          }));

        await axios.put('http://localhost:8080/viandas', viandasConCantidad);
        setMensaje('Cantidades actualizadas correctamente');
        setCantidadesActualizadas(true);
        setCantidadesConfirmadas(viandasConCantidad); // Guardar las cantidades confirmadas
      } catch (error) {
        setMensaje('Error al actualizar las cantidades');
        console.error('Error al actualizar las cantidades:', error);
      }
    }
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
            disabled={menuConfirmado} // Deshabilita si el menú ya fue confirmado
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
            disabled={menuConfirmado} // Deshabilita si el menú ya fue confirmado
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

        <button type="submit" disabled={!clasico || !saludable || menuConfirmado}>
          Confirmar Menú
        </button>
      </form>

      {/* Mostrar la sección de actualizar cantidades solo si el menú fue confirmado */}
      {menuConfirmado && (
        <div>
          <h3>Actualizar Cantidades de Viandas</h3>
          <div className="viandas-section">
            {viandas
              .filter((vianda) => {
                const esClasicoSeleccionado = clasico.includes(vianda.plato);
                const esSaludableSeleccionado = saludable.includes(vianda.plato);
                return esClasicoSeleccionado || esSaludableSeleccionado;
              })
              .map((vianda) => (
                <div key={vianda.id} style={{ opacity: cantidadesActualizadas ? 0.5 : 1 }}>
                  <span>{vianda.plato}</span>
                  <input
                    type="number"
                    value={vianda.cantidadDelDia || ''}
                    onChange={(e) => handleCantidadChange(vianda.id, e.target.value)}
                    placeholder="Cantidad del Día"
                    disabled={cantidadesActualizadas} // Deshabilita el input si las cantidades ya han sido actualizadas
                  />
                </div>
              ))}
            <button onClick={handleActualizarCantidades} disabled={cantidadesActualizadas}>
              Actualizar Cantidades
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDia;
