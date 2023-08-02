import Signup from "./Signup/SignupPage";
import Login from "./Login/LoginPage";
import Home from "./Home/HomePage";
import MessageButtons from "./Home/test";
import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import ManageRooms from "./Home/ManageRooms/ManageRooms";
import ManageReservation from "./Home/ManageReservation/ManageReservation";
import ManageEmployees from "./Home/ManageEmployees/ManageEmployees";
import Calender from "./Home/Calender/Calender";
function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<MessageButtons />} />

        <Route path="/Calender" Component={<Calender />} />
        <Route path="/ManageReservation" Component={<ManageReservation />} />
        <Route path="/ManageeEmployees" Component={<ManageEmployees />} />
        <Route path="/ManageRooms" Component={<ManageRooms />} />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
