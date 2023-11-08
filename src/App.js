import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './assets/forms/registro';
import Productos from './assets/views/productos';
import Login from './assets/forms/login';
import DashboardAdmin from './assets/views/admin/dashboard_admin'; // Asumiendo que este es para el administrador
import DashboardSeller from './assets/views/sellers/dashboard_seller'; // Asumiendo que este es para el vendedor
import React, { useState } from 'react';
import Error404 from './assets/views/error/error404';
import Error500 from './assets/views/error/error500';
import Error400 from './assets/views/error/error400';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Productos />} />
        <Route path="/dashboard/*" element={<DashboardAdmin darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/seller/*" element={<DashboardSeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/error/400" element={<Error400 />} />
        <Route path="/error/500" element={<Error500 />} />
      </Routes>
    </Router>
  );
}

export default App;
