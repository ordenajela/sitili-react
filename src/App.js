import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './assets/forms/registro';
import Productos from './assets/views/productos';
import Login from './assets/forms/login';
import DashboardAdmin from './assets/views/admin/dashboard_admin';
import React, { useState } from 'react';


function App() {
  const [darkMode, setDarkMode] = useState(false);


  return (
    <Router>
      <Routes>
        <Route path="/registro" element={ <Registro/> } />
        <Route path="/" element={ <Productos/> } />
        <Route path="/dashboard/*" element={ <DashboardAdmin darkMode={darkMode} setDarkMode={setDarkMode} /> } />
        <Route path="/login" element={ <Login/> } />
        
        
      </Routes>
    </Router>
  );
}

export default App;
