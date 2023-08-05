import Signup from "./Signup/SignupPage";
import Login from "./Login/LoginPage";
import Home from "./Home/HomePage";
import MessageButtons from "./Signup/test";
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
 
              <Route path="/Home" element={<Home />}>
                  <Route index element={<h2>Welcome to Home!</h2>} />
                  <Route path="/Home/Rooms" element={<ManageRooms />} />
                  <Route path="/Home/Reservation" element={<ManageReservation />} />
                  <Route path="/Home/Employees" element={<ManageEmployees />} />
                  <Route path="/Home/Calender" element={<Calender />} />
              </Route>
          </Routes>
    </SnackbarProvider>
  );
}

export default App;
