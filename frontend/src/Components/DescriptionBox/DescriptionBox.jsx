import './DescriptionBox.css';
import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';

export const DescriptionBox = ({ productId }) => {
  const { allProducts , idClie , isLoggedIn} = useContext(ShopContext);
  const [showDescription, setShowDescription] = useState(true); // Estado para controlar la vista

  const [opi_calificacion, setopi_calificacion] = useState(0);
  const [opi_comentario, setopi_comentario] = useState('');
  const [opi_IdProd, setopi_IdProd] = useState(0);
  
  // Aquí buscamos el producto una vez que los hooks han sido inicializados
  const product = allProducts.find((prod) => prod.id_prod === productId);
  useEffect(() => {
    if (product) {
      setopi_IdProd(Number(product.id_prod));
    }
  }, [product]);
  const allFieldsFilled = () => {
    return (
        opi_calificacion !== 0 &&  // Aquí corregimos también el uso de `trim` para un número
        opi_comentario.trim() !== ''
    );
  };

  if (!product) {
    return <div>Error al cargar la descripción...</div>;
  }

  // Manejador para cambiar entre descripción y reseñas
  const handleShowDescription = () => setShowDescription(true);
  const handleShowReviews = () => setShowDescription(false);


  const handleSubmit = async () => {
    if (isLoggedIn){

    try {
        const response = await axios.post('http://localhost:5000/api/insertaropinion', {
            opi_calificacion,
            opi_comentario,
            opi_IdProd,
            idClie
            
        });
        
        if (response.data.message === 'Opinion insertada exitosamente') {
          alert("Opinion insertada exitosamente")
        }
        
      } catch (err) {
        
        alert("Error al insertar la opinion")
      }
    }else{
      alert("Debe iniciar sesion para dejar su opinion")
    }
    ;}

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div 
          className={`descriptionbox-nav-box ${showDescription ? 'active' : ''}`} 
          onClick={handleShowDescription}
        >
          Descripción
        </div>
        <div 
          className={`descriptionbox-nav-box ${!showDescription ? 'active' : ''}`} 
          onClick={handleShowReviews}
        >
          Reseñas ({product.opiniones.length})
        </div>
      </div>

      <div className="descriptionbox-content">
        
        {showDescription ? (
          
          <div className="descriptionbox-description">
            <p>{product.descri}</p>
          </div>
        ) : (
          <div className="descriptionbox-reviews">
            <div className='insertar-opinion'>
              <p>¿Desea brindar una opinión?</p>
              <select onChange={(e) => setopi_calificacion(Number(e.target.value))}>
                <option value={0}>Seleccione la Calificación</option>
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </select>
              <input
                type="text"
                placeholder="Comentario"
                onChange={(e) => setopi_comentario(e.target.value)}
              />

              {/* Botón que se muestra solo si todos los campos están llenos */}
              {allFieldsFilled() && (
                <button onClick={handleSubmit}>Enviar</button>
              )}
            </div>
            <p>Otras reseñas</p>
            <ul>
              {product.opiniones && product.opiniones.length > 0 ? (
                product.opiniones.map((opinion, index) => (
                  <li key={index}>
                    <strong>Autor:</strong> {opinion[4]} <br />
                    <strong>Calificación:</strong> {opinion[0]} <br />
                    <strong>Comentario:</strong> {opinion[1]} <br />
                    <strong>Fecha original:</strong> {opinion[2]} <br />
                    <strong>Fecha modificación:</strong> {opinion[3]}
                  </li>
                ))
              ) : (
                <p>No hay opiniones disponibles</p>
              )}
            </ul>
          </div>
          
        )}
      </div>
    </div>
  );
};
