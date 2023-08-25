/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useState,useEffect } from "react"
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import colors from "../../scss/SCSSVariables";
import "./Profile.scss"
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";
import APIs from "../../Backend/backend";
import CompanyProfile from "./companyProfile"
function Profile({ user,company }) {
    const navigateTo = useNavigate();

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
  function handleSnackBarSuccess(success) {
      enqueueSnackbar(success, {
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
                handleSnackBar("Email already exist");
            }
    }    
        //transfer ownership
    const [isTransfering, setIsTransfering] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [employeesLoaded, setEmployeesLoaded] = useState(false);
    //get all employees
    async function getAllEmployeesWithCompanyId() {
        try {
            const getEmployees = await fetch(
                APIs.apiLink + "/auth/company/" + user.companyId
            ).then((response) => {
                if (response) {
                    response.json().then((result) => {
                        //console.log(result.$values)
                        const employeesData = result.$values.map(employee => ({
                            id: employee.id,
                            firstName: employee.firstName,
                            lastName: employee.lastName
                        }));
                        setEmployees(employeesData);
                    });
                    setEmployeesLoaded(true)
                    // console.log(rooms);
                } else {
                    throw new Error(
                        "something went wrong loading the Employees, try again later."
                    );
                }
            });
        } catch (error) {
            handleSnackBar(error);
        }
        setEmployeesLoaded(true);
    }
    useEffect(() => {
            getAllEmployeesWithCompanyId();
            console.log(employees)
    },[employeesLoaded])
    async function transferOwnership() {
        if (isUpdate) {
            setIsUpdate(false);
        }
        if (deletingProfile) {
            setDeletingProfile(false);
        }
        setIsTransfering(!isTransfering)
    }
    const [selectedEmployee,setSelectedEmployee] = useState(0)
    async function transferOwnershipNow(event) {
        if (user.role != "Owner" || selectedEmployee == "") {
            return;
        }
        event.preventDefault();
        try {
            const response = await fetch(APIs.apiLink + "/api/Auth/transfer-owner", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fromUserId: user.id,
                    toUserId: selectedEmployee,
                }),
            }
            )
            handleSnackBarSuccess("transfered ownership");
            window.location.reload();

        } catch (error) {
            handleSnackBar("something went wrog")
            console.log(error);
        }
        
        console.log(selectedEmployee)
    }

    //delete Account
    const [deletingProfile, setDeletingProfile] = useState(false);
    async function deleteProfile(e) {
        e.preventDefault();
        const response = await fetch(APIs.apiLink + "/auth/User/" + user.id, {
            method: "DELETE",
        });
        if (response.ok) {
            handleSnackBarSuccess("User deleted");
            localStorage.clear(); 
            navigateTo("/login");
        } else {
            const errorResponse = await response;
            console.log(errorResponse);
            handleSnackBar(errorResponse.$value[0].errorMessage);
        }
    }
    function changeTextToForm() {
        if (deletingProfile) {
            setDeletingProfile(false);
        }
        if (isTransfering) {
            setIsTransfering(false);
        }
        setIsUpdate(!isUpdate);
    }
    return (
        <div id="ProfileContainer">
            <h1>Profile</h1>
            <div id="UserProfile">
            <div id="userProfileLeft">
                    {isUpdate && !isTransfering && !deletingProfile ? 
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
                        </> : !isUpdate && !isTransfering && !deletingProfile ?
                    <>
                        Name: <b>{user.firstName} {user.lastName}</b><br />
                        Email: <b>{user.email} </b><br />
                        Role: <b>{user.role} </b><br />

                            </> :isTransfering && !deletingProfile && !isUpdate ?
                           
                            <div id="transfering">
                                <h3>Transfer Ownership</h3>
                                <p>Who do you want to transfer the owner ship to?</p>
                                <Autocomplete
                                    onChange={(event, value) => setSelectedEmployee(value.value)}
                                    isOptionEqualToValue={(option, value) =>
                                        value === undefined || value === "" || option.id === value.id
                                    }
                                    options={employees
                                        .filter(employee => employee.id !== user.id)
                                        .map(employee => ({
                                            value: employee.id,
                                            label: `${employee.firstName} ${employee.lastName}`
                                        }))
                                    }
                                    getOptionLabel={(option) => option.label}
                                    sx={{ width: 300, marginTop: "30px" }}
                                    renderInput={(params) => <TextField {...params} label="User" />}
                                />
                                <button id="transferNOW" className="deleteButton" onClick={transferOwnershipNow}>Transfer</button>
                                </div> : !isTransfering && !isUpdate && deletingProfile ? <>
                                    <h3>Are you sure you want to delete your account?</h3>
                                    <button className="deleteButton" onClick={deleteProfile}>Delete Account</button> :
                                </> : ""
                          
                }
                

            </div>
            <div id="userProfileRight">
                    {!isTransfering ? <button className="normalButton" onClick={changeTextToForm}>{!isUpdate ? "Update" : "Cancel"}</button> : ""}<br/>
                {user.role != "Owner" ?
                        <button className="deleteButton" onClick={() => { setDeletingProfile(!deletingProfile); setIsUpdate(false) }}>{deletingProfile ? "Cancel" : "Delete Account"}</button> :
                        <button className="deleteButton" onClick={transferOwnership}>{!isTransfering ? "Transfer Ownership" : "Cancel"}</button>}
            </div>
            </div>
            <div style={{marginTop:"50px"}}>
                <h1>Company</h1>
                <CompanyProfile userRole={user.role}  company={company} />
            </div>

        </div>
    )
}

export default Profile;