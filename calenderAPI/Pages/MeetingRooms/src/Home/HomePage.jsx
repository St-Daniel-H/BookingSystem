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
  //function handleSnackBarSuccess() {
  //    enqueueSnackbar("Signup Successful", {
  //        anchorOrigin: {
  //            vertical: "bottom",
  //            horizontal: "right",
  //        },
  //        variant: "success",
  //    });
  //}
  const [dataLoad, setDataLoad] = useState(false);
  const [companyLoad, setCompanyLoad] = useState(false);
  const navigateTo = useNavigate();
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
  const jwtToken = localStorage.getItem("token");
  useEffect(() => {
    Valid();
    if (!dataLoad) getUserById();
    if (dataLoad) getCompanyById();
    //console.log(user)
  }, [dataLoad]);

  let decodedPayload;
  function Valid() {
    try {
      decodedPayload = jwt_decode(jwtToken);
      //console.log("Decoded JWT Payload:", decodedPayload);
    } catch (error) {
      navigateTo("/Signup");
    }
  }
  async function getUserById() {
    try {
      const userId = decodedPayload.sub;

      const apiUrl = `${APIs.apiLink}/api/auth/users/${userId}`;
      const res = await fetch(apiUrl).then((response) => {
        if (!response.ok) {
          handleSnackBar("Network response was not ok");
          throw new Error("Network response was not ok");
        }
        response.json().then((user) => {
          setUser(user);
          setDataLoad(true);
        });
      });
    } catch (error) {
      console.log(error.message);
      handleSnackBar(error.message);
    }
  }
  async function getCompanyById() {
    try {
      const companyId = user.companyId;

      const apiUrl = `${APIs.apiLink}/api/Company/${companyId}`;
      const res = await fetch(apiUrl).then((response) => {
        if (!response.ok) {
          handleSnackBar("Network response was not ok");
          throw new Error("Network response was not ok");
        }
        response.json().then((company) => {
          setCompany(company);
          setCompanyLoad(true);
          // console.log(user);
        });
      });
    } catch (error) {
        console.log(error.message);
        handleSnackBar(error.message);
      navigateTo("/Login")
    }
  }

  return (
    <div>
      {dataLoad && companyLoad ? <SideBar user={user} company={company} /> : ""}
    </div>
  );
}
export default Home;
