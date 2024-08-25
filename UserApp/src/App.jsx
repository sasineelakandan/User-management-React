import React, { useState, useEffect } from 'react';
import SignUpPage from './Compenets/SignUp';
import LoginForm from './Compenets/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Compenets/Home';
import UserProfile from './Compenets/Profile';
import { useSelector } from 'react-redux';


const App = () => {
  
   
  
  const user = useSelector((state) => state.user); 
  console.log(user)
 
  
  return (
    <div>
     <Router>
      <Routes>
      <Route path='/sigin' element={ <SignUpPage/>}/>
      <Route path='/login' element={ <LoginForm/>} />
      <Route path='/'  element={<UserProfile />}/> 
      <Route path='/editProfile'  element={<Home/>}/> 
      </Routes>
      </Router>
</div>
  );
}

export default App;
