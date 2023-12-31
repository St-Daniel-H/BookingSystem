/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ManageRooms from "../ManageRooms/ManageRooms";
import ManageReservation from "../ManageReservation/ManageReservation";
import ManageEmployees from "../ManageEmployees/ManageEmployees";
import CalenderView from "../Calender/Calender";
import Profile from "../Profile/Profile";

import "./SideBar.scss";
import { useSnackbar } from "notistack";
import noLogo from "../../Images/defLogo.jpg";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

const drawerWidth = 240;

function SideBar(props) {
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
  const userData = props.user;
  const companyData = props.company;
  console.log(companyData.logo);
  const { window2 } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const href = window.location.href;
  function componentToRender() {
    const arr = href.split("/");
    switch (arr[4]) {
      case "Calender":
        return <CalenderView user={userData} />;
      case "Employees":
        return <ManageEmployees user={userData} />;
      case "Rooms":
        return <ManageRooms user={userData} />;
      case "Reservation":
            return <ManageReservation user={userData} />;
        case "Profile":
            return <Profile company={companyData}  user={userData} />;
    }
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [image, setImage] = useState(
    `../../../public/Uploads/${companyData.logo}`
  );
  console.log(image);
  //async function setImage2() {
  //    let logo;
  //    await import(`../../../../../${companyData.logo}`).then((module) => {
  //        logo = module.default;
  //    });
  //    console.log(logo)
  //    return "../../../../../"+companyData.logo;
  //}
  //const logo = setImage2();
  const drawer = (
    <div className="drawer">
      <div id="header">
        <div id="drawerImgContainer">
          {companyData.logo ? (
            <img src={image}></img>
          ) : (
            <img src={noLogo}></img>
          )}
        </div>
        <br />
        <div>
          <h2>{companyData.name}</h2>
        </div>
      </div>
      <Toolbar />
      <Divider />
      <List>
        {/*{["Rooms", "Calender", "Employees"]*/}
            <ListItem  disablePadding className="links">
              <ListItemButton href={`/Home/Rooms`}>
                <ListItemIcon>
                   <InboxIcon /> 
                </ListItemIcon>
                <ListItemText primary="Rooms" />
              </ListItemButton>
              </ListItem>
              <ListItem  disablePadding className="links">
                  <ListItemButton href={`/Home/Employees`}>
                      <ListItemIcon>
                         <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Employees" />
                  </ListItemButton>
              </ListItem>
              <ListItem disablePadding className="links">
                  <ListItemButton href={`/Home/Calender`}>
                      <ListItemIcon>
                          <MailIcon />
                      </ListItemIcon>
                      <ListItemText primary="Calendar" />
                  </ListItemButton>
              </ListItem>
              <ListItem disablePadding className="links">
                  <ListItemButton href={`/Home/Profile`}>
                      <ListItemIcon>
                          <MailIcon />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                  </ListItemButton>
              </ListItem>
      </List>
      <div id="signout">
        <Divider />
        <ListItem disablePadding className="links">
                  <ListItemButton onClick={() => {
                      localStorage.clear();
                  }} href="../Login">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="signout" />
          </ListItemButton>
        </ListItem>
      </div>
      {/* <Divider /> */}
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container =
    window2 !== undefined ? () => window2().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <h2>Meeting Rooms</h2>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Typography component="span">{componentToRender()}</Typography>
        {/* <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Box>
    </Box>
  );
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window2: PropTypes.func,
};

export default SideBar;

// function SideBar() {
//   return <div className="Sidebar"></div>;
// }
// export default SideBar;
