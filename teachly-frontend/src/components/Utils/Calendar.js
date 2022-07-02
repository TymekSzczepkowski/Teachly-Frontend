import { useState, useEffect, useContext } from "react";
import moment from "moment";
import "moment/locale/pl";
import { TextField, Badge } from "@mui/material/";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import plLocale from "date-fns/locale/pl";
import SchoolIcon from "@mui/icons-material/School";
import authContext from "../../context/authContext";
import useAuth from "../../hooks/useAuth";

function Calendar({ highlightedDays, setHighlightedDays, date, setDate, displayedDate, setDisplayedDate, daysWithFreeHours, setDaysWithFreeHours, setDateWithFreeHours }) {
  const [auth, setAuth] = useAuth();
  const { userDetails } = useContext(authContext);
  const allDaysOfTheMonth = [];
  const [requestDate, setRequestDate] = useState(date.toLocaleDateString("sv-SE").toString());

  const handleMonthChange = () => {
    setHighlightedDays([]);
    setDaysWithFreeHours([]);
  };

  const fetchHighlightedDays = () => {
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

  useEffect(() => {
    fetchHighlightedDays();
  }, [requestDate, userDetails]);

  return (
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
        displayStaticWrapperAs='desktop'
        value={displayedDate}
        onChange={(newValue) => {
          setDate(newValue);
          setDisplayedDate(moment(newValue).locale("pl").format("LL"));
          setRequestDate(newValue.toLocaleDateString("sv-SE").toString());
          setDateWithFreeHours(daysWithFreeHours.find((day) => day.date === newValue.toLocaleDateString("sv-SE").toString()));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
