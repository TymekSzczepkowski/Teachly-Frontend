import React from "react";
import imageUrl from "./data/guy.jpeg";
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
  Grid,
  Card,
  CardMedia,
  CardActionArea,
} from "@mui/material/";

function Confirmation({ state }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
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
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardActionArea>
            <CardMedia
              component='img'
              height='310'
              image={URL.createObjectURL(state.image)}
              alt='guy'
            />
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Confirmation;
