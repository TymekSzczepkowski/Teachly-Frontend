import { useState, useEffect, useContext } from "react";
import axios from "axios";
import authContext from "../../context/authContext";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import "moment/locale/pl";
import { Card, TextField, Badge, Grid, Box, Typography, List, ListItemAvatar, ListItemText, ListItemButton, Avatar } from "@mui/material/";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import plLocale from "date-fns/locale/pl";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Fade from "react-reveal/Fade";

function Calendar() {
  const { userDetails } = useContext(authContext);
  const [auth, setAuth] = useAuth();
  const [date, setDate] = useState(moment(new Date()).locale("pl").format("LL"));
  const [daysWithFreeHours, setDaysWithFreeHours] = useState([]);
  const [dateWithFreeHours, setDateWithFreeHours] = useState();
  const [highlightedDays, setHighlightedDays] = useState([]);
  const allDaysOfTheMonth = [];

  const fetchHighlightedDays = () => {
    if (auth)
      axios
        .get(process.env.REACT_APP_API_URL + `lessons/general-working-hours/${userDetails.id}/list/`, {
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
    setDateWithFreeHours([]);
    fetchHighlightedDays();
  };

  useEffect(() => {
    fetchHighlightedDays();
  }, []);
  return (
    <Card>
      <Grid container>
        <Grid item xs={12} sm={6}>
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
              onMonthChange={handleMonthChange}
              disablePast
              views={["day"]}
              displayStaticWrapperAs='desktop'
              value={date}
              onChange={(newValue) => {
                setDate(moment(newValue).locale("pl").format("LL"));
                console.log(daysWithFreeHours);
                setDateWithFreeHours(daysWithFreeHours.find((day) => day.date === newValue.toLocaleDateString("sv-SE").toString()));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ p: 2 }}>
            <Typography varinat='h6' sx={{ fontWeight: 500 }}>
              {`Plan zajęć na: ${date !== undefined && date}`}
            </Typography>

            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
              {dateWithFreeHours !== undefined ? (
                dateWithFreeHours.hours.map((hours) => (
                  <Fade bottom key={`${hours.start}key`}>
                    <ListItemButton alignItems='flex-start'>
                      <ListItemAvatar>
                        <Avatar src={userDetails.avatar} />
                      </ListItemAvatar>
                      <ListItemText primary={`${hours.start} - ${hours.end}`} secondary={`${userDetails.first_name} ${userDetails.last_name}`} />
                    </ListItemButton>
                  </Fade>
                ))
              ) : (
                <ListItemButton alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar>
                      <CalendarMonthIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`Brak zajęć`} secondary={`Ten nauczciel tego dnia nie prowadzi zajęć`} />
                </ListItemButton>
              )}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Calendar;
