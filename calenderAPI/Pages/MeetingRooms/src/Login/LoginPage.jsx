import APIs from "../Backend/backend";
import { useNavigate } from "react-router-dom";
import { useState,  } from "react";
import { useSnackbar } from "notistack";
import colors from "../scss/SCSSVariables";
import "./LoginPage.scss";
import TextField from "@mui/material/TextField";
function Login() {
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
  //  enqueueSnackbar("Signup Successful", {
  //    anchorOrigin: {
  //      vertical: "bottom",
  //      horizontal: "right",
  //    },
  //    variant: "success",
  //  });
  //}
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  async function login(event) {
    event.preventDefault();

    try {
      if (email == "" || password == "") {
        throw new Error("fill all the information");
      }

      const response = await fetch(APIs.apiLink + "/api/Auth/SignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.text();
        console.log(data);
        alert(data);
        localStorage.setItem("token", data);
        navigateTo("/");
      } else {
        const errorResponse = await response;
        console.log("Login failed:", errorResponse);
      }
    } catch (error) {
      console.log(error.message);
      handleSnackBar(error.message);
    }
  }
  return (
    <div id="LoginPage">
      <section id="welcome">
        <h1>
          Login to <b>MeetingRooms</b>
        </h1>
      </section>
      <div id="container">
        {" "}
        <form onSubmit={login}>
          <h2>Welcome back</h2>
          <br />
          <TextField
            className="input"
            sx={{
              input: { color: colors.accentColor },
              "& .MuiInput-underline:before": {
                borderBottomColor: colors.accentColor,
              },
              "& .MuiFormLabel-root": {
                color: colors.accentColor,
              },
              "& .MuiInputLabel-root:focused": {
                color: colors.primaryColor,
              },
            }}
            label="Email"
            id="standard-basic email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            variant="standard"
          ></TextField>
          <br />
          <br />
          <TextField
            className="input"
            sx={{
              input: { color: colors.accentColor },
              "& .MuiInput-underline:before": {
                borderBottomColor: colors.accentColor,
              },
              "& .MuiFormLabel-root": {
                color: colors.accentColor,
              },
              "& .MuiInputLabel-root:focused": {
                color: colors.primaryColor,
              },
            }}
            label="Password"
            id="standard-basic password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            variant="standard"
          ></TextField>
          <br />
          <input type="submit"></input>
        </form>
      </div>
      <section id="login">
        {" "}
        <h2>
          Don't have an account? <a href="./signup">click here</a>
        </h2>
      </section>
    </div>
  );
}

export default Login;
