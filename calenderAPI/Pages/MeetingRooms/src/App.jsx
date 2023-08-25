import Signup from "./Signup/SignupPage";
import Login from "./Login/LoginPage";
import Home from "./Home/HomePage";
import MessageButtons from "./Signup/test";
import { Route, Routes, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import ManageRooms from "./Home/ManageRooms/ManageRooms";
import ManageReservation from "./Home/ManageReservation/ManageReservation";
import ManageEmployees from "./Home/ManageEmployees/ManageEmployees";
import CalendarView from "./Home/Calender/Calender";
import Profile from "./Home/Profile/Profile";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
function App() {

    return (
    <SnackbarProvider maxSnack={3}>
            <Routes>
                <Route path='/' element={<Navigate to="/Home/Rooms" />} />

        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/test" element={<MessageButtons />} />
        {/* <Home /> */}
              <Route path="/Calender" element={<CalendarView />} />
                <Route path="*" element={<h1>Error 404 </h1>} />
              <Route path="/Home" element={<Home />}>
                  <Route index element={<h2>Welcome to Home!</h2>} />
                  <Route path="/Home/Calender" element={<CalendarView />} />
                  <Route path="/Home/Rooms" element={<ManageRooms />} />
                  <Route path="/Home/Reservation" element={<ManageReservation />} />
                    <Route path="/Home/Employees" element={<ManageEmployees />} />
                    <Route path="/Home/Profile" element={<Profile />} />

              </Route>
          </Routes>
            </SnackbarProvider>

  );
}

export default App;
