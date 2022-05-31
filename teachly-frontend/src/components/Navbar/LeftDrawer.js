import React from "react";
import { Link } from "react-router-dom";
import { Box, List, Divider, ListItem, ListItemText, ListItemIcon, Switch } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";

function LeftDrawer(auth, toggleDrawer) {
  return (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem component={Link} to={"/"} button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Strona głowna' />
        </ListItem>
      </List>
      {!auth && (
        <>
          <List>
            <ListItem component={Link} to={"/login"} button>
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText primary='Zaloguj się' />
            </ListItem>
          </List>
          <List>
            <ListItem component={Link} to={"/register"} button>
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText primary='Zarejestruj się' />
            </ListItem>
          </List>
          <Divider />
        </>
      )}
    </Box>
  );
}

export default LeftDrawer;
