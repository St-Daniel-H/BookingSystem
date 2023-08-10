export default function list(anchor) {
  return (
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
          <ListItemText>
            <l>From 11:00AM to 2:00pm</l>
          </ListItemText>
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
}
