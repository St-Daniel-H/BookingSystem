/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import APIs from "../../Backend/backend";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import colors from "../../scss/SCSSVariables";
import UpdateRoom from "./updateRoom";
import "./ManageRooms.scss"
import { useSnackbar } from "notistack";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ManageRooms(props) {
    //loading
    const [rerenderRooms, setRerenderRooms] = useState(false);
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
    const [rooms, setRooms] = useState([]);
    function isAdmin() {
        return role == "Admin"
    }
    async function getAllRoomsWithCompanyId() {
        try {
            const getrooms = await fetch(APIs.apiLink + "/company/" + companyId).then(
                (response) => {
                    if (response) {
                        response.json().then((result) => {
                            //console.log(result.$values)
                            setRooms(result.$values)
                        });
                        // console.log(rooms);
                    } else {
                        throw new Error(
                            "something went wrong loading the Rooms, try again later."
                        );
                    }
                }
            );
        } catch (error) {
            handleSnackBar(error)
        }
        setRerenderRooms(false);
    }
  useEffect(() => {
    getAllRoomsWithCompanyId();
  }, [rerenderRooms]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
      capacity: "",
    description: "",
  });
  async function submitRoom(e) {
    e.preventDefault();
    //console.log(companyId);
      setLoading(true);
    try {
      if (
        formData.name == "" ||
        formData.location == "" ||
          formData.capacitiy == 0 ||
        formData.description == ""
      ) {
          setLoading(false);
          handleSnackBar("fill all the information");
          throw new Error("fill all the information");

      }
        if (!formData.capacity > 0) {
            setLoading(false);
            handleSnackBar("Invalid capacity");
            throw new Error("Invalid capacity");
        }
        console.log(formData.capacity);
      const response = await fetch(APIs.apiLink + "/api/Room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
            Capacity: formData.capacity,
          description: formData.description,
          companyId: companyId,
        }),
      });
      if (response.ok) {
          handleSnackBarSuccess("Room Added!");
          setLoading(false);
          setFormData({
              name: "",
              location: "",
              capacity: "",
              description: "",
          });
          setRerenderRooms(true);
          //window.location.reload();
      } else {
        const errorResponse = await response.json();
          console.log("Adding Room failed:", errorResponse.$values[0].errorMessage);
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
    const [updateTheRoom, setUpdateRoom] = useState(false);
    const [roomToUpdate, setRoomToUpdate] = useState({ roomId: "", description: "",capacity:0,location:""})
    async function updateTheRoomOnClick(roomId, name, location, capacity, description) {
        setRoomToUpdate({ roomId: roomId,name:name, location: location, capacity: capacity, description: description });
        setUpdateRoom(true); 
        
    }

   return (
    <div id="ManageRooms">
          <h1>Rooms</h1>
          {isAdmin() ?
              <>
              <h3>Add Room</h3>
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
                      label="Name"
                      variant="standard"
                      type="text"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      value={formData.name}
                  /><br /><br /><br />
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
                      label="description"
                      variant="standard"
                      type="text"
                      onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                      }
                      value={formData.description}
                  /><br /><br /><br />
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
                      label="Location"
                      variant="standard"
                      type="text"
                      onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                      }
                      value={formData.location}
                  /><br /><br /><br />
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
                      label="Capacitiy"
                      variant="standard"
                      type="number"
                      onChange={(e) =>
                          setFormData({ ...formData, capacity: e.target.value })
                      }
                              value={formData.capacity}
                  />
                          <div id="buttonContainer"> {loading ? <Box sx={{ display: 'flex' }}>
                              <CircularProgress />
                          </Box> : <button id="addRoom" onClick={submitRoom}>Submit</button> }
                          </div>
              </div>
             
                  </form></> : ""}
          
          <div id="table">
          <table>
              <thead>
                  <tr>
                          <th>Room_Id</th>
                          <th>Name</th>
                      <th>Location</th>
                      <th>Capacity</th>
                      <th>Description</th>
                      {isAdmin() ? 
                          <>
                           <th>Update</th>
                           <th>Delete</th>
                          </> : ""}
                          
                  </tr>
              </thead>
              <tbody>
                  {
                      rooms.map((units, index) => {
                          return (
                              <tr key={index}>
                                  <td>{units.roomId}</td>
                                  <td>{units.name}</td>
                                  <td>{units.location}</td>
                                  <td>{units.capacity}</td>
                                  <td>{units.description}</td>
                                  {isAdmin() ? <>
                                      <td><button onClick={() => {
                                          //document.body.style.overflow = "hidden";
                                          updateTheRoomOnClick(units.roomId, units.name, units.location,units.capacity,units.description);
                                      }}>Update</button></td>
                                      <td><button>Delete</button></td>
                                  </> : ""}

                              </tr>
                          )
                      })}
              </tbody>
          </table>
          </div>
           {updateTheRoom ? <UpdateRoom companyId={companyId} roomToUpdate={roomToUpdate} setState={setUpdateRoom} state={updateTheRoom} /> : ""}
    </div>
  );
}
