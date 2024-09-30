import React, { useState, useEffect, useContext, useRef } from 'react';
import './Navbar.css'; 
import logo from '../Assets/AvellanaLogoNegro-02.svg';
import logo2 from '../Assets/AvellanaLogoNegroVertical.svg';
import { Link, useLocation } from 'react-router-dom';
import 'boxicons'
import { ShopContext } from '../../Context/ShopContext';


export const Navbar = () => {
    const [scrollPastPoint, setScrollPastPoint] = useState(false);
    const location = useLocation();
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    useEffect(() => {
        const handleScroll = () => {
            if (location.pathname === '/' && window.scrollY > 150) {
                setScrollPastPoint(true);
            } else {
                setScrollPastPoint(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location]);

    

    let navbarClass, navMenu, navLogo, colorIcon;

    if (location.pathname === '/') {
    if (!scrollPastPoint) {
        navbarClass = 'navbar navbar-shop';
        navMenu = 'nav-menu-shop';
        navLogo = 'nav-logo-shop';
        colorIcon = 'white';
    } else if (location.pathname === '/'){
        if (scrollPastPoint){
            navbarClass = 'navbar-shop2';
            navMenu = 'nav-menu';
            navLogo = 'nav-logo';
            colorIcon = 'black';
        } 
    } 
    } else if (location.pathname==='/admin' || location.pathname==='/admin/producto'){
        navbarClass='navbar-hide' 
        navMenu = 'navmenu-hide';
        navLogo = 'nav-logo';
        colorIcon = 'black';
    }
    else {
    navbarClass = 'navbar';
    navMenu = 'nav-menu';
    navLogo = 'nav-logo';
    colorIcon = 'black';
    }

    return (
        <div className={navbarClass}>
            <div className={navLogo}>
                <img src={logo} className='imageLOGOFULL'/>
                <img src={logo2} className='imageLOGOCUT'/>
                <box-icon name='chevron-down' size='md' color={colorIcon} onClick={dropdown_toggle} class={'nav-dropdown'} ></box-icon>
            </div>
            
            
            
            
            <ul ref={menuRef} className={navMenu}>
                <li>
                    <Link style={{ textDecoration: 'none', color:'inherit'}} to='/'>Tienda</Link>
                    {location.pathname === '/' &&  <hr />}
                </li>
                <li>
                    <Link style={{ textDecoration: 'none', color:'inherit'}} to='/accesorios'>Accesorios</Link>
                    {location.pathname === '/accesorios' && <hr />}
                </li>
                <li>
                    <Link style={{ textDecoration: 'none', color:'inherit'}} to='/ropa'>Ropa</Link>
                    {location.pathname === '/ropa' && <hr />}
                </li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/loginsup'><box-icon name='user' size='md' color={colorIcon} class={'login-icon'}></box-icon></Link>
                <Link to='/cart'><box-icon name='cart' size='md' color={colorIcon} class={'cart-icon'}></box-icon></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

