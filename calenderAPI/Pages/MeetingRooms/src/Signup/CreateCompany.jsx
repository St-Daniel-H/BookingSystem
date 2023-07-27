import { useState } from 'react';
function CreateCompany() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");


    return (
        <form >
            <label htmlFor="firstName">Company Name</label><br />
            <input id="firstName" type="text" onChange={(e) => setFirstName(e.target.value)}
                value={firstName}></input><br />
            <label htmlFor="email">Email</label><br />
            <input id="email" type="text" onChange={(e) => setEmail(e.target.value)}
                value={email}></input><br />
            <label htmlFor="password">Password</label><br />
            <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}
                value={password}></input><br />
        </form>
    )
}
export default CreateCompany;