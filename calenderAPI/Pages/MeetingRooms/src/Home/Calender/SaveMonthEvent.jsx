/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import APIs from "../../Backend/backend";
import TextField from "@mui/material/TextField";
import colors from "../../scss/SCSSVariables";
import { useState, useEffect } from "react";
import "./SaveMonthEvent.scss";
import timeSlots from "./timeSlots";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import moment from "moment";

function SaveMonthEvent({ state, setState, rooms, user,eventTime,view }) {
    const roomToPick = [...rooms];
    console.log(eventTime)

    const [allDay, setAllDay] = useState(view == "month");
   function close() {
    setState(false);
    document.body.style.overflow = "unset";
  }
  //time slots
  function endFilter() {
    const end = timeSlots.slice(timeSlots.indexOf(formData.start) + 1);
    return end;
  }
  function validateEnd() {
    if (timeSlots.indexOf(formData.start) >= timeSlots.indexOf(formData.end)) {
      setFormData({
        ...formData,
        end: timeSlots[timeSlots.indexOf(formData.start) + 1],
      });
    }
  }
  //end time slots
  //fix day/month/year format
    function monthFormat(time) {
        console.log(time)
        const date = new Date(time)
        return moment(date).format('MM-DD-YYYY');
    }
  //fix time format 
    function timeFormat(time) {
        // Assuming the provided time string
        const inputTime = time;

        // Parse the input time using moment.js
        const parsedTime = moment(inputTime);

        // Format the parsed time in the desired 12-hour format with AM/PM
        const formattedTime = parsedTime.format("hh:mm A");

        return formattedTime;      
    }
    
    const [formData, setFormData] = useState({
        description: "",
        start: timeFormat(eventTime.start),
        end: timeFormat(eventTime.end),
    room: roomToPick[0],
    title: "",
    NumberOfAttendees: 0,
    MeetingStatus: true,
  });
  useEffect(() => {
    validateEnd();
  }, [formData.start]);
  return state ?  (
    <div id="SaveMonthEvent">
      <div id="SaveMonthContainer">
        <div id="saveMonthTitle">
          <h2>Event Details</h2>
          <button onClick={close}>X</button>
        </div>
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
            id="standard-basic title"
            label="Title"
            variant="standard"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.name}
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
                marginTop: "20px"
            }}
            id="standard-basic description"
            label="Description"
            variant="standard"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.name}
          />
                  <br />
                  <div id="fromTo">
                      <TextField
                      id="outlined-read-only-input"
                      label="From"
                      defaultValue={monthFormat(eventTime.start)}
                      InputProps={{
                          readOnly: true,
                      }}
                      className="date"
                  />
                      <TextField
                          id="outlined-read-only-input"
                          label="To"
                          defaultValue={monthFormat(eventTime.end)}
                          InputProps={{
                              readOnly: true,
                          }}
                          className="date"
                      /></div>
                  
<br/>
                  {!allDay ? <> <div id="selectContainer">
                      <div className="selectTime">
                          <InputLabel id="demo-simple-select-label">Start</InputLabel>
                          <Select
                              className="select"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select selectStart"
                              value={formData.start}
                              label="Start"
                              onChange={(e) => {
                                  setFormData({ ...formData, start: e.target.value });
                              }}
                          >
                              {timeSlots.map((x) => {
                                  return (
                                      <MenuItem key={x} value={x}>
                                          {x}
                                      </MenuItem>
                                  );
                              })}
                          </Select>
                      </div>

                      <div id="selectEnd" className="selectTime">
                          <InputLabel id="demo-simple-select-label">End</InputLabel>
                          <Select
                              className="select"

                              labelId="demo-simple-select-label"
                              id="demo-simple-select "
                              value={formData.end}
                              label="Finish"
                              onChange={(e) =>
                                  setFormData({ ...formData, end: e.target.value })
                              }
                          >
                              {endFilter().map((x) => {
                                  return (
                                      <MenuItem key={x} value={x}>
                                          {x}
                                      </MenuItem>
                                  );
                              })}
                          </Select>

                      </div>

                  </div></> : ""}
                  <label>
                      <input
                          type="checkbox"
                          checked={allDay}
                          onChange={() => setAllDay(!allDay)}
                      />
                      All Day
                  </label>
                      <InputLabel id="demo-simple-select-label">Room</InputLabel>
                  <Select
                      sx={{ width: "45%" }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select roomSelect"
                          value={formData.room}
                          label="Room"
                          onChange={(e) => {
                              setFormData({ ...formData, room: e.target.value })
                          }
                          }
                      >
                          {roomToPick.map((x) => {
                              return (
                                  <MenuItem key={x.roomId} value={x} >
                                      {x.name}
                                  </MenuItem>
                              );
                          })}
                      </Select>
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
                          marginTop:"20px"
                      }}
                      id="standard-basic capactiy"
                      label="Number Of Attendees"
                      variant="standard"
                      type="number"
                      onChange={(e) => {
                          if (e.target.value <= formData.room.capacity) {
                              setFormData({ ...formData, NumberOfAttendees: e.target.value })
                          } else {
                              setFormData({...formData, NumberOfAttendees:formData.room.capacity})
                          }
                 }
  
                      }
                      value={formData.NumberOfAttendees}
                  />
                  <div id="buttonContainer">
                      <button id="cancelButton">Cancel</button>
                      <button id="saveButton">Save</button></div>
                  
              </form>
       
      </div>
        </div>
    ) : "";
}
export default SaveMonthEvent;
