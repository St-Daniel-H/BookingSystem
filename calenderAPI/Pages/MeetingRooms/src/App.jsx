import Signup from "./Signup/SignupPage";
import Login from "./Login/LoginPage";
import Home from "./Home/HomePage";
import MessageButtons from "./Home/test";
import {  Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

function App() {

  return (
      <SnackbarProvider maxSnack={3}>
          <Routes>
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Login' element={<Login />} />
              <Route path='/' element={<Home />} />
              <Route path='/test' element={<MessageButtons />} />
          </Routes>
      </SnackbarProvider>
  )
}

export default App
