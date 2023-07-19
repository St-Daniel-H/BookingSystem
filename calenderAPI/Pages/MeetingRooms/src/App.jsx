import Signup from "./Signup/SignupPage";
import Login from "./Login/LoginPage";
import Home from "./Home/HomePage"
import {  Route, Routes } from 'react-router-dom';

function App() {

  return (
    
          <Routes>
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/' element={<Home />} />
          </Routes>
  )
}

export default App
