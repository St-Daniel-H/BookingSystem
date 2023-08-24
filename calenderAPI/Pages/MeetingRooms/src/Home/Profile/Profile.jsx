/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useState } from "react"
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import colors from "../../scss/SCSSVariables";
import "./Profile.scss"
import APIs from "../../Backend/backend";

function Profile({ user }) {
    //snackbars
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
  function handleSnackBarSuccess() {
    enqueueSnackbar("Signup Successful", {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      variant: "success",
    });
  }

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateUserForm, setUpdateUserForm] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    })
        async function updateTheUser(e) {
            e.preventDefault();
            const response = await fetch(APIs.apiLink + "/auth/user/" + user.id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: updateUserForm.firstName,
                    lastName: updateUserForm.lastName,
                    email:updateUserForm.email,
                    role: user.role,
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
        //transfer ownership
    const [isTransfering, setIsTransfering] = useState(false);
    async function transferOwnership() {
        if (isUpdate) {
            setIsUpdate(false);
        }
        setIsTransfering(!isTransfering)
    }
    async function deleteProfile() {
        handleSnackBar("User deleted");
    }
    function changeTextToForm() {
        setIsUpdate(!isUpdate);
    }
    return (
        <div id="ProfileContainer">
            <h1>Profile</h1>
            <div id="UserProfile">
            <div id="userProfileLeft">
                    {isUpdate && !isTransfering ? 
                    <>
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
                            marginBottom:"20px"
                        }}
                        label="First Name"
                        id="standard-basic firstName"
                        type="text"
                            onChange={(e) => setUpdateUserForm({ ...updateUserForm, firstName: e.target.value })}
                            value={updateUserForm.firstName}
                        variant="standard"
                        ></TextField><br/>
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
                                marginBottom: "20px"
                            }}
                            label="Last Name"
                            id="standard-basic lastName"
                            type="text"
                            onChange={(e) => setUpdateUserForm({ ...updateUserForm, lastName: e.target.value })}
                            value={updateUserForm.lastName}
                            variant="standard"
                        ></TextField><br />
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
                                marginBottom: "20px"
                            }}
                            label="Email"
                            id="standard-basic email"
                            type="email"
                            onChange={(e) => setUpdateUserForm({...updateUserForm,email: e.target.value})}
                            value={updateUserForm.email}
                            variant="standard"
                        ></TextField><br />
                        Role: <b>{user.role} </b><br />
                            <button className="normalButton" onClick={updateTheUser}>Update</button>
                        </> : !isUpdate && !isTransfering ?
                    <>
                        Name: <b>{user.firstName} {user.lastName}</b><br />
                        Email: <b>{user.email} </b><br />
                        Role: <b>{user.role} </b><br />

                            </> :
                           
                            <div id="transfering">
                          <h1>Transfer Ownership</h1>
                          </div>
                          
                }
                

            </div>
            <div id="userProfileRight">
                    {!isTransfering ? <button className="normalButton" onClick={changeTextToForm}>{!isUpdate ? "Update" : "Cancel"}</button> : ""}<br/>
                {user.role != "Owner" ?
                    <button  className="deleteButton" onClick={deleteProfile}>Delete Account</button> :
                        <button className="deleteButton" onClick={transferOwnership}>{!isTransfering ? "Transfer Ownership" : "Cancel"}</button>}
            </div>
           </div>
        </div>
    )
}

export default Profile;