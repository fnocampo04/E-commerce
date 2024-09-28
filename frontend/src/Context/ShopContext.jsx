import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
    let cart = {};
    for (let index = 0; index < products.length; index++) {
        cart[products[index].id_prod] = 0; // Asegúrate de usar el ID correcto
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const savedLoginStatus = localStorage.getItem('isLoggedIn');
        return savedLoginStatus === 'true';  
    });

    const [idClie, setIdClie] = useState(() => {
        const savedIdClie = localStorage.getItem('id_clie');
        return savedIdClie ? savedIdClie : ''; 
    });
    

    const [cartItems, setCartItems] = useState({});
    const [allProducts, setAllProducts] = useState([]);

    // Para iniciar sesion
    const login = (id_clie) => {
        setIsLoggedIn(true);
        setIdClie(id_clie);  
        localStorage.setItem('isLoggedIn', 'true');  
        localStorage.setItem('id_clie', id_clie);  
    };

    // Para cerrar sesión y limpiar localStorage
    const logout = () => {
        setIsLoggedIn(false);
        setIdClie('');
        localStorage.setItem('isLoggedIn', 'false');  // Limpiar estado de login en localStorage
        localStorage.removeItem('id_clie');  // Remover id_clie de localStorage
    };

    
    // Cargar productos desde la API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/products');
                setAllProducts(response.data);
                setCartItems(getDefaultCart(response.data)); 
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProducts.find((product) => product.id_prod === Number(item));
                totalAmount += itemInfo.valor_venta * cartItems[item]; 
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, allProducts, cartItems, addToCart, removeFromCart, isLoggedIn, login, logout, idClie};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
