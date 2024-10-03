import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './NewCollections.css'
import new_collection from '../Assets/new_collections'
import { Item } from '../Item/Item'

export const NewCollections = () => {
  const {allProducts} = useContext(ShopContext);
  const top8Products = allProducts
  .filter(product => product.prom_opinion !== undefined)
  .sort((a, b) => b.prom_opinion - a.prom_opinion)
  .slice(0, 8);
  return (
    <div className='new-collections'>
        <h1>FAVORITAS</h1>
        <hr />
        <div className='collections'>
            {top8Products.map((item,i)=>{
                return <Item key={i} id={item.id_prod} name={item.nombre} image={item.img_url[0]} new_price={item.valor_venta}/>
            })}
        </div>
    </div>
  )
}
