import React from "react";
import { Link } from "react-router-dom";
import { Box, List, Divider, ListItem, ListItemText, ListItemIcon, Switch } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Brightness4Icon from "@mui/icons-material/Brightness4";
function LeftDrawer(auth, colorMode, toggleDrawer, handleColorModeChange) {
  return (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary='Znajdź korepetytora' />
        </ListItem>
      </List>
      <List>
        <ListItem button>
          <ListItemIcon>
            <HistoryEduIcon />
          </ListItemIcon>
          <ListItemText primary='Zostań korepetytorem' />
        </ListItem>
      </List>
      <List>
        <ListItem button>
          <ListItemIcon>
            <LiveHelpIcon />
          </ListItemIcon>
          <ListItemText primary='Jak to działa' />
        </ListItem>
      </List>
      {!auth && (
        <>
          <List>
            <ListItem component={Link} to={"/register"} button>
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText primary='Zarejestruj się' />
            </ListItem>
          </List>
          <List>
            <ListItem component={Link} to={"/login"} button>
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText primary='Zaloguj się' />
            </ListItem>
          </List>
          <Divider />
        </>
      )}
      <List>
        <ListItem>
          <ListItemIcon>{colorMode ? <BrightnessHighIcon /> : <Brightness4Icon />}</ListItemIcon>
          <ListItemText primary={!colorMode ? "Light mode" : "Dark mode"} />
          <Switch edge='end' checked={colorMode} onChange={handleColorModeChange} />
        </ListItem>
      </List>
    </Box>
  );
}

export default LeftDrawer;
