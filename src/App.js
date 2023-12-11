import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './assets/forms/registro';
import Productos from './assets/views/productos';
import Login from './assets/forms/login';
import DashboardAdmin from './assets/routes/dashboard_admin'; 
import DashboardSeller from './assets/routes/dashboard_seller'; 
import React, { useState } from 'react';
import RoutesError from './assets/routes/RoutesError';
import UserActions from './assets/views/users/user-view';
import Forget from './assets/forms/forget';

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
        <Route path="/forgetPasswordSitili" element={<Forget />} />
        <Route path='/error/*' element={<RoutesError/>} />
        <Route path="/user/*" element={<UserActions darkMode={darkMode} setDarkMode={setDarkMode}/>} />
      </Routes>
    </Router>
  );
}

export default App;
