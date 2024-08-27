import React, { useState, useEffect } from 'react';
import SignUpPage from './Compenets/SignUp';
import LoginForm from './Compenets/Login';
import { BrowserRouter as Router, Route, Routes, Navigate, useSearchParams } from 'react-router-dom';
import Home from './Compenets/Home';
import UserProfile from './Compenets/Profile';
import { useSelector } from 'react-redux';
import AdminHome from './Compenets/AdminHome';
import Users from './Compenets/Users'
import ALoginForm from './Compenets/Adminlogin';
import EditPage from './Compenets/EditPage';

const App = () => {


  const user = useSelector((state) => state.user.user);
  const isAdmin= useSelector((state) => state.user.isAdmin);
 console.log('U',user)
 console.log('A',isAdmin);
  
  
  
 
  return (
    
    <Router>
      <Routes>
        <Route path='/signup' element={ <SignUpPage/>}/>
        <Route path='/profile' element={user? <UserProfile />:<Navigate to ={'/'}/> } />
        <Route path='/' element={user?  <Navigate to={"/profile"} /> : <LoginForm/>}/> 
        <Route path='/editProfile'  element={<Home/>}/> 
        <Route path='/adminLogin'  element={isAdmin? <Navigate to ={'/adminHome'} />:<ALoginForm/>}/> 
        <Route path='/adminHome'  element={isAdmin?<AdminHome/>:<Navigate to = {'/adminLogin'}/>}/> 
        <Route path='/users'  element={<Users/>}/> 
        <Route path='/edit' element={<EditPage/>}/>
      </Routes>
    </Router>
);
};

export default App;
