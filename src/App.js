import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './assets/forms/registro';
import Productos from './assets/views/productos';
import Login from './assets/forms/login';
import DashboardAdmin from './assets/routes/dashboard_admin'; // Asumiendo que este es para el administrador
import DashboardSeller from './assets/views/sellers/dashboard_seller'; // Asumiendo que este es para el vendedor
import React, { useState } from 'react';
import RoutesError from './assets/routes/RoutesError';
import UserActions from './assets/views/users/user-view';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Productos darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/productos" element={<Productos darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/dashboard/*" element={<DashboardAdmin darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/seller/*" element={<DashboardSeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/login" element={<Login />} />
        <Route path='/error/*' element={<RoutesError/>} />
        <Route path="/user/*" element={<UserActions darkMode={darkMode} setDarkMode={setDarkMode}/>} />
      </Routes>
    </Router>
  );
}

export default App;
