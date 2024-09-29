import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './CSS/LoginLogin.css'
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';


export const LoginLogin = () => {
    const [id_clie, setIdClie] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {getTotalCartItems, getTotalCartAmount, allProducts, cartItems, addToCart, removeFromCart, isLoggedIn, login } = useContext(ShopContext);
    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/login', {
            id_clie,
            pass
          });
          if (response.data.message === 'Login exitoso admin') {
            navigate('/admin')
          }
          if (response.data.message === 'Login exitoso') {
            alert('Login exitoso');
            login(id_clie);
          }
        } catch (err) {
          setError('Credenciales incorrectas');
        }
      };

      useEffect(() => {
        if (isLoggedIn) {
            navigate('/clientmenu'); // Muestra el mensaje de bienvenida si ya ha iniciado sesión
        }
    }, [isLoggedIn]);

  return (
    <div>
      <div className="loginlogin">
        <div className="loginlogin-container">
          <h1>Iniciar Sesión</h1>
          <div className="loginlogin-fields">
          <input
              required
              type="text"
              placeholder="Cédula *"
              value={id_clie}
              onChange={(e) => setIdClie(e.target.value)}
            />
            <input
              required
              type="pass"
              placeholder="Contraseña *"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Continuar</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  )
}