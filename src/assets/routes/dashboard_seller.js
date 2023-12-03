import { Routes, Route, Navigate } from 'react-router-dom';
import HomeSeller from '../views/sellers/pages/home/HomeSeller';
import CategorySeller from '../views/sellers/pages/category/CategorySeller';
import ProductsSeller from '../views/sellers/pages/products/ProductosSeller';
import IngresosSeller from '../views/sellers/pages/ingresos/IngresosSeller';
import PedidosSeller from '../views/sellers/pages/pedidos/PedidosSeller';
import ProfileSeller from '../views/sellers/pages/seller/ProfileSeller';

function dashboard_seller ({ darkMode, setDarkMode })  {
  
  const rol = localStorage.getItem("rol");
  const isSeller = () => {
    return rol === "Seller";
  }

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  }
  
  return (
   
      <Routes>
        {isSeller() && isAuthenticated() && (
          <>
          <Route path='home' element={<HomeSeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path='productos' element={<ProductsSeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path='pedidos' element={<PedidosSeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path='perfil' element={<ProfileSeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </>
        )}
        {isAuthenticated() && !isSeller()  && (
          <Route path="/*" element={<Navigate to="/error/403" />} />
        )}
        {!isAuthenticated() && (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}     
        </Routes>
  )
}

export default dashboard_seller;
