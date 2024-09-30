import React, { useContext , useState} from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'


export const CartItems = () => {

    const {getTotalCartItems, getTotalCartAmount, allProducts, cartItems, addToCart, removeFromCart, isLoggedIn, login,idClie} = useContext(ShopContext);
    const [showPaymentDetails, setShowPaymentDetails] = useState(false); // Controla si mostramos los detalles de pago
  
    const handleSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/facturar', {
            idClie,
            subtotal,
            cartItems
          });
    
        if (response.data.message === 'Proveedor insertado exitosamente') {
            alert("Proveedor insertado exitosamente");
          } else {
            alert("Proveedor no insertado.");
          }
        } catch (err) {
          alert("Error al insertar el proveedor, el proveedor ya existe.");
        }
      };

    const handlePayment = () => {
      if (isLoggedIn) {
        setShowPaymentDetails(true); // Mostrar el resumen de productos al hacer clic en el botón
      } else {
        alert("Por favor, inicia sesión para proceder con el pago.");
      }
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
            <button onClick={handlePayment}>PROCEDER AL PAGO</button> {/* Botón depende del login */}
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
        </div>
      )}
    </div>
       </div>
       
    </div>
  )
}
