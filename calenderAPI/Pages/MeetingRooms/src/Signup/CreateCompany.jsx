/* eslint-disable react/prop-types */
import TextField from "@mui/material/TextField";
import colors from "../scss/SCSSVariables";

function CreateCompany({ state, setState }) {
  return (
    <form>
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
        id="standard-basic Name"
        label="Name"
        variant="standard"
        type="text"
        onChange={(e) => setState({ ...state, Name: e.target.value })}
        value={state.Name}
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
      {/* <div id="logo"> */}
      <label id="customLabel" htmlFor="chooseLogo">
        Logo
      </label>
      {/* </div> */}
      <input
        id="chooseLogo"
        className="input"
        type="file"
        onChange={(ev) => setState({ ...state, logo: ev.target.files })}
        accept="image/x-png,image/gif,image/jpeg"
      />

      <br />
    </form>
  );
}
export default CreateCompany;
