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
        <Route path="/test" element={<MessageButtons />} />
        {/* <Home /> */}
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/Calender" element={<Calender />} />
        <Route path="/Reservation" element={<ManageReservation />} />
        <Route path="/Employees" element={<ManageEmployees />} />
        <Route path="/Rooms" element={<ManageRooms />} /> */}
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
