
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { LoginSignup } from './Pages/LoginSignup';
import { Cart } from './Pages/Cart';
import { Admin } from './Pages/Admin';
import { AdminProducto } from './Pages/AdminProducto';
import AdminDescuento from './Pages/AdminDescuento';
import AdminProveedor from './Pages/AdminProveedor';
import { Footer } from './Components/Footer/Footer';
import clothing_banner from './Components/Assets/banner_women.png'
import { LoginLogin } from './Pages/LoginLogin';
import { ClientMenu } from './Pages/ClientMenu';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin/producto' element={<AdminProducto/>}/>
        <Route path='/admin/descuento' element={<AdminDescuento/>}/>
        <Route path='/admin/proveedor' element={<AdminProveedor/>}/>

      </Routes>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/accesorios' element={<ShopCategory banner={clothing_banner} category="accesorio"/>}/>
        <Route path='/ropa' element={<ShopCategory banner={clothing_banner} category="ropa"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/loginsup' element={<LoginSignup/>}/>
        <Route path='/loginlog' element={<LoginLogin/>}/>
        <Route path='/clientmenu' element={<ClientMenu/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
