/* eslint-disable react/prop-types */
import TextField from "@mui/material/TextField";
import colors from "../scss/SCSSVariables";

function CreateAccountSignup({ state, setState }) {
  return (
    <form>
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
        id="standard-basic firstName"
        label="First Name"
        variant="standard"
        type="text"
        onChange={(e) => setState({ ...state, firstName: e.target.value })}
        value={state.firstName}
      />
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
        id="standard-basic lastName"
        label="Last Name"
        variant="standard"
        type="text"
        onChange={(e) => setState({ ...state, lastName: e.target.value })}
        value={state.lastName}
      />
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
        id="standard-basic email"
        label="Email"
        variant="standard"
        type="text"
        onChange={(e) => setState({ ...state, email: e.target.value })}
        value={state.email}
      />
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
        id="standard-basic password"
        label="Password"
        variant="standard"
        type="password"
        onChange={(e) => setState({ ...state, password: e.target.value })}
        value={state.password}
      />
      <br />
    </form>
  );
}

export default CreateAccountSignup;
