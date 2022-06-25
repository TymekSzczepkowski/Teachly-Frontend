import { useState, useEffect, useContext } from "react";
import axios from "axios";
import authContext from "../../context/authContext";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import "moment/locale/pl";
import { Link } from "react-router-dom";
import { Card, TextField, Badge, Grid, Box, Typography, List, ListItemAvatar, ListItemText, ListItem, Avatar, Divider, Button, ListItemButton } from "@mui/material/";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import plLocale from "date-fns/locale/pl";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LoginIcon from "@mui/icons-material/Login";
import Fade from "react-reveal/Fade";

function Calendar() {
  const [auth, setAuth] = useAuth();
  const { userDetails } = useContext(authContext);
  const [date, setDate] = useState(new Date());
  const [displayedDate, setDisplayedDate] = useState(moment(date).locale("pl").format("LL"));
  const [requestDate, setRequestDate] = useState(date.toLocaleDateString("sv-SE").toString());
  const [daysWithFreeHours, setDaysWithFreeHours] = useState([]);
  const [dateWithFreeHours, setDateWithFreeHours] = useState();
  const [highlightedDays, setHighlightedDays] = useState([]);
  const allDaysOfTheMonth = [];
  const fetchHighlightedDays = () => {
    if (auth)
      axios
        .get(process.env.REACT_APP_API_URL + `lessons/general-working-hours/${userDetails.id}/list/?date=${requestDate}`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((response) => {
          allDaysOfTheMonth.push(...response.data);
          setDaysWithFreeHours(allDaysOfTheMonth.filter((value) => value.hours !== null));
          setHighlightedDays(allDaysOfTheMonth.filter((value) => value.hours !== null).map((a) => parseInt(a.date.substr(8, 2))));
        });
  };

  const handleMonthChange = () => {
    setHighlightedDays([]);
    setDaysWithFreeHours([]);
  };

  useEffect(() => {
    fetchHighlightedDays();
  }, [requestDate]);
  return (
    <Card sx={{ mb: 4 }}>
      <Grid container>
        <Grid item xs={12}>
          <LocalizationProvider adapterLocale={plLocale} dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              renderDay={(day, _value, DayComponentProps) => {
                const isSelected = !DayComponentProps.outsideCurrentMonth && highlightedDays.indexOf(day.getDate()) >= 0;
                return (
                  <Badge key={day.toString()} overlap='circular' badgeContent={isSelected ? <SchoolIcon color='warning' sx={{ fontSize: "15px" }} /> : undefined}>
                    <PickersDay {...DayComponentProps} />
                  </Badge>
                );
              }}
              onMonthChange={(e) => {
                setRequestDate(e.toLocaleDateString("sv-SE").toString());
                handleMonthChange();
              }}
              disablePast
              views={["day"]}
              date={date}
              displayStaticWrapperAs='desktop'
              value={displayedDate}
              onChange={(newValue) => {
                setDate(newValue);
                setDisplayedDate(moment(newValue).locale("pl").format("LL"));
                setRequestDate(newValue.toLocaleDateString("sv-SE").toString());
                console.log(displayedDate);
                setDateWithFreeHours(daysWithFreeHours.find((day) => day.date === newValue.toLocaleDateString("sv-SE").toString()));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Divider variant='middle' />
          <Box sx={{ p: 2 }}>
            <Typography varinat='h6' sx={{ fontWeight: 500, pl: { xs: 2 } }}>
              {`Plan zajęć na: ${displayedDate !== undefined && displayedDate}`}
            </Typography>
            <List sx={{ width: "100%" }}>
              <Fade bottom>
                {dateWithFreeHours !== undefined ? (
                  dateWithFreeHours.hours.map((hours) => (
                    <ListItem key={`${hours.start}key`}>
                      <ListItemAvatar>
                        <Avatar src={userDetails.avatar} />
                      </ListItemAvatar>
                      <ListItemText primary={`${hours.start} - ${hours.end}`} secondary={`${userDetails.first_name} ${userDetails.last_name}`} />
                      <Button variant='outlined'>Zarezerwuj</Button>
                    </ListItem>
                  ))
                ) : (
                  <ListItemButton component={Link} to={`/login`}>
                    <ListItemAvatar>
                      <Avatar>{!auth ? <LoginIcon /> : <CalendarMonthIcon />}</Avatar>
                    </ListItemAvatar>
                    {!auth ? <ListItemText primary={`Zaloguj się`} secondary={`Musisz być zalogowany, aby zobaczyć dostępność korepetytora`} /> : <ListItemText primary={`Brak zajęć`} secondary={`Ten nauczciel tego dnia nie prowadzi zajęć`} />}
                  </ListItemButton>
                )}
              </Fade>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Calendar;
