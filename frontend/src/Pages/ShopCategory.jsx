import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import SortDropdown from './SortDropdown'; // Asegúrate de la ruta correcta
import { ShopContext } from '../Context/ShopContext';
import { Item } from '../Components/Item/Item';


export const ShopCategory = (props) => {
  const [selectedSort, setSelectedSort] = useState('Por defecto');
  
  const handleSortOptionSelected = (option) => {
      setSelectedSort(option);
    };
  const { getTotalCartItems, getTotalCartAmount, allProducts, cartItems, addToCart, removeFromCart, isLoggedIn, login, logout, idClie, allAccesorios, allRopa } = useContext(ShopContext); // Cambiamos a allProducts
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
      <p>
        {props.category === "accesorio"? (
          <span>Mostrando 1-12 de {allAccesorios.length} productos</span>
        ) : (
          <span>Mostrando 1-12 de {allRopa.length} productos</span>
        )}
      </p>
        <div className="shopcategory-sort">
          Ordenar por <SortDropdown onOptionSelected={handleSortOptionSelected} />
          <p>Opción  {selectedSort}</p>
        </div>
      </div>
      <div className="shopcategory-products">
        {allAccesorios.map((item, i) => {
            if (props.category === "accesorio") {
              if(item.valor_venta!=item.valor_base){
                      return (
                        <Item 
                          key={i} 
                          id={item.id_prod}
                          name={item.nombre}
                          image={item.img_url[0]}
                          new_price={item.valor_venta}
                          old_price={item.valor_base}
                        />
                      );
                } else {                      
                  return (
                  <Item 
                    key={i} 
                    id={item.id_prod}
                    name={item.nombre}
                    image={item.img_url[0]}
                    new_price={item.valor_venta}
                  />
                );}
                    }
        })}
        {allRopa.map((item, i) => {
            if (props.category!= "accesorio") {
              if(item.valor_venta!=item.valor_base){
                return (
                  <Item 
                    key={i} 
                    id={item.id_prod}
                    name={item.nombre}
                    image={item.img_url[0]}
                    new_price={item.valor_venta}
                    old_price={item.valor_base}
                  />
                );
                } else {                      
                  return (
                  <Item 
                    key={i} 
                    id={item.id_prod}
                    name={item.nombre}
                    image={item.img_url[0]}
                    new_price={item.valor_venta}
                  />
                );}
                    }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explorar más
      </div>
    </div>
  );
};
