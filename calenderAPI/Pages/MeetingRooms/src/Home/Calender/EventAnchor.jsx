import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function EventsAnchor({ state, setState }) {
  //   const [state, setState] = React.useState({
  //     right: false,
  //   });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemText>
            <h2>Events Detail</h2>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem id="eventTitle">
          <h2>Title</h2>{" "}
        </ListItem>
        <ListItem id="eventRoom">
          <ListItemText>
            <b>Room room123</b>{" "}
          </ListItemText>
        </ListItem>
        <ListItem id="eventTime">
          <ListItemText>
            <b>Date: 10/6/2022</b>{" "}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>From 11:00AM to 2:00pm</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText>Reserved By Daniel</ListItemText>
        </ListItem>
      </List>
    </Box>
  );
  const anchor = "right";
  return <div>{list(anchor)}</div>;
}
