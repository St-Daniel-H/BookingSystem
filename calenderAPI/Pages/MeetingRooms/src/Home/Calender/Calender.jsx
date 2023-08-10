import { useState } from "react";
import { render } from "react-dom";
import events from "./events";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import 'react-big-calendar/lib/sass/styles';
//import 'react-big-calendar/lib/addons/dragAndDrop/styles';/// Corrected typo: "indes.css" to "index.css"
import "./Calendar.scss";
import EventsAnchor from "./EventAnchor";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
moment.locale("en-GB");

const localizer = momentLocalizer(moment);

const eventss = [
  {
    title: "hey",
    description: "room321",
    start: new Date(2023, 7, 14, 10, 0),
    end: new Date(2023, 7, 14, 12, 0),
  },
  {
    title: "hey",
    description: "room321",
    start: new Date(2023, 7, 14, 10, 0),
    end: new Date(2023, 7, 14, 12, 0),
  },
  {
    title: "hey",
    description: "room321",
    start: new Date(2023, 7, 14, 10, 0),
    end: new Date(2023, 7, 14, 12, 0),
  },
  {
    title: "hey",
    description: "room321",
    start: new Date(2023, 7, 14, 10, 0),
    end: new Date(2023, 7, 14, 12, 0),
  },
  {
    title: "hey",
    description: "room321",
    start: new Date(2023, 7, 14, 10, 0),
    end: new Date(2023, 7, 14, 12, 0),
  },
  {
    title: "hey",
    description: "room321",
    start: new Date(2023, 7, 14, 10, 0),
    end: new Date(2023, 7, 14, 12, 0),
  },
];
function CalendarView() {
  //events drawer
  const [EventAncorState, setEventAncorState] = useState({
    right: false,
  });
  const anchor = "right";

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    return setEventAncorState({ [anchor]: open });
  };
  //
  const minTime = moment().set("hour", 8).set("minute", 0).toDate();
  const maxTime = moment().set("hour", 20).set("minute", 0).toDate();

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={eventss}
        startAccessor="start"
        endAccessor="end"
        step={30}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]} // Use allViews here
        defaultDate={new Date(2023, 3, 1)}
        tooltipAccessor="description"
        min={minTime}
        max={maxTime}
        onSelectEvent={(event) => {
          setEventAncorState({ right: true });
          console.log(EventAncorState);
        }}
      />

      <Drawer
        anchor={anchor}
        open={EventAncorState[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        <EventsAnchor state={EventAncorState} setState={setEventAncorState} />
      </Drawer>
    </div>
  );
}

export default CalendarView;
