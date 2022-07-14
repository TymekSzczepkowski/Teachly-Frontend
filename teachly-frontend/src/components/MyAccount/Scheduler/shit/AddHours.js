import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";

import TimePickers from "../Utils/TimePicker";
import axios from "axios";
import { DialogContentText, DialogActions, DialogContent, DialogTitle, Alert, Grid, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material/";
function AddHours({ type, date, setOpen, windowReload, displayedDate, weekDays }) {
  const [auth, setAuth] = useAuth([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [startValue, setStartValue] = useState(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  const [endValue, setEndValue] = useState(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  const [weekday, setWeekday] = useState();
  // const regularDate = date.getDay(); //regular
  const customDate = date.toLocaleDateString("sv-SE"); //custom
  const dayOffDate = date.toLocaleDateString("sv-SE"); //daysoff

  let requestCustom = {
    date: customDate,
    start: startValue,
    end: endValue,
  };
  let requestRegular = {
    weekday: weekday,
    start: startValue,
    end: endValue,
  };
  let requestDaysOff = {
    date: dayOffDate,
  };

  const addRegularHours = () => {
    axios
      .post(
        process.env.REACT_APP_API_URL + `lessons/regular-working-hours/`,
        { ...requestRegular },
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      )
      .then(() => {
        setIsSuccess(true);
        windowReload(1000);
      });
  };

  const addCustomHours = () => {
    axios
      .post(
        process.env.REACT_APP_API_URL + `lessons/custom-working-hours/`,
        { ...requestCustom },
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      )
      .then(() => {
        setIsSuccess(true);
        windowReload(1000);
      });
  };

  const addDayOff = () => {
    axios
      .post(
        process.env.REACT_APP_API_URL + `lessons/days-off/`,
        { ...requestDaysOff },
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      )
      .then(() => {
        setIsSuccess(true);
        windowReload(1000);
      });
  };

  const addHours = (type) => {
    switch (type) {
      case 0:
        addRegularHours();
        break;
      case 1:
        addCustomHours();
        break;
      case 2:
        addDayOff();
        break;
      default:
        return "error";
    }
  };

  return (
    <>
      <DialogTitle>{`Dodaj ${type === 2 ? " nowy dzień wolny" : "nową godzinę dostępności"} w dniu ${displayedDate}?`}</DialogTitle>
      <DialogContent>
        {type !== 2 && <DialogContentText>Aby dodać nowe godziny dostępności, naciśnij na godzinę rozpoczęcia zajęć oraz zakończenia zajęć, a następnie wybierz odpowiadający Ci czas dostępności.</DialogContentText>}

        {isSuccess && <Alert severity='success'>{` ${type === 2 ? "Nowy dzień wolny dodany" : "Nowa godzina dostępności dodana"} pomyślnie`}</Alert>}
        {type === 2 ? (
          <DialogContentText>Po nacisnięciu przycisku "Zatwierdź", dzień wolny zostanie dodany do kalendarza i nadpisze on aktualne dodane godziny dostępności.</DialogContentText>
        ) : (
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12}>
              {type === 0 && (
                <FormControl fullWidth>
                  <InputLabel>Dzień tygodnia</InputLabel>
                  <Select label='Dzień tygodnia' onChange={(event) => setWeekday(event.target.value)}>
                    {weekDays.map((weekday) => (
                      <MenuItem value={weekday.day}>{weekday.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <React.Fragment>
              <Grid item xs={12} sm={6}>
                <TimePickers text={"Godzina rozpoczęcia"} setValue={setStartValue} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePickers text={"Godzina zakończenia"} setValue={setEndValue} />
              </Grid>
            </React.Fragment>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}>
          Anuluj
        </Button>
        <Button
          onClick={() => {
            addHours(type);
          }}
          variant='contained'>
          Zatwierdź
        </Button>
      </DialogActions>
    </>
  );
}

export default AddHours;
