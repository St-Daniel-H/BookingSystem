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
import { useSnackbar } from "notistack";

function SaveMonthEvent({ state, setState, rooms, user, eventTime, setEventTime,view,events,setEvents }) {
    const roomToPick = [...rooms];
    console.log(eventTime);
    const [allDay, setAllDay] = useState(view == "month");
   function close() {
    setState(false);
    document.body.style.overflow = "unset";
    }
  //snack bars
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
    //end of snackbars
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
        console.log("originalMoment:" + originalMoment);
        let newDate = moment(originalMoment).format("YYYY-MM-DD h:mm:ss")
        const parsedTime1 = moment(newTime, ["h:mm A"]).format("HH:mm");
        const time = parsedTime1.split(":");
        console.log("time: " + time[0])
        newDate = moment(originalMoment)
            .set('hour', time[0])
            .set('minute', time[1])
            .set('second', 0)
            .format('YYYY-MM-DDTHH:mm:ss')
        console.log(newDate);
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
    function validateEventTimeSlots(start,end) {
        console.log(formData.room.roomId)
        const array = events.filter((x) => x.roomId == formData.room.roomId);
        console.log(array);
        const arr = array.some((event) =>
            moment(start).isBetween(event.start, event.end) ||
            moment(end).isBetween(event.start, event.end) ||
            (moment(start).isSameOrBefore(event.start) && moment(end).isSameOrAfter(event.end))
        );
        console.log(arr);
        return arr;
    }
    async function saveEvent(event) {
        event.preventDefault();
        if (formData.title == "" || formData.description == "" || formData.NumberOfAttendees == 0) {
            console.log("fill all the information");
            handleSnackBar("fill all the information")
            return;
        }
        let startTime;
        let endTime;
        if (allDay) {
            if (moment(eventTime.start).isSame(moment((eventTime.end, 'day')))) {
                startTime = moment(replaceTimeInDate(eventTime.start, "12:00 AM")).format('YYYY-MM-DDTHH:mm:ss');
                endTime = moment(replaceTimeInDate(eventTime.end, "12:00 AM")).format('YYYY-MM-DDTHH:mm:ss');
            } else {
                startTime = moment(replaceTimeInDate(eventTime.start, "12:00 AM")).format('YYYY-MM-DDTHH:mm:ss');
                endTime = moment(replaceTimeInDate(eventTime.end, "12:00 AM")).add("day",1).format('YYYY-MM-DDTHH:mm:ss');
            }
        
        } else {
            startTime = moment(replaceTimeInDate(eventTime.start, formData.start)).format('YYYY-MM-DDTHH:mm:ss');
            endTime = moment(replaceTimeInDate(eventTime.end, formData.end)).format('YYYY-MM-DDTHH:mm:ss');
        }
        console.log("start time " + startTime);
        console.log("end time " + endTime)

        if (!validateEventTimeSlots(startTime, endTime)) {
            console.log("good")
            //setEvents({start: formData.start,})
            console.log(user);
            try {
                const response = await fetch(APIs.apiLink + "/api/Reservation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "startTime": startTime,
                        "endTime": endTime,
                        roomId: formData.room.roomId,
                        title: formData.title,
                        description: formData.description,
                        numberOfAttendees: formData.NumberOfAttendees,
                        aUserId: user.id
                    })
                }

                );
                if (response.ok) {
                    response.json().then(data => {
                        setEvents([...events, {
                            start: moment(data.startTime).toDate(),
                            end: moment(data.endTime).toDate(),
                            title: data.title,
                            description: data.description,
                            roomId: data.roomId,
                            aUserId: data.aUserId,
                        }]);
                    }).catch(error => {
                        console.error('Error parsing response JSON:', error);
                    });
                    handleSnackBarSuccess("Meeting added!")
                } else {
                    const errorResponse = await response.json();
                    console.log("reservation failed:", errorResponse);
                    handleSnackBar(errorResponse.$values[0].errorMessage);
                    throw new Error(errorResponse.$values[0]);
                }
            } catch (error) {
                console.log(error)
                handleSnackBar(error)
            }
        } else {
            console.log("A meeting in the same room overlapping")
            handleSnackBar("A meeting in the same room overlapping")
        }
    }
    useEffect(() => {

      validateEnd();
  }, [formData.start],eventTime.end);
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
