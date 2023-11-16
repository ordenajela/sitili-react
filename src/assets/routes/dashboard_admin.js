import { BrowserRouter as  Routes, Route, Navigate } from 'react-router-dom';
import Home from "../views/admin/pages/Home/Home";
import UsersAdmin from "../views/admin/pages/Usuarios/UsersAdmin";
import UserAd from "../views/admin/pages/usadmn/UserAd";
import Products from '../views/admin/pages/products/Products';
import Ingresos from '../views/admin/pages/ingresos/Ingresos';
import Pedidos from '../views/admin/pages/pedidos/Pedidos';
import ProfileAdmin from '../views/admin/pages/adm/ProfileAdmin';

function DashboardAdmin({darkMode, setDarkMode, userData}) {

  const datosAdm = localStorage.getItem("credencial");
  console.log("Datos de Admin:", datosAdm);
  const rol = localStorage.getItem("rol");
  console.log("Rol de Admin:", rol);

  const isAdmin = () => {
    return rol === "Admin";
  };

  // Función que verifica si hay un token de autenticación
  const isAuthenticated = () => {
    return !!localStorage.getItem("tokenAdmin");
  };

    return (
      <Routes>

      {isAdmin() && isAuthenticated() && (
        <>
          <Route path="/home" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
          <Route path="/users" element={<UsersAdmin darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
          <Route path="/usersad" element={<UserAd darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
          <Route path="/productos" element={<Products darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
          <Route path="/ingresos" element={<Ingresos darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
          <Route path="/pedidos" element={<Pedidos darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
          <Route path="/perfil" element={<ProfileAdmin darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} />} />
        </>
      )}

      {/* Ruta para usuarios autenticados que no son administradores */}
      {isAuthenticated() && !isAdmin() && (
        <Route path="/*" element={<Navigate to="/error/403" />} />
      )}

      {/* Ruta para usuarios no autenticados */}
      {!isAuthenticated() && (
        <Route path="/*" element={<Navigate to="/login" />} />
      )}
    </Routes>
    );
  }
  
  export default DashboardAdmin;