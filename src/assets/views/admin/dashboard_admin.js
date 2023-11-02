import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import UsersAdmin from "./pages/UsersAdmin";
import Settings from "./pages/Settings";
import UserAd from "./pages/UserAd";



function DashboardAdmin({darkMode, setDarkMode}) {
    return (
      <>
        
          <Routes>
            <Route path="/home"  element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/users"  element={<UsersAdmin darkMode={darkMode} setDarkMode={setDarkMode}/>} />
            <Route path="/usersad"  element={<UserAd darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/settings"  element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </Routes>
        
      </>
    );
  }
  
  export default DashboardAdmin;