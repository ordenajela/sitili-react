import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Error404 from '../views/error/pages/error404'
import Error403 from '../views/error/pages/error403'
import Error400 from '../views/error/pages/error400'
import Error500 from '../views/error/pages/error500'
const RoutesError = () => {
  return (
  
        <Routes>
            <Route path='/400' element={<Error400/>} />
            <Route path='/403' element={<Error403/>}  />
            <Route path='/404' element={<Error404/>}  />
            <Route path='/500' element={<Error500/>}  />
        </Routes>
    
  )
}

export default RoutesError