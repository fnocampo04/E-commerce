import React from 'react'
import './Hero.css'
import arrow_icon from '../Assets/arrow.png'
import { useNavigate } from 'react-router-dom';



export const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className='hero'>
        <div className="hero-left">
          
          <div>
            <p>Descubre tu estilo,</p>
            <p>vive tu esencia.</p>
          </div>
          <div className="hero-latest-btn">
            <div onClick={() => navigate('/ropa')}>Ver colección</div>
            <img src={arrow_icon} alt="" />
          </div>
        </div>
    </div>
  )
}
