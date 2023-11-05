import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeSeller from './pages/home/HomeSeller';
import CategorySeller from './pages/category/CategorySeller';
import ProductsSeller from './pages/products/ProductosSeller';
import IngresosSeller from './pages/ingresos/IngresosSeller';
import PedidosSeller from './pages/pedidos/PedidosSeller';
import ProfileSeller from './pages/seller/ProfileSeller';

const dashboard_seller = ({ darkMode, setDarkMode }) => {
  return (
    <>
      <Routes>
        <Route path='home' element={<HomeSeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path='category' element={<CategorySeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path='productos' element={<ProductsSeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path='ingresos' element={<IngresosSeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path='pedidos' element={<PedidosSeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path='perfil' element={<ProfileSeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    </>
  )
}

export default dashboard_seller;
