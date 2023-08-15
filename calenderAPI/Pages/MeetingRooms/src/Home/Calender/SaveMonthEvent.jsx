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

function SaveMonthEvent({ state, setState, rooms, user,eventTime,view,events,setEvents }) {
    const roomToPick = [...rooms];

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
    //fix the format on submiton
    function replaceTimeInDate(originalMoment, newTime) {
        let newDate = moment(originalMoment).format("YYYY-MM-DD h:mm:ss")

        if (allDay) {
            newDate = moment(originalMoment)
                .startOf('day')
                .format('yyyy-MM-ddTHH:mm:ss.fff')
            return newDate;
        }

        const parsedTime1 = moment(newTime, 'h:mm A');
        const formattedTime1 = parsedTime1.format('h:mm:ss');

         newDate = moment(originalMoment)
            .set('hour', parsedTime1.hours())
            .set('minute', parsedTime1.minutes())
            .set('second', parsedTime1.seconds())
             .format('yyyy-MM-ddTHH:mm:ss.fff')
        return newDate;
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
  
  //save and cancel
    function validateEventTimeSlots() {
        const array = events.filter((x) => x.roomId == formData.room.roomId);
        return array.some(
            (event) =>
            ((formData.start >= event.start && formData.start < event.end) ||
                (formData.end > event.start && formData.end <= event.end))
        );
    }
    async function saveEvent(event) {
        event.preventDefault();
        console.log(formData.start);
        console.log(eventTime)
        const startTime = replaceTimeInDate(eventTime.start, formData.start);
        let endTime = replaceTimeInDate(eventTime.end, formData.end);
        if (allDay) {
            endTime = moment(endTime).add(1, 'day').format('yyyy-MM-ddTHH:mm:ss.fff');
        }
        console.log("start time " + startTime);
        console.log("end time " + endTime)

        if (!validateEventTimeSlots()) {
            console.log("good")
            //setEvents({start: formData.start,})
            console.log(user);
            try {
                const response = await fetch(APIs.apiLink + "/api/Reservation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        start: startTime,
                        end: endTime,
                        roomId: formData.room.roomId,
                        title: formData.title,
                        description: formData.description,
                        numberOfAttendees: formData.NumberOfAttendees,
                        aUserId: user.id
                    })
                }

                );
                if (response) {
                    console.log(response);
                    //setEvents()
                } else {
                    const errorResponse = await response.json();
                    console.log("reservation failed:", errorResponse);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
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
              <form onSubmit={saveEvent}>
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
                      <button id="saveButton" type="submit">Save</button></div>
              </form>
             
      </div>
        </div>
    ) : "";
}
export default SaveMonthEvent;
