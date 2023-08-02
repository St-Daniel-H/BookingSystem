import jwt_decode from "jwt-decode";
import SideBar from "./SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function Home() {
  const navigateTo = useNavigate();

  const jwtToken = localStorage.getItem("token");
  useEffect(() => {
    Valid();
  }, []);
  function Valid() {
    try {
      const decodedPayload = jwt_decode(jwtToken);
      console.log("Decoded JWT Payload:", decodedPayload);
    } catch (error) {
      navigateTo("/Signup");
    }
  }

  return (
    <div>
      <SideBar />
    </div>
  );
}
export default Home;
