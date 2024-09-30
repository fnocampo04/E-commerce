import React, { useState } from 'react';
import './CSS/AdminDescuento.css';
import axios from 'axios';

export const AdminDescuento = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [porcentajeDescuento, setPorcentajeDescuento] = useState('');
  const [tipoProducto, setTipoProducto] = useState({
    ROPA: false,
    PANTALON: false,
    ZAPATO: false,
    ACCESORIO: false
  });


  const handleTipoProductoChange = (tipo) => {
    setTipoProducto({
      ...tipoProducto,
      [tipo]: !tipoProducto[tipo],
    });
  };


  const handleSubmit = async () => {
    

    try {
        const response = await axios.post('http://localhost:5000/api/insertarDescuento', {
            fechaInicio,
            fechaFin,
            porcentajeDescuento,
            tipoProducto
        });
        
        if (response.data.message === 'Descuento insertado exitosamente') {
          alert("Descuento insertado exitosamente")
        }
        
      } catch (err) {
        
        alert("Error al insertar el Descuento")
      }
    };

  return (
    <div className="admin-container">
      <h1>Agregar Descuento</h1>
      <div className="admin-fields">
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          placeholder="Fecha de inicio *"
        />
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          placeholder="Fecha de fin *"
        />
        <input
          type="number"
          value={porcentajeDescuento}
          onChange={(e) => setPorcentajeDescuento(e.target.value)}
          placeholder="Porcentaje de descuento *"
          min="0"
          max="100"
        />

        <h4>Aplicar descuento a:</h4>
        <div className="product-type-checkboxes">
          <label>
            <input
              type="checkbox"
              checked={tipoProducto.ROPA}
              onChange={() => handleTipoProductoChange('ROPA')}
            />
            Ropa
          </label>
          <label>
            <input
              type="checkbox"
              checked={tipoProducto.PANTALON}
              onChange={() => handleTipoProductoChange('PANTALON')}
            />
            Pantalón
          </label>
          <label>
            <input
              type="checkbox"
              checked={tipoProducto.ZAPATO}
              onChange={() => handleTipoProductoChange('ZAPATO')}
            />
            Zapatos
          </label>
          <label>
            <input
              type="checkbox"
              checked={tipoProducto.ACCESORIO}
              onChange={() => handleTipoProductoChange('ACCESORIO')}
            />
            Accesorios
          </label>
        </div>


        <button onClick={handleSubmit}>Guardar Descuento</button>
      </div>
    </div>
  );
};

export default AdminDescuento;
