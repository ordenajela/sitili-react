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
import Offline from './offline';
import Restore from './assets/forms/restore';

function App() {

  const [online, setOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnlineStatus = () => {
      setOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);


  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      {online ? (
    <Router>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Productos darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/productos" element={<Productos darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/dashboard/*" element={<DashboardAdmin darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/seller/*" element={<DashboardSeller darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPasswordSitili" element={<Forget />} />
        <Route path="/restore" element={<Restore/>} />
        <Route path='/error/*' element={<RoutesError/>} />
        <Route path="/user/*" element={<UserActions darkMode={darkMode} setDarkMode={setDarkMode}/>} />
      </Routes>
    </Router>
    ) : (
      <Offline />
      )}
    </div>
  );
}

export default App;
