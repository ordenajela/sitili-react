import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import UsersAdmin from "./pages/Usuarios/UsersAdmin";
import UserAd from "./pages/usadmn/UserAd";
import Products from './pages/products/Products';
import Ingresos from './pages/ingresos/Ingresos';
import Pedidos from './pages/pedidos/Pedidos';
import ProfileAdmin from './pages/adm/ProfileAdmin';
import { useLocation } from 'react-router-dom';

function DashboardAdmin({darkMode, setDarkMode, userData}) {

    return (
      <>
          <Routes>
            <Route path="/home"  element={<Home darkMode={darkMode} setDarkMode={setDarkMode} userData={userData}/>} />
            <Route path="/users"  element={<UsersAdmin darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
            <Route path="/usersad"  element={<UserAd darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
            <Route path="/productos"  element={<Products darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
            <Route path="/ingresos"  element={<Ingresos darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
            <Route path="/pedidos"  element={<Pedidos darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
            <Route path="/perfil"  element={<ProfileAdmin darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
          </Routes>
      </>
    );
  }
  
  export default DashboardAdmin;