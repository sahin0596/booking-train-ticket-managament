import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'

import HomePage from '../Pages/Homepage'
// import Search from '../Components/Search/Search'
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Trains from '../Pages/Trains'
import Booking from '../Pages/Booking';
import Payment from '../Pages/Payment'

const AppRoutes = () => {
  return (
    <div className='display'>
    <Routes>
        <Route path = '/' element={<Navigate to = '/home'/>}/>
        {/* <Route path="/home" element={
        <div>
          <Home />
          <Search/>
        </div>} /> */}
        <Route path = '/home' element ={<HomePage/>}/>
        <Route path = '/trains' element ={<Trains/>}/>
        <Route path = '/login' element ={<Login/>}/>
        <Route path = '/register' element ={<Register/>}/>
        <Route path = '/booking/:trainName' element ={<Booking/>}/>
        <Route path = '/payment/:bookingId/:seats' element ={<Payment/>}/>
    </Routes>
    </div>
  )
}

export default AppRoutes