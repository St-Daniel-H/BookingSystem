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
import Box from "@mui/material/Box";

export default function EventsAnchor({ state, setState, info, updateState, setUpdateState, setEventTime, updatingEvent, setUpdatingEvent }) {
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
    const [userName, setUserName] = useState("");
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
                    setUserName(user.firstName + " " + user.lastName);
                });
            });
        } catch (error) {
            console.log(error.message);
            handleSnackBar(error.message);
        }
    }
    const [roomName, setRoomName] = useState("");
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
            });
        } catch (error) {
            console.log(error.message);
            handleSnackBar(error.message);
        }
    }
    useEffect(() => {
        getUserById();
        getRoomById();
    })
    //update POPUP
    function popupUpdate() {
        setUpdatingEvent(true);
        setEventTime(info);
        setUpdateState(true);
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
          <Divider />
          <List>
              <ListItem id="updateDelete">
                  <div id="updateDeleteContainer">
                      <button id="updateButton" onClick={popupUpdate}><b>Update</b></button>
                      <button id="deleteButton"><b>Delete</b></button>
                  </div>

              </ListItem>
          </List>
      <Divider />
      <List>
        <ListItem id="reservedBy">
                  <ListItemText>Reserved By {userName}</ListItemText>
        </ListItem>
      </List>
    </Box>
  );
  const anchor = "right";
  return <div>{list(anchor)}</div>;
}
