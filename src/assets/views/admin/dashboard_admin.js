
import { SidenavAdmin } from "../../components/admin/SidenavAdmin";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";


function DashboardAdmin() {
    return (
      <>
        
          <Routes>
            <Route path="/home"  element={<Home/>} />
            <Route path="/about"  element={<About/>} />
            <Route path="/settings"  element={<Settings/>} />
          </Routes>
        
      </>
    );
  }
  
  export default DashboardAdmin;