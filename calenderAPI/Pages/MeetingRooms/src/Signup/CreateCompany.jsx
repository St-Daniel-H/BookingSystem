/* eslint-disable react/prop-types */
function CreateCompany({ state, setState }) {




    return (
        <form>
            <label htmlFor="Name">Name</label><br />
            <input
                id="Name"
                type="text"
                onChange={(e) => setState({ ...state, Name: e.target.value })}
                value={state.Name}
            /><br />
            <label htmlFor="email">Email</label><br />
            <input
                id="email"
                type="text"
                onChange={(e) => setState({ ...state, email: e.target.value })}
                value={state.email}
            /><br />
            <label htmlFor="logo">Logo</label><br />
            <input
                id="logo"
                type="file"
                onChange={(e) => setState({ ...state, logo: e.target.value })}
                value={state.logo}
            /><br />
        </form>
    )
}
export default CreateCompany;