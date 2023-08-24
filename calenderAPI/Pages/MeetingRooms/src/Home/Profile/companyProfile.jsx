/* eslint-disable react/prop-types */
import { useState } from "react";
import APIs from "../../Backend/backend";
import colors from "../../scss/SCSSVariables";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import noLogo from "../../Images/defLogo.jpg";

function CompanyProfile({ company, userRole }) { 
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
    function handleSnackBarSuccess(succsess) {
        enqueueSnackbar(succsess, {
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
            },
            variant: "success",
        });
    }
    const [updatingCompany, setUpdatingCompany] = useState(false);
    const [formData, setFormData] = useState({
        name: company.name,
        email: company.email,
        logo:null,

    })
    const [image, setImage] = useState(
        `../../../public/Uploads/${company.logo}`
    );
    async function updateTheCompany(e) {
        console.log(company);
        e.preventDefault()
        const companyData2 = new FormData();
        companyData2.append("Name", formData.name);
        companyData2.append("email", formData.email);
        console.log(formData.logo);
        if (formData.logo != null) {
            companyData2.append("logo", formData.logo[0]);

        }
        try {
            const response = await fetch(APIs.apiLink + "/api/Company/" + company.companyId, {
                method: "PUT",
                body: companyData2,

            })
            if (response.ok) {
                handleSnackBarSuccess("Company Updated");
                window.location.reload();

            } else {
                throw new Error("error")
            }
        } catch (error) {
            console.log(error);
            handleSnackBar("Something went wrong, try again later")
        }
    }
    const [deletingCompany, setDeletingCompany] = useState(false);
    async function deleteCompanyNow() {
        const response = await fetch(APIs.apiLink + "/api/Company/" + company.companyId, {
            method: "DELETE",
        });
        if (response.ok) {
            handleSnackBarSuccess("Company deleted");
            localStorage.clear();
            window.location.reload();
        } else {
            const errorResponse = await response.json();
            console.log(errorResponse);
            handleSnackBar("Error occured, Try again later");
        }
    }
    return (
        <div id="companyProfile">
            <div id="companyProfileLeft">
               
                {!updatingCompany && !deletingCompany ? <>
                    {company.logo ? (
                        <img id="imgcompany" src={image}></img>
                    ) : (
                        <img id="imgcompany" src={noLogo}></img>
                    )}   <br />
                    Name: <b>{company.name}</b><br />
                    Email: <b>{company.email}</b>
                </> : updatingCompany && !deletingCompany ? <>
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
                        label="Name"
                        id="standard-basic Name"
                        type="text"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        value={formData.name}
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
                        type="text"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        value={formData.email}
                        variant="standard"
                    ></TextField><br />
                    <label id="customLabel" htmlFor="chooseLogo">
                        Logo
                    </label>
                    {/* </div> */}
                    <input
                        id="chooseLogo"
                        className="input"
                        type="file"
                        onChange={(ev) => setFormData({ ...formData, logo: ev.target.files })}
                        accept="image/x-png,image/gif,image/jpeg"
                    />
                    <br />
                    <button onClick={updateTheCompany} className="normalButton">Update</button><br />

                </> : <>
                    <h3>Delete Company</h3>
                    <button className="deleteButton" onClick={deleteCompanyNow}>Delete</button>
                </>}

            </div>
            {userRole == "Owner" ?
                <div id="companyProfileRight">
                    {!deletingCompany ? <button className="normalButton" onClick={() => { setUpdatingCompany(!updatingCompany) }}>{!updatingCompany ? "Update" : "Cancel"}</button>:""}<br />
                    {!updatingCompany ? <button className="deleteButton" onClick={() => { setDeletingCompany(!deletingCompany) }}>{!deletingCompany ? "Delete" : "Cancel"}</button>:""}
                </div>
                :""}
        </div>
    )
}

export default CompanyProfile;