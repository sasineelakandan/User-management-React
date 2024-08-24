import React, { useState,useEffect } from 'react'
import SignUpPage from './Compenets/SignUp'
import LoginForm from './Compenets/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Compenets/Home';
import UserProfile from './Compenets/Profile';
import axios from 'axios';

const App = () => {
 


 

  return (
    <div>
      <Router>
      <Routes>
      <Route path='/' element={ <SignUpPage/>}/>
      <Route path='/login' element={ <LoginForm/>} />
      <Route path='/home'  element={<UserProfile />}/> 
      <Route path='/editProfile'  element={<Home/>}/> 
      </Routes>
      </Router>
   
    </div>
  )
}

export default App