import React from 'react'
import './NewsLetter.css'
import { useNavigate } from 'react-router-dom';


export const NewsLetter = () => {
  const navigate = useNavigate()
  return (
    <div className='newsletter'>
        <h1>Consigue ofertas exclusivas en tu correo electrónico</h1>
        <p>Suscribete a nuestras publicaciones para mantenerte informado</p>
        <div>
            <input type="email" placeholder='Tu correo electrónico'/>
            <button onClick={() => navigate('/loginsup')}>Suscribirse</button>
        </div>
    </div>
  )
}
