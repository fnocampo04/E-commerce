import React, { useState } from 'react';
import './CSS/AdminProveedor.css';
import axios from 'axios';



const AdminProveedor = () => {
  const [nit, setNit] = useState('');
  const [nombre, setNombre] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
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
      const response = await axios.post('http://localhost:5000/api/insertarproveedor', {
        nit,
        nombre,
        ciudad,
        correo,
        direccion,
        telefono,
        tipoProducto
      });

    if (response.data.message === 'Proveedor insertado exitosamente') {
        alert("Proveedor insertado exitosamente");
      } else {
        alert("Proveedor no insertado.");
      }
    } catch (err) {
      alert("Error al insertar el proveedor, el proveedor ya existe.");
    }
  };

  return (
    <div className="admin-bg">
      <div className="admin-container">
        <h1>Agregar Proveedor</h1>
        <div className="admin-fields">
          <div className="admin-input">
            <input
              type="text"
              placeholder="NIT de la empresa *"
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              required
            />
          </div>
          <div className="admin-input">
            <input
              type="text"
              placeholder="Nombre de la empresa *"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="admin-input">
            <input
              type="text"
              placeholder="Ciudad *"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              required
            />
          </div>
          <div className="admin-input">
            <input
              type="email"
              placeholder="Correo *"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="admin-input">
            <input
              type="text"
              placeholder="Dirección *"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
          <div className="admin-input">
            <input
              type="tel"
              placeholder="Teléfono *"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <div className="admin-input">
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
          </div>
        </div>
        <button className="submit-btn" onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default AdminProveedor;
