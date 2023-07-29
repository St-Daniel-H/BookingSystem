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
                onChange={(ev) => setState({ ...state, logo: ev.target.files })}

                accept="image/x-png,image/gif,image/jpeg"
            /><br />
        </form>
    )
}
export default CreateCompany;