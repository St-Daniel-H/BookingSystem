/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";
import {useState,useEffect } from "react"
import APIs from "../../Backend/backend";
import { useSnackbar } from "notistack";
import "./EventAnchor.scss"
import "../../scss/deleteUpdateButton.scss"
import Box from "@mui/material/Box";

export default function EventsAnchor({ userId, userRole, state, setState, info, updateState, setUpdateState, setEventTime, updatingEvent, setUpdatingEvent,
    setDeleteEvent, deleteEvent, setDeletePopup, deletePopup

}) {
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
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
  };
  //ger user name and room name
    const [reservedByInfo, setReservedByInfo] = useState({
        userName: "Loading",
        role: "Employee",
        Id:"0",
    })
    const [userName, setUserName] = useState("");
    const [userLoaded,setUserLooded] = useState(false)
    async function getUserById() {
        try {
            const userId = info.user;

            const apiUrl = `${APIs.apiLink}/api/auth/users/${userId}`;
            const res = await fetch(apiUrl).then((response) => {
                if (!response.ok) {
                    handleSnackBar("Network response was not ok");
                    throw new Error("Network response was not ok");
                }
                response.json().then((user) => {
                    setReservedByInfo({
                        userName: user.firstName + " " + user.lastName,
                        role: user.role,
                        Id: user.Id,
                    });
                });
                setUserLooded(true);
            });
        } catch (error) {
            setUserLooded(true);
            console.log(error.message);
            handleSnackBar(error.message);
        }
    }
    const [roomName, setRoomName] = useState("");
    const [roomLoaded, setRoomLoaded] = useState(false);
    async function getRoomById() {
        try {
            const roomId = info.room;

            const apiUrl = `${APIs.apiLink}/api/Room/${roomId}`;
            const res = await fetch(apiUrl).then((response) => {
                if (!response.ok) {
                    handleSnackBar("Network response was not ok");
                    throw new Error("Network response was not ok");
                }
                response.json().then((user) => {
                    setRoomName(user.name);
                });
                setRoomLoaded(true);
            });
        } catch (error) {
            console.log(error.message);
            handleSnackBar(error.message);
            setRoomLoaded(true);

        }
    }
    useEffect(() => {
        if(!userLoaded )
            getUserById();
        if(!roomLoaded)
        getRoomById();
    })
    //update POPUP
    function popupUpdate() {
        setUpdatingEvent(true);
        setEventTime(info);
        setUpdateState(true);
    }
    //delete popup

    function popupDelete(eventId) {
        document.body.style.overflow = "hidden";
        setDeleteEvent(eventId)
        setDeletePopup(true);
    }
  const list = (anchor) => (
      <Box
      id="eventDetails"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem id="events">
          <ListItemText>
            <h2>Events Detail</h2>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem id="eventTitle">
                  <h2>{info.title}</h2>{" "}
              </ListItem>
              <ListItem id="eventDescription">
                  <b>{info.description}</b>{" "}
              </ListItem>
              <Divider />
        <ListItem id="eventRoom">
          <ListItemText>
                      <b>Room: {roomName}</b>{" "}
          </ListItemText>
        </ListItem>
        <ListItem id="eventTime">
          <ListItemText>
                      <b>{moment(info.start).format("DD/MM/YYYY")}</b>{" "}
                  </ListItemText>
                  <ListItemText>
                      <b>- {moment(info.end).format("DD/MM/YYYY")}</b>{" "}
                  </ListItemText>
         </ListItem>
          <ListItem>
                  <ListItemText>
                      <b> {moment(info.start).format("h:mm a")}</b>{" "}
                  </ListItemText>
                  <ListItemText>
                      <b>- {moment(info.end).format("h:mm a")}</b>{" "}
                  </ListItemText>
        </ListItem>
        
          </List>
          {userRole == "Admin" || userRole == "Owner" || reservedByInfo.id == userId   ? 
              <List>
                  <ListItem id="updateDelete">
                      <div id="updateDeleteContainer">
                          <button id="updateButton" onClick={popupUpdate}><b>Update</b></button>
                          <button id="deleteButton" onClick={()=>popupDelete(info.reservationId)}><b>Delete</b></button>
                      </div>

                  </ListItem>
              </List>
          : ""}
          <Divider />
         
      <Divider />
      <List>
        <ListItem id="reservedBy">
                  <ListItemText>Reserved By {reservedByInfo.userName}</ListItemText>
        </ListItem>
          </List>
         
    </Box>
  );
  const anchor = "right";
  return <div>{list(anchor)}</div>;
}
