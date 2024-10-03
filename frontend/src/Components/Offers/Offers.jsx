import React from 'react'
import './Offers.css'
import { useNavigate } from 'react-router-dom';


export const Offers = () => {
  const navigate = useNavigate()
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Exclusivas</h1>
            <h1>Ofertas para ti</h1>
            <p>LOS MEJORES ACCESORIOS</p>
            <button onClick={() => navigate('/accesorios')}>Ver ahora</button>
        </div>
        <div className='offers-right'>
        </div>
    </div>
  )
}
