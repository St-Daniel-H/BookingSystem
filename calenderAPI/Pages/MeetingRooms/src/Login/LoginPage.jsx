import APIs from "../Backend/backend";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigateTo = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    //public string Email { get; set; }
    //public string Password { get; set; }
    async function login(event) {
        event.preventDefault();
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
            setErrorMessage("Wrong email or password!");
            // Handle the error response here, e.g., show an error message to the user
        }
        
       
    }
    return (
        <div id="SignupPage">
            <h1>Login</h1>
            <form onSubmit={login} >
                <label htmlFor="email">Email</label><br />
                <input id="email" type="text" onChange={(e) => setEmail(e.target.value)}
                    value={email}></input><br />
                <label htmlFor="password">Password</label><br />
                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}
                    value={password}></input><br />
                <input type="submit"></input>
            </form>
            <p>{errorMessage}</p>
        </div>
    )

}

export default Login;