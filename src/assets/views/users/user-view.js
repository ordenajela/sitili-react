import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeUser from './pages/user-product';
import ProfileUser from './pages/user-profile';
import ShopingCar from './pages/user-shopping-car';
import Favorites from './pages/user-favorites';
import ProductDetail from './pages/user-product-detail';

function user_home({darkMode, setDarkMode, userData}) {
  return (
    <Routes>
      <>
        <Route path='home' element={<HomeUser darkMode={darkMode} setDarkMode={setDarkMode} userData={userData} /> } />
        <Route path='perfil' element={<ProfileUser darkMode={darkMode} setDarkMode={setDarkMode} userData={userData}/>} />
        <Route path='carrito' element={<ShopingCar darkMode={darkMode} setDarkMode={setDarkMode} userData={userData}/>} />
        <Route path='favoritos' element={<Favorites darkMode={darkMode} setDarkMode={setDarkMode} userData={userData}/>} />
        <Route path='producto' element={<ProductDetail darkMode={darkMode} setDarkMode={setDarkMode} userData={userData}/>} />
      </>
    </Routes>

  )
}

export default user_home;