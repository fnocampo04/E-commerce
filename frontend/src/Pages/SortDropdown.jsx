import React, { useState } from 'react';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'; // Asegúrate de tener la ruta correcta a tu icono
import './CSS/SortDropdown.css'; // Asegúrate de que la ruta sea correcta

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Ordenar por');
  const options = ['Precio: Bajo a Alto', 'Precio: Alto a Bajo', 'Más Vendidos', 'Nuevos','Por defecto'];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="shopcategory-sort" onClick={() => setIsOpen(!isOpen)}>
      {selectedOption} <img src={dropdown_icon} alt="" />
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
