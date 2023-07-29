/* eslint-disable react/prop-types */
function CreateAccountSignup({ state, setState }  ) {
    return (

        <form>
            <label htmlFor="firstName">First Name</label><br />
            <input
                id="firstName"
                type="text"
                onChange={(e) => setState({ ...state, firstName: e.target.value })}
                value={state.firstName}
            /><br />
            <label htmlFor="lastName">Last Name</label><br />
            <input
                id="lastName"
                type="text"
                onChange={(e) => setState({ ...state, lastName: e.target.value })}
                value={state.lastName}
            /><br />
            <label htmlFor="email">Email</label><br />
            <input
                id="email"
                type="text"
                onChange={(e) => setState({ ...state, email: e.target.value })}
                value={state.email}
            /><br />
            <label htmlFor="password">Password</label><br />
            <input
                id="password"
                type="password"
                onChange={(e) => setState({ ...state, password: e.target.value })}
                value={state.password}
            /><br />
        </form>
    );
}

export default CreateAccountSignup;
