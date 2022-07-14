import { useState, useContext } from "react";
import authContext from "../../context/authContext";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import "moment/locale/pl";
import { Link } from "react-router-dom";
import Calendar from "./Utils/Calendar";
import { Card, Grid, Box, Typography, List, ListItemAvatar, ListItemText, ListItem, Avatar, Divider, Button, ListItemButton } from "@mui/material/";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LoginIcon from "@mui/icons-material/Login";
import Fade from "react-reveal/Fade";

function AvailabilityCalendar() {
  const [auth, setAuth] = useAuth();
  const { userDetails } = useContext(authContext);
  const [date, setDate] = useState(new Date());
  const [displayedDate, setDisplayedDate] = useState(moment(date).locale("pl").format("LL"));
  const [daysWithFreeHours, setDaysWithFreeHours] = useState([]);
  const [dateWithFreeHours, setDateWithFreeHours] = useState();
  const [highlightedDays, setHighlightedDays] = useState([]);
  return (
    <Card sx={{ mb: 4 }}>
      <Grid container>
        <Grid item xs={12}>
          <Calendar
            highlightedDays={highlightedDays}
            setHighlightedDays={setHighlightedDays}
            date={date}
            setDate={setDate}
            displayedDate={displayedDate}
            setDisplayedDate={setDisplayedDate}
            daysWithFreeHours={daysWithFreeHours}
            setDaysWithFreeHours={setDaysWithFreeHours}
            setDateWithFreeHours={setDateWithFreeHours}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider variant='middle' />
          <Box sx={{ p: 2 }}>
            <Typography varinat='h6' sx={{ fontWeight: 500, pl: { xs: 2 } }}>
              {`Plan zajęć na: ${displayedDate !== undefined && displayedDate}`}
            </Typography>
            <List sx={{ width: "100%" }}>
              <>
                {dateWithFreeHours !== undefined ? (
                  dateWithFreeHours.hours.map((hours) => (
                    <Fade bottom key={`${hours.start}key`}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar src={userDetails.avatar} />
                        </ListItemAvatar>
                        <ListItemText primary={`${hours.start} - ${hours.end}`} secondary={`${userDetails.first_name} ${userDetails.last_name}`} />
                        <Button variant='outlined'>Zarezerwuj</Button>
                      </ListItem>
                    </Fade>
                  ))
                ) : (
                  <Fade bottom>
                    <ListItemButton component={Link} to={`/login`}>
                      <ListItemAvatar>
                        <Avatar>{!auth ? <LoginIcon /> : <CalendarMonthIcon />}</Avatar>
                      </ListItemAvatar>
                      {!auth ? <ListItemText primary={`Zaloguj się`} secondary={`Musisz być zalogowany, aby zobaczyć dostępność korepetytora`} /> : <ListItemText primary={`Brak zajęć`} secondary={`Ten nauczciel tego dnia nie prowadzi zajęć`} />}
                    </ListItemButton>
                  </Fade>
                )}
              </>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AvailabilityCalendar;
