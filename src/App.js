import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './assets/forms/registro';
import Productos from './assets/views/productos';
import Login from './assets/forms/login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registro" element={ <Registro/> } />
        <Route path="/" element={ <Productos/> } />
        <Route path="/login" element={ <Login/> } />
      </Routes>
    </Router>
  );
}

export default App;
