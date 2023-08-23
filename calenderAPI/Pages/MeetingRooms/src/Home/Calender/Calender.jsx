/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";
import { render } from "react-dom";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import APIs from "../../Backend/backend";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import 'react-big-calendar/lib/sass/styles';
//import 'react-big-calendar/lib/addons/dragAndDrop/styles';/// Corrected typo: "indes.css" to "index.css"
import "./Calendar.scss";
import EventsAnchor from "./EventAnchor";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import SaveMonthEvent from "./SaveMonthEvent.jsx";
moment.locale("en-GB");

const localizer = momentLocalizer(moment);
//const formattedStart = moment(event.start).format("YYYY, M, D, H, m");
//const formattedEnd = moment(event.end).format("YYYY, M, D, H, m");

function CalendarView(props) {
    const user = props.user;
  //month view
  const [openMonthSave, setOpenMonthSave] = useState(false);
  //get the rooms
    const [rooms, setRooms] = useState([])
    const [roomsLoaded, setRoomsLoaded] = useState(false)

    async function getAllRoomsWithCompanyId() {
        try {
            const getrooms = await fetch(APIs.apiLink + "/company/" + user.companyId).then(
                (response) => {
                    if (response) {
                        response.json().then((result) => {
                            //console.log(result.$values)
                            setRooms(result.$values);
                            setRoomsLoaded(true)
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
            console.log(error)
        }
    }
    useEffect(() => {
        if (!roomsLoaded) {
            getAllRoomsWithCompanyId()
        }
        if (!eventsLoaded) {
            getAllEvents();
        }
    })
  //events
  //getEvents
    const [eventsLoaded, setEventsLoaded] = useState(false);
    const [eventss, setEventss] = useState([]);
    async function getAllEvents() {
        try {
            const events = await fetch(APIs.apiLink + "/reservation/" + user.companyId).then(
                (response) => {
                    if (response) {
                        response.json().then((result) => {
                            setEventss(result.$values.map(obj => ({
    
                                start: moment(obj.startTime).toDate(),
                                end: moment(obj.endTime).toDate(),
                                title: obj.title,
                                description: obj.description,
                                roomId: obj.roomId,
                                aUserId: obj.aUserId,
                                reservationId: obj.reservationId
,
                            })));
                            setEventsLoaded(true)
                        });
                       
                    } else {
                        throw new Error(
                            "something went wrong loading the Rooms, try again later."
                        );
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
  //end of events
  //events drawer
    const [eventDrawerInfo, setEventDrawerInfo] = useState({
        title: "Title",
        description: "Description",
        start: "",
        end: "",
        room: "Room",
        user: "Name",
        reservationId:"id"

    })
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
    const [eventToAddTime, setEventToAddTime] = useState();
    async function openMonthEvent() {
        setOpenMonthSave(true)
    }
  //slot (chosing time)
    const handleSlotSelect = (event) => {
        const today = moment();
        if (moment(event.start).isBefore(today, 'day')) return;
    document.body.style.overflow = "hidden";
    const newEvent = {
        title: "New Event",
        description: "",
        NumberOfAttendees:0,
      start: moment(event.start).toDate(), // Convert to Date object
      end: moment(event.end).toDate(), // Convert to Date object
      };
      if (currentView == "month") {
          newEvent.end = moment(newEvent.end).subtract("day", 1).toDate();
      } else if((currentView === "week" || currentView === "day") && !moment(newEvent.start).isSame(moment(newEvent.end), 'day')) {
          newEvent.end = moment(newEvent.end).subtract(1, 'day').toDate();
      }
      openMonthEvent();
    setEventToAddTime(newEvent);
  };
  //end
  const minTime = moment().set("hour", 8).set("minute", 0).toDate();
  const maxTime = moment().set("hour", 20).set("minute", 0).toDate();
  const handleViewChange = (view) => {
    setCurrentView(view);
    };
  //for updating events
    const [updatingEvent, setUpdatingEvent] = useState(false);
    const [reservationToUpdate, setReservationToUpdate] = useState("");
  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={eventss}
        startAccessor="start"
        endAccessor="end"
        step={15}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]} // Use allViews here
        defaultDate={new Date()}
        tooltipAccessor="description"
        //min={minTime}
        //max={maxTime}
              onSelectEvent={(event) => {
            setEventDrawerInfo({
                title: event.title,
                description: event.description,
                room: event.roomId,
                user: event.aUserId,
                start: event.start,
                end: event.end,
                reservationId: event.reservationId,

            })
                  setReservationToUpdate(event.reservationId);
          setEventAncorState({ right: true });
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
              <EventsAnchor userId={user.id} userRole={user.role} updatingEvent={updatingEvent} setUpdatingEvent={setUpdatingEvent} setEventTime={setEventToAddTime} eventTime={eventToAddTime} user={user} state={EventAncorState} setState={setEventAncorState} info={eventDrawerInfo} updateState={openMonthSave} setUpdateState={setOpenMonthSave} />
      </Drawer>
          {openMonthSave && roomsLoaded && eventsLoaded ? (
              <SaveMonthEvent reservationToUpdate={reservationToUpdate} setReservationToUpdate={setReservationToUpdate} updatingEvent={updatingEvent} setUpdatingEvent={setUpdatingEvent}  view={currentView} events={eventss} setEvents={setEventss} rooms={rooms} user={user} state={openMonthSave} setState={setOpenMonthSave} setEventTime={setEventToAddTime} eventTime={eventToAddTime} />
      ) : (
        ""
      )}
    </div>
  );
}

export default CalendarView;
