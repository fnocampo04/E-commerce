import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'


export const CartItems = () => {
    const {getTotalCartItems, getTotalCartAmount, allProducts, cartItems, addToCart, removeFromCart, isLoggedIn, login,size} = useContext(ShopContext);

    const handlePayment = () => {
        if (isLoggedIn) {
            // Redirigir a la página de pago
            alert("OK");
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
        <div className="cartitems-promcode">
            <p>Si usted tiene un codigo de descuento, ingreselo aquí</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='Codigo de descuento'/>
                <button>Ingresar</button>
            </div>
       </div>
       </div>
       
    </div>
  )
}
