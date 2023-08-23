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
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from "notistack";
import ManageReservation from "../ManageReservation/ManageReservation";

function SaveMonthEvent({ state, setState, rooms, user, eventTime, setEventTime, view, events, setEvents, updatingEvent, setUpdatingEvent, reservationToUpdate, setReservationToUpdate }) {
    const roomToPick = [...rooms];
    const [allDay, setAllDay] = useState(view == "month");
    console.log("resrvation Id:"+reservationToUpdate)
    function close() {
        setReservationToUpdate("")
        setUpdatingEvent(false);
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
        return newDate;
    }


    const [formData, setFormData] = useState({
        description: eventTime.description,
        start: timeFormat(eventTime.start),
        end: timeFormat(eventTime.end),
        room: roomToPick[0],
        title: eventTime.title,
        NumberOfAttendees: eventTime.NumberOfAttendees,
        MeetingStatus: true,
    });

    //save and cancel
    const [loading, setLoading] = useState(false);
    function validateEventTimeSlots(start, end) {
        console.log(events);
        console.log(start);
        console.log(end);

        const array = events.filter(event => event.roomId === formData.room.roomId && event.reservationId !== reservationToUpdate);

        const overlaps = array.some(event => {
            let eventStart = moment(event.start);
            let eventEnd = moment(event.end);
            const proposedStart = moment(start);
            let proposedEnd = moment(end);
            // Adjust end time if event is an all-day event
            if (eventStart.isSame(eventEnd, 'day') && eventStart.hours() === 0 && eventStart.minutes() === 0) {
                eventEnd = moment(event.start).set({ hours: 23, minutes: 59, seconds: 59 });
            }
            // Adjust end time if proposed event is an all-day event
            if (proposedStart.isSame(proposedEnd, 'day') && proposedStart.hours() === 0 && proposedStart.minutes() === 0) {
                proposedEnd = moment(end).set({ hours: 23, minutes: 59, seconds: 59 });
            }
          

            const isOverlapping =
                (proposedStart.isBetween(eventStart, eventEnd) || proposedEnd.isBetween(eventStart, eventEnd)) ||
                (eventStart.isBetween(proposedStart, proposedEnd) || eventEnd.isBetween(proposedStart, proposedEnd)) ||
                (eventStart.isSameOrBefore(proposedStart) && eventEnd.isSameOrAfter(proposedEnd));

            return isOverlapping;
        });

        console.log("Overlaps:", overlaps);

        return overlaps;
    }



 

    async function saveEvent(event) {
        event.preventDefault();
        setLoading(true);

        event.preventDefault();
        if (formData.title == "" || formData.description == "" || formData.NumberOfAttendees == 0) {
            console.log("fill all the information");
            handleSnackBar("fill all the information");
            setLoading(false);
            return;
        }
        if (updatingEvent) {
            updateEvent()
            setLoading(false);

            return;
        }
        let startTime;
        let endTime;

        if (allDay) {
            if (moment(eventTime.start).isSame(moment(eventTime.end), 'day')) {
                startTime = moment(replaceTimeInDate(eventTime.start, "12:00 AM")).format('YYYY-MM-DDTHH:mm:ss');
                endTime = moment(replaceTimeInDate(eventTime.end, "12:00 AM")).format('YYYY-MM-DDTHH:mm:ss');
            } else {
                startTime = moment(replaceTimeInDate(eventTime.start, "12:00 AM")).format('YYYY-MM-DDTHH:mm:ss');
                endTime = moment(replaceTimeInDate(eventTime.end, "12:00 AM")).add(1, "day").format('YYYY-MM-DDTHH:mm:ss');
            }
        } else {
            startTime = moment(replaceTimeInDate(eventTime.start, formData.start)).format('YYYY-MM-DDTHH:mm:ss');
            endTime = moment(replaceTimeInDate(eventTime.end, formData.end)).format('YYYY-MM-DDTHH:mm:ss');
        }

        if (!validateEventTimeSlots(startTime, endTime)) {
            console.log("good");

            if (!updatingEvent) {
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
                    });

                    if (response.ok) {
                        response.json().then(data => {
                            setEvents([...events, {
                                start: moment(data.startTime).toDate(),
                                end: moment(data.endTime).toDate(),
                                title: data.title,
                                description: data.description,
                                roomId: data.roomId,
                                aUserId: data.aUserId,
                                reservationId:data.reservationId,
                            }]);
                        }).catch(error => {
                            console.error('Error parsing response JSON:', error);
                        });

                        handleSnackBarSuccess("Meeting added!");
                        close();
                    } else {
                        const errorResponse = await response.json();
                        console.log("reservation failed:", errorResponse);
                        handleSnackBar(errorResponse.$values[0].errorMessage);
                        throw new Error(errorResponse.$values[0]);
                    }
                } catch (error) {
                    setLoading(false);
                    console.log(error);
                    handleSnackBar(error);
                }
            } 
        } else {
            console.log("A meeting in the same room overlapping");
            handleSnackBar("A meeting in the same room overlapping");
        }

        setLoading(false);
    }
    async function updateEvent(event) {
        if (formData.title == "" || formData.description == "" || formData.NumberOfAttendees == 0) {
            console.log("fill all the information");
            handleSnackBar("fill all the information");
            setLoading(false);
            return;
        }

        let startTime;
        let endTime;

        if (allDay) {
            if (moment(eventTime.start).isSame(moment(eventTime.end), 'day')) {
                startTime = moment(replaceTimeInDate(eventTime.start, "12:00 AM")).format('YYYY-MM-DDTHH:mm:ss');
                endTime = moment(replaceTimeInDate(eventTime.end, "12:00 AM")).format('YYYY-MM-DDTHH:mm:ss');
            } else {
                startTime = moment(replaceTimeInDate(eventTime.start, "12:00 AM")).format('YYYY-MM-DDTHH:mm:ss');
                endTime = moment(replaceTimeInDate(eventTime.end, "12:00 AM")).add(1, "day").format('YYYY-MM-DDTHH:mm:ss');
            }
        } else {
            startTime = moment(replaceTimeInDate(eventTime.start, formData.start)).format('YYYY-MM-DDTHH:mm:ss');
            endTime = moment(replaceTimeInDate(eventTime.end, formData.end)).format('YYYY-MM-DDTHH:mm:ss');
        }
            if (validateEventTimeSlots(startTime, endTime)) {
                handleSnackBar("Overlapping meetings");
                return;
            }
        
        try {
            const response = await fetch(APIs.apiLink + "/api/Reservation/" + reservationToUpdate, {
                method: "PUT",
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
            });
            if (response.ok) {
                response.json().then(data => {
                    const updatedEvent = {
                        start: moment(data.startTime).toDate(),
                        end: moment(data.endTime).toDate(),
                        title: data.title,
                        description: data.description,
                        roomId: data.roomId,
                        aUserId: data.aUserId,
                        reservationId: reservationToUpdate,
                    };
                    const updatedEvents = events.map(event => {
                        if (event.reservationId === reservationToUpdate) {
                            return updatedEvent; // Update the matching event
                        }
                        return event; // Keep other events unchanged
                    });
                    setEvents([...updatedEvents]);
                })
                handleSnackBarSuccess("Meeting added!");
                close();
            } else {
                console.error(response)
                const errorResponse = await response.json();
                console.log("reservation failed:", errorResponse);
                handleSnackBar(errorResponse.$values[0].errorMessage);
                throw new Error(errorResponse.$values[0]);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            handleSnackBar(error);
        }
    }

    useEffect(() => {

      validateEnd();
  }, [formData.start],eventTime.end);
    return state ? (

      <div id="SaveMonthEvent">
            <div id="background-color">              </div>
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
            value={formData.title}
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
            value={formData.description}
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
                      <button id="cancelButton" onClick={close}>Cancel</button>
                        {!loading ? <button id="saveButton" type="submit">{!updatingEvent ? "Save" : "Update"}</button> : <CircularProgress />
}
                      </div>
              </form>
      </div>
        </div>
    ) : "";
}
export default SaveMonthEvent;
