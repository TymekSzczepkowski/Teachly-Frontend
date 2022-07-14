import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/pl";
import DialogComponent from "./Utils/DialogComponent";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import plLocale from "date-fns/locale/pl";
import { TextField, Badge, Grid, Box, Typography, List, ListItemAvatar, ListItemText, ListItem, Avatar, Divider, Button, ListItemButton } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import Fade from "react-reveal/Fade";

function Scheduler({ daysOffDays, userDetails, windowReload, daysToHighlight, customDays, type, weekDays, includeThatWeekDay, regularDays, daysWithRegularHours }) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [date, setDate] = useState(new Date());
  const [displayedDate, setDisplayedDate] = useState(moment(date).locale("pl").format("LL"));
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDateValues, setSelectedDateValues] = useState();
  const [hourID, setHourID] = useState();

  useEffect(() => {
    //find custom
    if (customDays !== undefined) {
      let temp = Object.keys(customDays).find((key) => key === selectedDate);
      setSelectedDateValues(customDays[temp]);
    }
    //find daysoff
    if (daysOffDays !== undefined) {
      let temp2 = daysOffDays.filter((day) => day.date === selectedDate);
      setSelectedDateValues(temp2);
    }
    //find regular
    if (regularDays !== undefined) {
      let temp = Object.keys(regularDays).find((key) => key === selectedDate);
      setSelectedDateValues(regularDays[temp]);
    }
  }, [selectedDate]);
  return (
    <Grid container>
      <Grid item xs={12} sm={12} lg={6}>
        {type === 0 ? (
          <Box>
            <List>
              {weekDays.map((weekday) => (
                <Grid container key={weekday.day}>
                  <Grid item xs={12} sm={9}>
                    <ListItem>
                      <ListItemAvatar>
                        <Badge overlap='circular' anchorOrigin={{ vertical: "bottom", horizontal: "right" }} badgeContent={includeThatWeekDay(daysWithRegularHours, weekday.day) && "🟢"}>
                          <Avatar>{weekday.name.charAt(0)}</Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText primary={weekday.name} secondary={includeThatWeekDay(daysWithRegularHours, weekday.day) ? "Sprawdź dostepność" : "Brak dostępności"} />
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ p: { xs: 1, sm: 2 } }}>
                    {includeThatWeekDay(daysWithRegularHours, weekday.day) && (
                      <Button
                        fullWidth
                        variant='contained'
                        onClick={() => {
                          setSelectedDate(weekday.day.toString());
                        }}>
                        Sprawdź
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider variant='inset' />
                  </Grid>
                </Grid>
              ))}
            </List>
          </Box>
        ) : (
          <LocalizationProvider adapterLocale={plLocale} dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              renderDay={(day, _value, DayComponentProps) => {
                const isSelected = !DayComponentProps.outsideCurrentMonth && daysToHighlight.indexOf(day.getDate()) >= 0;
                return (
                  <Badge key={day.toString()} overlap='circular' badgeContent={isSelected ? <SchoolIcon color={type === 2 ? "error" : "primary"} sx={{ fontSize: "15px" }} /> : undefined}>
                    <PickersDay {...DayComponentProps} />
                  </Badge>
                );
              }}
              date={date}
              onChange={(newValue) => {
                setDate(newValue);
                setDisplayedDate(moment(newValue).locale("pl").format("LL"));
                setSelectedDate(newValue.toLocaleDateString("sv-SE").toString());
              }}
              views={["day"]}
              displayStaticWrapperAs='desktop'
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        )}
      </Grid>
      <Divider sx={{ marginRight: "-1px" }} variant='middle' orientation='vertical' flexItem></Divider>
      <Grid item xs={12} sm={12} lg={6}>
        <Box sx={{ p: 2 }}>
          {selectedDate === undefined ? (
            <Typography varinat='h6' sx={{ fontWeight: 500, pl: { xs: 2 } }}>
              {`Naciśnij dzień w kalendarzu, aby wybrać dzień`}
            </Typography>
          ) : (
            <>
              <Typography varinat='h6' sx={{ fontWeight: 500, pl: { xs: 2 } }}>
                {`Plan zajęć na: ${displayedDate !== undefined && displayedDate}`}
              </Typography>
            </>
          )}
          <List sx={{ width: "100%" }}>
            <>
              {selectedDateValues !== undefined &&
                selectedDateValues.map((hours) => (
                  <Fade key={`${hours.start}key`}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar src={userDetails.avatar} />
                          </ListItemAvatar>
                          {type === 1 || type === 0 ? (
                            <ListItemText primary={`${hours.start.substr(0, 5)} - ${hours.end.substr(0, 5)}`} secondary={`${userDetails.first_name} ${userDetails.last_name}`} />
                          ) : (
                            <ListItemText primary={`Ten dzień jest dniem wolnym`} />
                          )}
                          <Button
                            sx={{ width: "110px" }}
                            variant='outlined'
                            onClick={() => {
                              setOpen(true);
                              setAction("delete");
                              setHourID(hours.id);
                            }}
                            startIcon={<DeleteIcon />}>
                            Usuń
                          </Button>
                        </ListItem>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider variant='inset' />
                      </Grid>
                    </Grid>
                  </Fade>
                ))}
            </>
            {selectedDateValues && type !== 2 && (
              <ListItemButton>
                <ListItemText primary={`Edytuj godziny dostępność`} />
                <Button
                  sx={{ width: "110px" }}
                  variant='outlined'
                  onClick={() => {
                    setOpen(true);
                    setAction("edit");
                  }}
                  startIcon={<EditIcon />}>
                  Edytuj
                </Button>
              </ListItemButton>
            )}
            <ListItemButton>
              {type !== 2 ? <ListItemText primary={`Dodaj godzinową dostępność`} secondary={"Dodaj dostępność tego dnia"} /> : <ListItemText primary={`Dodaj dzień wolny`} secondary={"Dodaj dzień wolny tego dnia"} />}
              <Button
                sx={{ width: "110px" }}
                disabled={selectedDate === undefined && type !== 0 ? true : false}
                variant='contained'
                onClick={() => {
                  setOpen(true);
                  setAction("add");
                }}
                startIcon={<AddIcon />}>
                Dodaj
              </Button>
            </ListItemButton>
          </List>
          <DialogComponent
            selectedDate={selectedDate}
            weekDays={weekDays}
            selectedDateValues={selectedDateValues}
            hourID={hourID}
            type={type}
            date={date}
            displayedDate={displayedDate}
            open={open}
            setOpen={setOpen}
            action={action}
            windowReload={windowReload}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Scheduler;
