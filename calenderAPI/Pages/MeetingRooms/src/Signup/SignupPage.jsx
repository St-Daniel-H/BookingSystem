import APIs from "../Backend/backend";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigateTo = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
        //    public string FirstName { get; set; }
        //public string LastName { get; set; }
        //public string Email { get; set; }
        //public string Password { get; set; }
    async function signUp(event) {
        event.preventDefault();
        if (password == "" || email == "" || firstName == "" || lastName == "") {
            setErrorMessage("Please fill all the information");
            return;
        }
        const response = await fetch(APIs.apiLink + "/api/Auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            }),
        });
        if (response.ok) {
            const data = await response;
            console.log(data);
            alert("Signup successful");
            navigateTo("/");
        } else {
            const errorResponse = await response.json();
            console.log("Signup failed:", errorResponse.detail);
            setErrorMessage(errorResponse.detail);
            // Handle the error response here, e.g., show an error message to the user
        }
 
    }
    return (
        <div id="SignupPage">
            <h1>Signup</h1>
            <form onSubmit={signUp} >
                <label htmlFor="firstName">First Name</label><br/>
                <input id="firstName" type="text" onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}></input><br/>
                <label htmlFor="lastName">Last Name</label><br/>
                <input id="lastName" type="text" onChange={(e) => setLastName(e.target.value)}
                    value={lastName}></input><br/>
                <label htmlFor="email">Email</label><br/>
                <input id="email" type="text" onChange={(e) => setEmail(e.target.value)}
                    value={email}></input><br/>
                <label htmlFor="password">Password</label><br/>
                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}
                    value={password}></input><br/>
                <input type="submit"></input>
            </form>
            <p>{errorMessage}</p>
        </div>
    )
        
}

export default Signup;