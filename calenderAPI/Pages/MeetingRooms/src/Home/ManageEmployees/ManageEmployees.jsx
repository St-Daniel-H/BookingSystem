/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import APIs from "../../Backend/backend";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Container, InputAdornment, TextField } from "@mui/material";
import colors from "../../scss/SCSSVariables";
import UpdateEmployee from "./updateEmployee";
import "./ManageEmployees.scss";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import DeleteEmployee from "./deleteEmployee";
import Box from "@mui/material/Box";

export default function ManageEmployees(props) {
  //loading
  const [rerenderEmployees, setRerenderEmployees] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  function handleSnackBarSuccess(success) {
    enqueueSnackbar(success, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      variant: "success",
    });
  }
  function handleSnackBar(error) {
    enqueueSnackbar(error, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      variant: "error",
    });
  }

  const user = props.user;
  const { role, companyId } = user;
  const [employees, setEmployees] = useState([]);
  function isAdmin() {
    return role == "Admin";
  }
  async function getAllEmployeesWithCompanyId() {
    try {
      const getEmployees = await fetch(
        APIs.apiLink + "/auth/company/" + companyId
      ).then((response) => {
        if (response) {
          response.json().then((result) => {
            //console.log(result.$values)
            setEmployees(result.$values);
          });
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
    setRerenderEmployees(false);
  }
  useEffect(() => {
    getAllEmployeesWithCompanyId();
  }, [rerenderEmployees]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Employee",
  });
  async function submitRoom(e) {
    e.preventDefault();
    //console.log(companyId);
    setLoading(true);
    console.log(formData);
    try {
      if (
        formData.firstName == "" ||
        formData.lastName == "" ||
        formData.email == "" ||
        formData.password == "" ||
        formData.role == ""
      ) {
        setLoading(false);
        handleSnackBar("fill all the information");
        throw new Error("fill all the information");
      }
      const response = await fetch(APIs.apiLink + "/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          companyId: companyId,
        }),
      });
      if (response.ok) {
        handleSnackBarSuccess("Employee Added!");
        setLoading(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
        setRerenderEmployees(true);
        //window.location.reload();
      } else {
        const errorResponse = await response.json();
        console.log(
          "Adding Employee failed:",
          errorResponse.$values[0].errorMessage
        );
        handleSnackBar(errorResponse.$values[0].errorMessage);
        throw new Error(errorResponse.$values[0]);
      }
    } catch (error) {
      //handleSnackBar(error.errorMessage || error);
      setLoading(false);
      console.log(error);
    }
  }
  //handling updates
  const [updateTheEmployee, setUpdateEmployee] = useState(false); //update popup
  const [employeeToUpdate, setEmployeeToUpdate] = useState({
    userId: "",
    firstName: "",
    lastName: 0,
    email: "",
    role: "",
  });
  async function updateTheEmployeeOnClick(Id, firstName, lastName, role) {
    document.body.style.overflow = "hidden";
    setEmployeeToUpdate({
      Id: Id,
      firstName: firstName,
      lastName: lastName,
      role: role,
    });
    setUpdateEmployee(true);
  }
  //handling deletion
  const [deleteTheEmployee, setDeleteTheEmployee] = useState(false); //delet popup
  const [employeeToDelete, setEmployeeToDelete] = useState(0);

  async function deleteTheEmployeeOnClick(roomId) {
    document.body.style.overflow = "hidden";
    setEmployeeToDelete(roomId);
    setDeleteTheEmployee(true);
  }
  //search bar
  const [searchInput, setSearchInput] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  function search() {
    console.log(searchInput);
    const array = employees.filter(
      (x) =>
        x.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        x.lastName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResult([...array]);
    console.log(array);
    setSearching(true);
  }
  return (
    <div id="ManageRooms">
      <h1>Employees</h1>
      {isAdmin() ? (
        <>
          <h3>Add Employee</h3>
          <form>
            <div id="leftSide">
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
                id="standard-basic name"
                label="First Name"
                variant="standard"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                value={formData.firstName}
              />
              <br />
              <br />
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
                id="standard-basic description"
                label="Last Name"
                variant="standard"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                value={formData.lastName}
              />
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.role}
                label="Role"
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Employee" default>
                  Employee
                </MenuItem>
              </Select>
            </div>
            <div id="rightSide">
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
                id="standard-basic location"
                label="Email"
                variant="standard"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
              />
              <br />
              <br />
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
                id="standard-basic capactiy"
                label="Password"
                variant="standard"
                type="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
              />
              <br />
              <div id="buttonContainer">
                {" "}
                {loading ? (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <button id="addRoom" onClick={submitRoom}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
        </>
      ) : (
        ""
      )}
      <div id="searchBar">
        <TextField
          id="outlined-basic searchBarInput"
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
            width: "100%",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment id="searchButton" onClick={search} position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label="Search by name"
          variant="outlined"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      </div>
      <div id="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {isAdmin() ? (
                <>
                  <th>Update</th>
                  <th>Delete</th>
                </>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody>
            {!searching
              ? employees.map((units, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {units.firstName} {units.lastName}
                      </td>
                      <td>{units.email}</td>
                      <td>{units.role}</td>
                      {isAdmin() ? (
                        <>
                          <td>
                            <button
                              onClick={() => {
                                //document.body.style.overflow = "hidden";
                                updateTheEmployeeOnClick(
                                  units.id,
                                  units.firstName,
                                  units.lastName,
                                  units.role,
                                  units.email,
                                  units.password
                                );
                              }}
                            >
                              Update
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                deleteTheEmployeeOnClick(units.Id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      ) : (
                        ""
                      )}
                    </tr>
                  );
                })
              : searchResult.map((units, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {units.firstName} {units.lastName}
                      </td>
                      <td>{units.email}</td>
                      <td>{units.role}</td>
                      {isAdmin() ? (
                        <>
                          <td>
                            <button
                              onClick={() => {
                                //document.body.style.overflow = "hidden";
                                updateTheEmployeeOnClick(
                                  units.id,
                                  units.firstName,
                                  units.lastName,
                                  units.role
                                );
                              }}
                            >
                              Update
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                deleteTheEmployeeOnClick(units.Id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      ) : (
                        ""
                      )}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      {deleteTheEmployee ? (
        <DeleteEmployee
          userToDelete={employeeToDelete}
          setState={setDeleteTheEmployee}
          state={deleteTheEmployee}
        />
      ) : (
        ""
      )}
      {updateTheEmployee ? (
        <UpdateEmployee
          companyId={companyId}
          userToUpdate={employeeToUpdate}
          setState={setUpdateEmployee}
          state={updateTheEmployee}
        />
      ) : (
        ""
      )}
    </div>
  );
}
