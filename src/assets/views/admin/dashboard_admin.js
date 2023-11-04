import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import UsersAdmin from "./pages/Usuarios/UsersAdmin";
import UserAd from "./pages/usadmn/UserAd";
import Products from './pages/products/Products';
import Ingresos from './pages/ingresos/Ingresos';
import Pedidos from './pages/pedidos/Pedidos';
import ProfileAdmin from './pages/adm/ProfileAdmin';

function DashboardAdmin({darkMode, setDarkMode}) {
    return (
      <>
          <Routes>
            <Route path="/home"  element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/users"  element={<UsersAdmin darkMode={darkMode} setDarkMode={setDarkMode}/>} />
            <Route path="/usersad"  element={<UserAd darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/productos"  element={<Products darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/ingresos"  element={<Ingresos darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/pedidos"  element={<Pedidos darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/perfil"  element={<ProfileAdmin darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </Routes>
      </>
    );
  }
  
  export default DashboardAdmin;