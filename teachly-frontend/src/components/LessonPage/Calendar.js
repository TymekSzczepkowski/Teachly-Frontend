import { useState, useEffect, useContext } from "react";
import axios from "axios";
import authContext from "../../context/authContext";
import useAuth from "../../hooks/useAuth";
import { Card, TextField, Badge, Grid, Box, Typography } from "@mui/material/";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import plLocale from "date-fns/locale/pl";
import SchoolIcon from "@mui/icons-material/School";

const API_URL = process.env.REACT_APP_API_URL;

function Calendar() {
  const { userDetails } = useContext(authContext);
  const [auth, setAuth] = useAuth();
  const [date, setDate] = useState();
  const [highlightedDays, setHighlightedDays] = useState([]);

  const tab = [];

  const fetchHighlightedDays = () => {
    if (auth)
      axios
        .get(API_URL + `lessons/general-working-hours/${userDetails.id}/list/`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((response) => {
          tab.push(...response.data);
          const tab2 = tab.filter((value) => value.hours !== null).map((a) => parseInt(a.date.substr(8, 2)));
          setHighlightedDays(tab2);
        });
  };

  const handleMonthChange = () => {
    setHighlightedDays([]);
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
                setDate(newValue.toLocaleString("en-US"));
                console.log(date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ p: 2 }}>
            <Typography varinat='h6' sx={{ fontWeight: 500 }}>
              Plan zajęć na: 
              {date !== undefined && date}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Calendar;
