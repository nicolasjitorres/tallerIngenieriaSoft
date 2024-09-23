// MenuDia.js
import React, { useState } from 'react';
import './menuDia.css';

// Opciones de menú categorizadas
const menuOptions = {
  Clásico: [
    ['Asado', 'Dulce de leche'],
    ['Empanadas', 'Chocotorta'],
    ['Milanesa', 'Helado artesanal'],
    ['Locro', 'Pastelito'],
    ['Provoleta', 'Tarta de ricota'],
    ['Pizza a la piedra', 'Flan con dulce de leche'],
    ['Tarta de acelga', 'Panchuker'],
    ['Choripán', 'Torta frita'],
    ['Sándwich de miga', 'Galletitas de manteca'],
    ['Fugazza', 'Budín de pan'],
    ['Bife de chorizo', 'Torta de manzana'],
    ['Matambre a la pizza', 'Helado de crema americana'],
    ['Ñoquis', 'Tarta de frutas'],
    ['Arroz con pollo', 'Galleta de arroz'],
    ['Pollo al horno', 'Mousse de maracuyá'],
  ],
  Saludable: [
    ['Pasta al pesto', 'Frutas frescas'],
    ['Sopa de verduras', 'Yogur natural'],
    ['Ensalada de quinoa', 'Frutas de temporada'],
    ['Tortilla española', 'Pudín de chía'],
    ['Pescado a la parrilla', 'Helado de yogurt'],
  ],
};

const MenuDia = () => {
  const [clasico, setClasico] = useState('');
  const [saludable, setSaludable] = useState('');

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
            {menuOptions.Clásico.map((menu, index) => (
              <option key={index} value={`${menu[0]} y ${menu[1]}`}>
                {menu[0]} y {menu[1]}
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
            {menuOptions.Saludable.map((menu, index) => (
              <option key={index} value={`${menu[0]} y ${menu[1]}`}>
                {menu[0]} y {menu[1]}
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
