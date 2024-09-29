import React, { useState, useContext, useEffect } from 'react';
import './CSS/LoginSignup.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

export const LoginSignup = () => {
  const navigate = useNavigate();
  const {isLoggedIn} = useContext(ShopContext);

  const [formData, setFormData] = useState({
    id_clie: '',
    nombre: '',
    correo: '',
    password: '',
    tel: '',
    dir: ''
  });

  useEffect(() => {
    if (isLoggedIn) {
        navigate('/clientmenu'); // Muestra el mensaje de bienvenida si ya ha iniciado sesión
    }
}, [isLoggedIn]);

  // Manejar el cambio de los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Enviar el formulario al backend Flask
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/cliente_add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Enviar los datos como JSON
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registro exitoso');
        navigate('/loginlog'); // Redireccionar después del registro
      } else {
        alert(result.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un error en el servidor.');
    }
  };

  return (
    <div>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Registrarse</h1>
          {/* Formulario que ejecuta el handleSubmit al enviar */}
          <form onSubmit={handleSubmit}>
            <div className="loginsignup-fields">
              <input 
                required 
                type="text" 
                name="id_clie" 
                placeholder="Cédula *" 
                value={formData.id_clie} 
                onChange={handleChange} 
              />
              <input 
                required 
                type="text" 
                name="nombre" 
                placeholder="Nombre *" 
                value={formData.nombre} 
                onChange={handleChange} 
              />
              <input 
                required 
                type="email" 
                name="correo" 
                placeholder="Correo electrónico *" 
                value={formData.correo} 
                onChange={handleChange} 
              />
              <input 
                required 
                type="password" 
                name="password" 
                placeholder="Contraseña *" 
                value={formData.password} 
                onChange={handleChange} 
              />
              <input 
                type="text" 
                name="tel" 
                placeholder="Celular" 
                value={formData.tel} 
                onChange={handleChange} 
              />
              <input 
                type="text" 
                name="dir" 
                placeholder="Dirección de entrega" 
                value={formData.dir} 
                onChange={handleChange} 
              />
            </div>
            {/* El botón "Continuar" está dentro del formulario y ejecutará handleSubmit */}
            <button type="submit">Continuar</button>
          </form>
          <p className="loginsignup-login">
            ¿Ya tienes una cuenta? <span><Link to='/loginlog'>Inicia sesión aquí</Link></span>
          </p>
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>Al presionar continuar, estoy de acuerdo con los términos y condiciones.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
