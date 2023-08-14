import APIs from "../../Backend/backend";
import TextField from "@mui/material/TextField";
import colors from "../../scss/SCSSVariables";
import { useState, useEffect } from "react";
import "./SaveMonthEvent.scss";
import timeSlots from "./timeSlots";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
function SaveMonthEvent({ state, setState }) {
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
    if (timeSlots.indexOf(formData.start) > timeSlots.indexOf(formData.end)) {
      setFormData({
        ...formData,
        end: timeSlots[timeSlots.indexOf(formData.start) + 1],
      });
    }
  }
  //end time slots
  //Which Room?
  const [formData, setFormData] = useState({
    description: "",
    start: timeSlots[0],
    end: timeSlots[1],
    room: "",
    title: "",
    NumberOfAttendees: 0,
    MeetingStatus: "",
  });
  useEffect(() => {
    validateEnd();
  }, [formData.start]);
  return state ? (
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
            id="standard-basic NumberOfAttendees"
            label="Number Of Attendees"
            variant="standard"
            type="Number"
            onChange={(e) => {
              setFormData({ ...formData, NumberOfAttendees: e.target.value });
            }}
            value={formData.name}
          />
          <br />
          <div id="selectContainer">
            <div>
              <InputLabel id="demo-simple-select-label">Start</InputLabel>
              <Select
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
            <div id="selectEnd">
              <InputLabel id="demo-simple-select-label">End</InputLabel>
              <Select
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
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}
export default SaveMonthEvent;
