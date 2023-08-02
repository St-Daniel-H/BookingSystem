/* eslint-disable react/prop-types */
import APIs from "../../Backend/backend";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import colors from "../../scss/SCSSVariables";

export default function ManageRooms(props) {
    const { role, companyId } = props;
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        getAllRoomsWithCompanyId();
    },[])
    async function getAllRoomsWithCompanyId() {
        const getrooms = await fetch(APIs.apiLink + "/company/$" + companyId).then((response) => {
            if (response) {
                setRooms(response);
                console.log(rooms);
            } else {
                throw new Error("something went wrong loading the Rooms, try again later.")
            }
        })
    }
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        capactiy: null,
        description:"",
    });
       //public string Name { get; set; }
       // public string Location { get; set; }
       // public int Capacity { get; set; }
       // public string Description { get; set; }
       // public int companyId { get; set; }
  return (
    <div id="Rooms">
          <h1>Rooms</h1>
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
                  />
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
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      value={formData.description}
                  />
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
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      value={formData.location}
                  />
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
                      onChange={(e) => setFormData({ ...formData,capactiy: e.target.value })}
                      value={formData.capactiy}
                  />
              </div>
              <button type="submit">Submit</button>
          </form>
    </div>
  );
}
