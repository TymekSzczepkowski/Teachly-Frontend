import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material/";

function Confirmation({ state }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary='Imię i nazwisko'
          secondary={state.firstName + " " + state.lastName}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SchoolIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Typ profilu' secondary={state.profileType} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            {state.gender === "Kobieta" ? (
              <FemaleOutlinedIcon />
            ) : (
              <MaleOutlinedIcon />
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Płeć' secondary={state.gender} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ApartmentOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary='Miejsce zamieszkania'
          secondary={state.region + ", " + state.city}
        />
      </ListItem>
    </List>
  );
}

export default Confirmation;
