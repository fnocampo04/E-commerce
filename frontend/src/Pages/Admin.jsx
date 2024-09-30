import React from 'react'
import './CSS/Admin.css'
import logo from '../Components/Assets/AvellanaLogoNegro-02.svg';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
  const navigate = useNavigate()
  return (
    <div>
    <div className='admin-bg'>
      <div className='portada'>
      <img src={logo} className='logoAvellana'/><h1 className='titulo-blanco'>| ADMIN</h1>
      </div>
      <div className="admin-container">
      <h1>En que lugar desea los cambios?</h1>
      <div className="admin-fields">
        <button onClick={() => navigate('/admin/producto')}>PRODUCTO</button>
        <button>PROVEEDOR</button>
        <button>DESCUENTOS</button>
        </div>

      </div>
    </div>
    </div>
  )
}