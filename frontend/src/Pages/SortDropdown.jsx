import React, { useState } from 'react';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import './CSS/SortDropdown.css';

const SortDropdown = ({ onOptionSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Por defecto');
  const options = ['Precio: Ascendente', 'Precio: Descendiente', 'Más Vendidos', 'Por defecto'];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionSelected(option); // Aquí llamas a la función pasada desde ShopCategory
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
