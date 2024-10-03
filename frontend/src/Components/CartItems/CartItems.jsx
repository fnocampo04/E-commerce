import React, { useContext , useState, useEffect} from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import axios from 'axios';


export const CartItems = () => {
    const {getTotalCartItems, getTotalCartAmount, allProducts, cartItems, addToCart, removeFromCart, isLoggedIn, login,idClie} = useContext(ShopContext);
    const [showPaymentDetails, setShowPaymentDetails] = useState(false); // Controla si mostramos los detalles de pago
    const [subtotal, setSubtotal] = useState(0); // Inicializa subtotal

    const calculateSubtotal = () => {
        let total = 0; // Inicializa el total a 0

        allProducts.forEach((e) => {
            const cartItem = cartItems[e.id_prod];
            if (cartItem && cartItem.quantity > 0) {
                total += e.valor_venta * cartItem.quantity; // Suma al total
            }
        });

        return total; // Retorna el total calculado
    };

    useEffect(() => {
        setSubtotal(calculateSubtotal()); // Calcula y establece el subtotal cada vez que cambian los productos del carrito
    }, [cartItems, allProducts]);
  
    const handleSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/facturar', {
            idClie,
            subtotal,
            cartItems
          });
    
        if (response.data.message === 'Factura insertada exitosamente') {
            alert("Factura insertada exitosamente "+response.data.nombre+". Gracias por su compra, su factura es la número "+response.data.id_fact)
        }
        } catch (err) {
          alert("Error al insertar la Factura");
        }
      };

    const handlePayment = () => {
      if (isLoggedIn) {
        setShowPaymentDetails(true); // Mostrar el resumen de productos al hacer clic en el botón
      } else {
        alert("Por favor, inicia sesión para proceder con el pago.");
      }
    };

    const handleMultipleActions = () => {
        handlePayment(); // Llama a la función que maneja el pago
        // Puedes agregar otras funciones aquí
        handleSubmit()
    };

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Productos</p>
            <p>Nombre</p>
            <p>Precio</p>
            <p>Talla</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Quitar</p>
        </div>
        <hr />
       {allProducts.map((e)=>{
        if(cartItems[e.id_prod].quantity>0){
            return <div>
            <div className="cartitems-format cartitems-format-main">
                <img src={e.img_url[0]} alt="" className='cartitems-product-icon' />
                <p>{e.nombre}</p>
                <p>${e.valor_venta}</p>
                <p>{cartItems[e.id_prod].size}</p>
                <button className='cartitems-quantity'>{cartItems[e.id_prod].quantity}</button>
                <p>${e.valor_venta*cartItems[e.id_prod].quantity}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id_prod)}} alt="" />
            </div>
            <hr />
        </div>
        }
        return null;
       })}
       <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>TOTAL CARRITO</h1>
            <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
                <p>Costo de envio</p>
                <p>Gratis</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${getTotalCartAmount()}</h3>
            </div>
            <button onClick={handleMultipleActions}>PROCEDER AL PAGO</button> {/* Botón depende del login */}
        </div>
        <div>

      {/* Mostrar los detalles de pago si showPaymentDetails es true */}
      {showPaymentDetails && (
        <div>
            <div>
                ID CLIENTE: <p>{idClie}</p>
            </div>
            {allProducts.map((e) => {
            const cartItem = cartItems[e.id_prod];
            if (cartItem && cartItem.quantity > 0) {
                return (
                <div key={e.id_prod}>
                    <p>{e.nombre}</p>
                    <p>${e.valor_venta}</p>
                    <p>Tamaño: {cartItem.size}</p>
                    <p>Cantidad: {cartItem.quantity}</p>
                    <p>Total: ${e.valor_venta * cartItem.quantity}</p>
                    <hr />
                </div>
                );
            }
            return null;
            })}
            {}
        </div>
      )}
    </div>
       </div>
       
    </div>
  )
}
