import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './ProductDisplay.css';
import 'boxicons';
import { ShopContext } from '../../Context/ShopContext';

export const ProductDisplay = ({ productId }) => {
    const { allProducts, addToCart } = useContext(ShopContext);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [isAccessory, setIsAccessory] = useState(false);  // Nuevo estado para accesorios
    const [selectedSize, setSelectedSize] = useState(null); // Estado para la talla seleccionada
    const [availableColors, setAvailableColors] = useState([]); // Colores disponibles
    const [error, setError] = useState('');

    const product = allProducts.find((prod) => prod.id_prod === productId);

    useEffect(() => {
        if (!product) return;

        const fetchSizes = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/prod_talla', {
                    id_prod: productId
                });

                if (response.data.es_accesorio) {
                    setIsAccessory(true);  // Si es accesorio, actualiza el estado
                } else {
                    setAvailableSizes(response.data.tallas);  // Si no es accesorio, carga las tallas
                }
            } catch (error) {
                setError('Error al cargar las tallas.');
            }
        };

        fetchSizes();
    }, [productId, product]);

    // Función para seleccionar la talla y mostrar colores correspondientes
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        const colorsForSize = availableSizes
            .filter((s) => s.talla === size)
            .map((s) => ({ color: s.color, stock: s.stock }));
        setAvailableColors(colorsForSize); // Filtra los colores disponibles para la talla seleccionada
    };

    if (!product) {
        return <div>Error al cargar producto...</div>; 
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {product.img_url.map((img, i) => (
                        <img key={i} src={img}/>
                    ))}
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.img_url[0]} alt={product.nombre} />
                </div>
            </div>

            <div className="productdisplay-right">
                <h1>{product.nombre}</h1>
                <div className="productdisplay-right-stars">
                    {[...Array(5)].map((_, index) => (
                        <box-icon key={index} type='solid' name='star'></box-icon>
                    ))}
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-new">${product.valor_venta}</div>
                </div>

                {/* Si el producto no es accesorio, muestra las tallas */}
                {!isAccessory && (
                    <div className="productdisplay-right-size">
                        <h1>Selecciona el tamaño</h1>
                        <div className="productdisplay-right-sizes">
                            {availableSizes.map((size, index) => (
                                <div
                                    key={index}
                                    className={`size-option ${selectedSize === size.talla ? 'selected' : ''}`}
                                    onClick={() => handleSizeSelect(size.talla)}
                                >
                                    {size.talla}
                                </div>
                            ))}
                        </div>

                        {/* Mostrar los colores disponibles y el stock para la talla seleccionada */}
                        {selectedSize && (
                            <div className="productdisplay-right-colors">
                                <h1>Para este producto de talla {selectedSize}</h1>
                                <div className="productdisplay-right-colors-list">
                                {availableColors.map((colorOption, index) => (
                                    <div key={index} className="color-option">
                                        <span style={{ backgroundColor: colorOption.color }} className="color-circle"></span>
                                        <p>Stock: {colorOption.stock}</p>
                                        {colorOption.stock !== 0 ? (
                                            <button onClick={() => { addToCart(product.id_prod, selectedSize) }}>Añadir al carrito</button>
                                        ) : null}
                                    </div>
                                ))}

                                </div>
                            </div>
                        )}
                    </div>
                )}

                {isAccessory && (
                    <button onClick={() => { addToCart(product.id_prod)}}>Añadir al carrito</button>
                )}

                <p className='productdisplay-right-category'><span>Categoría :</span>{product.categoria}</p>
                <p className='productdisplay-right-category'><span>Etiquetas :</span>Moderno</p>
            </div>
        </div>
    );
}

