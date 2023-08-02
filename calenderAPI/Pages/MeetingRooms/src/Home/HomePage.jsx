import jwt_decode from "jwt-decode";
import SideBar from "./SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ManageRooms from "./ManageRooms/ManageRooms";
import ManageReservation from "./ManageReservation/ManageReservation";
import ManageEmployees from "./ManageEmployees/ManageEmployees";
import Calender from "./Calender/Calender";
import APIs from "../Backend/backend";
import { useSnackbar } from "notistack";

function Home() {
    const { enqueueSnackbar } = useSnackbar();
    function handleSnackBar(error) {
        enqueueSnackbar(error, {
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
            },
            variant: "error",
        });
    }
  //  const [dataLoad, setDataLoad] = useState(false);
  const navigateTo = useNavigate();
    const [user, setUser] = useState({});
  const jwtToken = localStorage.getItem("token");
  useEffect(() => {
      Valid();
      getUserById();
      console.log(user)
  }, []);

    let decodedPayload;
  function Valid() {
    try {
       decodedPayload = jwt_decode(jwtToken);
      console.log("Decoded JWT Payload:", decodedPayload);
    } catch (error) {
      navigateTo("/Signup");
    }
    }
    async function getUserById() {
        const userId = decodedPayload.sub; 

        const apiUrl = `${APIs.apiLink}/api/auth/users/${userId}`;
        const res = await fetch(apiUrl).then(response => {
            if (!response.ok) {
                handleSnackBar("Network response was not ok");
                throw new Error("Network response was not ok");       
            }
            response.json().then((user)=> {
                setUser(user)
                console.log(user)
              
            })
        });
       // console.log(user);
        //setUser({
        //    id: res.id,
        //    email:res.email,
        //    firstName: res.firstName,
        //    lastName: res.lastName,
        //    Role: res.Role,
        //    companyId: res.companyId
        //});
        //console.log(user)
    }
  // let href = windows.location.href;
  return (
      <div>
            <SideBar user={user} />
    </div>
  );
}
export default Home;
