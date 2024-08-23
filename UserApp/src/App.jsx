import React from 'react'
import SignUpPage from './Compenets/SignUp'
import LoginForm from './Compenets/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
      <Routes>
      <Route path='/' element={ <SignUpPage/>}/>
      <Route path='/login' element={ <LoginForm/>} />
      
      </Routes>
      </Router>
    </div>
  )
}

export default App