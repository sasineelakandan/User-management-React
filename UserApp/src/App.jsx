import React, { useState, useEffect } from 'react';
import SignUpPage from './Compenets/SignUp';
import LoginForm from './Compenets/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Compenets/Home';
import UserProfile from './Compenets/Profile';
import { useSelector } from 'react-redux';
import AdminHome from './Compenets/AdminHome';
import Users from './Compenets/Users'

const App = () => {

  const user = useSelector((state) => state.user);
  console.log(user)

  
 
  return (
    
    <Router>
      <Routes>
        <Route path='/signup' element={ <SignUpPage/>}/>
        <Route path='/profile' element={ <UserProfile /> } />
        <Route path='/' element={user ?  <Navigate to={"/profile"} /> : <LoginForm/>}/> 
        <Route path='/editProfile'  element={<Home/>}/> 
        <Route path='/adminHome'  element={<AdminHome/>}/> 
        <Route path='/users'  element={<Users/>}/> 
      </Routes>
    </Router>
);
};

export default App;
