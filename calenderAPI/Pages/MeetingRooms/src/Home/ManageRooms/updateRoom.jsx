/* eslint-disable react/prop-types */
import "./updateRoom.scss"
import { useState, useEffect } from "react";
import APIs from "../../Backend/backend";
import TextField from "@mui/material/TextField";
import colors from "../../scss/SCSSVariables";

function UpdateRoom({ state, setState,roomToUpdate,companyId }) {
    console.log(roomToUpdate)
    const [theNewRoom, setTheNewRoom] = useState({});
    useEffect(() => {
        setTheNewRoom(roomToUpdate);
    }, [roomToUpdate]);
    console.log(theNewRoom);
    //update room function
    async function updateTheRoomFunc() {
        const response = await fetch(APIs.apiLink + "/api/Room/" + roomId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: theNewRoom.name,
                location: theNewRoom.location,
                capacity: theNewRoom.capacity,
                description: theNewRoom.description,
                companyId: companyId,
            })     
        })
        if (response.ok) {
            alert("Room updated successfully");
            window.location.reload();
        } else {
            const errorResponse = await response.json();
            console.log("Signup failed:", errorResponse);
        }
           
    }
    return state ? (
        <div id="updateRoom" >
            <div id="updateRoomContainer">
                <div id="topUpdateRoom">
                    <h1>Update Room</h1>
                    <button onClick={() => { setState(false) }}>click</button>                </div>
                <div id="updateForm">
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
                        onChange={(e) => setTheNewRoom({ ...theNewRoom, name: e.target.value })}
                        value={theNewRoom.name}
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
                            setTheNewRoom({ ...theNewRoom, description: e.target.value })
                        }
                        value={theNewRoom.description}
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
                            setTheNewRoom({ ...theNewRoom, location: e.target.value })
                        }
                        value={theNewRoom.location}
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
                        label="Capactiy"
                        variant="standard"
                        type="number"
                        onChange={(e) =>
                            setTheNewRoom({ ...theNewRoom, capactiy: e.target.value })
                        }
                        value={theNewRoom.capactiy}
                    /><br /><br /><br />
                    <button id="updateRoom" onClick={updateTheRoomFunc}>Update</button>
                </div>
            </div>
           
        </div>

    ) : ("");
}
export default UpdateRoom;