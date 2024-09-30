import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import SortDropdown from './SortDropdown'; // Asegúrate de la ruta correcta
import { ShopContext } from '../Context/ShopContext';
import { Item } from '../Components/Item/Item';


export const ShopCategory = (props) => {
  const { getTotalCartItems, getTotalCartAmount, allProducts, cartItems, addToCart, removeFromCart, isLoggedIn, login, logout, idClie, allAccesorios, allRopa } = useContext(ShopContext); // Cambiamos a allProducts
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Mostrando 1-12</span> de {allAccesorios.length} productos {/* Muestra el total de productos */}
        </p>
        <div className="shopcategory-sort">
          Ordenar por <SortDropdown />
        </div>
      </div>
      <div className="shopcategory-products">
        {allAccesorios.map((item, i) => {
            if (props.category === "accesorio") {
                      return (
                        <Item 
                          key={i} 
                          id={item.id_prod}
                          name={item.nombre}
                          image={item.img_url[0]}
                          new_price={item.valor_venta}
                        />
                      );
                    }
        })}
        {allRopa.map((item, i) => {
            if (props.category!= "accesorio") {
                      return (
                        <Item 
                          key={i} 
                          id={item.id_prod}
                          name={item.nombre}
                          image={item.img_url[0]}
                          new_price={item.valor_venta}
                        />
                      );
                    }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explorar más
      </div>
    </div>
  );
};
