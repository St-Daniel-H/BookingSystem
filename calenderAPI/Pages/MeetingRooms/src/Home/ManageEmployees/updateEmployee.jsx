/* eslint-disable react/prop-types */
import CloseIcon from "@mui/icons-material/Close";
import "./updateEmployee.scss";
import { useState } from "react";
import APIs from "../../Backend/backend";
import TextField from "@mui/material/TextField";
import colors from "../../scss/SCSSVariables";
import { useSnackbar } from "notistack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
function UpdateEmployee({ state, setState, userToUpdate }) {
  console.log(userToUpdate);
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
  function handleSnackBarSuccess(success) {
    enqueueSnackbar(success, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      variant: "success",
    });
  }
  const [theNewUser, setTheNewUser] = useState(userToUpdate);

  async function updateTheUserFunc(e) {
    e.preventDefault();
    const response = await fetch(APIs.apiLink + "/auth/user/" + theNewUser.Id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: theNewUser.firstName,
        lastName: theNewUser.lastName,
          role: theNewUser.role,
        email: theNewUser.email,
      }),
    });
    if (response.ok) {
      handleSnackBarSuccess("User updated successfully");
      //setState(false);
      window.location.reload();
    } else {
      const errorResponse = await response.json();
      console.log("Update failed:", errorResponse);
      handleSnackBar(errorResponse.$value[0].errorMessage);
    }
  }
  return state ? (
    <div id="updateEmployee">
      <div id="updateRoomContainer">
        <div id="topUpdateRoom">
          <h1>Update User</h1>
          <button
            onClick={() => {
              document.body.style.overflow = "unset";
              setState(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <div id="updateForm">
          <div id="updateRightSide">
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
                  }, width: "100%"

              }}
              id="standard-basic name"
              label="First Name"
              variant="standard"
              type="text"
              onChange={(e) =>
                setTheNewUser({ ...theNewUser, firstName: e.target.value })
              }
              value={theNewUser.firstName}
            /><br/>
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
                width:"100%"
              }}
              id="standard-basic lastName"
              label="Last Name"
              variant="standard"
              type="text"
              onChange={(e) =>
                setTheNewUser({ ...theNewUser, lastName: e.target.value })
              }
              value={theNewUser.lastName}
                      /><br />
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
                              }, width: "100%"

                          }}
                          id="standard-basic email"
                          label="Email"
                          variant="standard"
                          type="text"
                          onChange={(e) =>
                              setTheNewUser({ ...theNewUser, email: e.target.value })
                          }
                          value={theNewUser.email}
                      />
          </div>
          <div id="updateLeftSide">
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={theNewUser.role}
              label="Role"
              onChange={(e) =>
                setTheNewUser({ ...theNewUser, role: e.target.value })
              }
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Employee" default>
                Employee
              </MenuItem>
            </Select>
          </div>
        </div>
        <button id="updateRoomButton" onClick={updateTheUserFunc}>
          Update
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}
export default UpdateEmployee;
