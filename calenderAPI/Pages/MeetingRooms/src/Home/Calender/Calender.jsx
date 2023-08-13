import { useState } from "react";
import { render } from "react-dom";
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


function CalendarView() {
    //events
    const [eventss, setEventss] = useState([
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
    ]);
    //end of events
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
  //end of events drawer
  //handle click
    const [currentView, setCurrentView] = useState(Views.MONTH); // Define currentView state
    //slot
    const handleSlotSelect = (event) => {
        const newEvent = {
            title: "New Event",
            start: moment(event.start).toDate(), // Convert to Date object
            end: moment(event.end).toDate(),     // Convert to Date object
        };

        setEventss([...eventss, newEvent]);
    };
    //end
  const minTime = moment().set("hour", 8).set("minute", 0).toDate();
  const maxTime = moment().set("hour", 20).set("minute", 0).toDate();
    const handleViewChange = (view) => {
        setCurrentView(view);
    };
  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={eventss}
        startAccessor="start"
        endAccessor="end"
        step={30}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]} // Use allViews here
        defaultDate={new Date()}
        tooltipAccessor="description"
        //min={minTime}
        //max={maxTime}
        onSelectEvent={(event) => {
        setEventAncorState({ right: true });
         console.log(EventAncorState);
        }}
        longpressthreshold={10}
        selectable={true} // Enable selection of slots
              onSelectSlot={handleSlotSelect}
        // Handle slot selection
        onView={handleViewChange}
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
