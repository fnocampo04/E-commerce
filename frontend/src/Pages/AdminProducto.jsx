import React, { useState } from 'react';
import './CSS/AdminProducto.css';
import logo from '../Components/Assets/AvellanaLogoNegro-02.svg';
import axios from 'axios';


export const AdminProducto = () => {
  const [nombre, setNombreProd] = useState('');
  const [valor_base, setValorBase] = useState('');
  const [descri, setDescri] = useState('');
  const [genero, setGenero] = useState(''); 
  const [categoria, setCategoria] = useState(''); 
  const [numImagenes, setNumImagenes] = useState(0); 
  const [imagenes, setImagenes] = useState([]);
  const [categoriaAccesorio, setcategoriaAccesorio] = useState('');
  const [zapatoMaterial, setzapatoMaterial] = useState('');
  const [estiloRopa, setestiloRopa] = useState('');
  //const [opcionAdicional, setOpcionAdicional] = useState('');
  const [talla, setTalla] = useState(''); 
  const [color, setColor] = useState(''); 
  const [stock, setStock] = useState(0);


  const handleImageChange = (index, value) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes[index] = value;
    setImagenes(nuevasImagenes);
  };

  const renderImageInputs = () => {
    const inputs = [];
    for (let i = 0; i < numImagenes; i++) {
      inputs.push(
        <input
          key={i}
          type="text"
          placeholder={`URL de la imagen ${i + 1}`}
          value={imagenes[i] || ''}
          onChange={(e) => handleImageChange(i, e.target.value)}
        />
      );
    }
    return inputs;
  };

  
  const renderOpcionesAdicionales = () => {
    if (categoria === 'ROPA' || categoria === 'PANTALON') {
      return (
        <input
          type="text"
          placeholder="Ingrese el estilo"
          value={estiloRopa}
          onChange={(e) => setestiloRopa(e.target.value)}
        />
      );
    } else if (categoria === 'ZAPATO') {
      return (
        <input
          type="text"
          placeholder="Ingrese el material"
          value={zapatoMaterial}
          onChange={(e) => setzapatoMaterial(e.target.value)}
        />
      );
    } else if (categoria === 'ACCESORIO') {
      return (
        <select
          value={categoriaAccesorio}
          onChange={(e) => setcategoriaAccesorio(e.target.value)}
        >
          <option value="">Seleccione el tipo de accesorio</option>
          <option value="ARETE">Arete</option>
          <option value="RELOJ">Reloj</option>
          <option value="PULSERA">Pulsera</option>
          <option value="COLLAR">Collar</option>
          <option value="GAFAS">Gafas</option>
          <option value="SOMBRERO">Sombrero</option>
        </select>
      );
    }
    return null;
  };

  const renderTallaInput = () => {
    if (categoria === 'ROPA') {
      return (
        <select
          value={talla}
          onChange={(e) => setTalla(e.target.value)}
        >
          <option value="">Seleccione la talla</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      );
    } else if (categoria === 'ZAPATO' || categoria === 'PANTALON') {
      return (
        <input
          required
          type="number"
          placeholder="Ingrese la talla numérica"
          value={talla}
          onChange={(e) => setTalla(e.target.value)}
        />
      );
    }
    return null;
  };

  
  const allFieldsFilled = () => {
    return (
        nombre.trim() !== '' &&
        valor_base.trim() !== '' &&
        descri.trim() !== '' &&
        genero.trim() !== '' &&
        categoria.trim() !== '' &&
        color.trim() !== '' &&
        stock > 0 &&
        talla.trim() !== '' &&
        (numImagenes >= 1 && imagenes.length === numImagenes)
    );
  };

  const handleSubmit = async () => {
    

    try {
        const response = await axios.post('http://localhost:5000/api/insertarproducto', {
            nombre,
            valor_base: parseFloat(valor_base),
            descri,
            genero,
            categoria,
            imagenes,
            categoriaAccesorio,
            zapatoMaterial,
            estiloRopa,
            talla,
            stock
        });
        
        if (response.data.message === 'Producto insertado exitosamente') {
          alert("Producto insertado exitosamente")
        }
        
      } catch (err) {
        
        alert("Error al insertar el producto")
      }
    };
      
    
    
  

  return (
    <div>
      <div className='admin-bg'>
        <div className='portada'>
          <img src={logo} className='logoAvellana' alt="Logo" />
          <h1 className='titulo-blanco'>| ADMIN</h1>
        </div>

        <div className="admin-container">
          <h1>Inserte un nuevo producto</h1>
          <div className="admin-fields">
            <div className='izq1'>
              <input
                required
                type="text"
                placeholder="Nombre del producto *"
                value={nombre}
                onChange={(e) => setNombreProd(e.target.value)}
              />
              
              <input
                required
                type="number"
                placeholder="Valor base *"
                value={valor_base}
                onChange={(e) => setValorBase(e.target.value)}
              />

              <input className="descripcion-input"
                required
                type="text"
                placeholder="Descripción *"
                value={descri}
                onChange={(e) => setDescri(e.target.value)}
              />

              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
                <option value="">Seleccione el genero</option>
                <option value="MA">Masculino</option>
                <option value="FE">Femenino</option>
                <option value="UNI">Unisex</option>
              </select>

              <select
                value={categoria}
                onChange={(e) => {
                  setCategoria(e.target.value);
                  
                }}
              >
                <option value="">Seleccione la categoria</option>
                <option value="ROPA">Ropa</option>
                <option value="PANTALON">Pantalón</option>
                <option value="ZAPATO">Zapato</option>
                <option value="ACCESORIO">Accesorio</option>
              </select>

              
              {renderOpcionesAdicionales()}
              
              {renderTallaInput()}
              
              <input
                required
                type="text"
                placeholder="Color *"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div>
              <label>
                Stock *:
                <input
                  required
                  type="number"
                  placeholder="Stock *"
                  value={stock}
                  onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                />
              </label>
            </div>
            <div className='der1'>
              <label>
                Numero de imagenes *:
                <input
                  required
                  type="number"
                  placeholder="Número de imágenes"
                  min="0"
                  max="8"
                  value={numImagenes}
                  onChange={(e) => setNumImagenes(parseInt(e.target.value) || 0)}
                />
              </label>

              {renderImageInputs()}
            </div>
          </div>
          {/* Botón que se muestra solo si todos los campos están llenos */}
          {allFieldsFilled() && (
            <button onClick={handleSubmit}>Enviar</button>
          )}
        </div>
      </div>
    </div>
  );
};
