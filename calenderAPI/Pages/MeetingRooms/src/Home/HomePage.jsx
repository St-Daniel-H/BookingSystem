import jwt_decode from 'jwt-decode';

function Home() {
    const jwtToken = localStorage.getItem("token");

    try {
        const decodedPayload = jwt_decode(jwtToken);
        console.log("Decoded JWT Payload:", decodedPayload);
    } catch (error) {
        console.error("Error decoding JWT token:", error.message);
    }
    return (
        <div>
        <h1>Welcome Home!</h1>
       </div>
    )
}
export default Home;