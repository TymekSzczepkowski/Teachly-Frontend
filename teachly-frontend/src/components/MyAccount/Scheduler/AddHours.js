import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";

import TimePicker from "./Utils/TimePicker";
import axios from "axios";
import { DialogActions, DialogContent, DialogTitle, Alert, TextField, Grid, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material/";
function AddHours({ date, setOpen, windowReload, displayedDate }) {
  const [auth, setAuth] = useAuth([]);
  const [isRegular, setIsRegular] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [startValue, setStartValue] = useState();
  const [endValue, setEndValue] = useState();
  const regularDate = date.getDay(); //regular
  const customDate = date.toLocaleDateString("sv-SE"); //custom
  let requestCustom = {
    date: customDate,
    start: startValue,
    end: endValue,
  };
  let requestRegular = {
    weekday: regularDate,
    start: startValue,
    end: endValue,
  };
  const submit = () => {
    isRegular
      ? axios
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
          })
      : axios
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

  return (
    <>
      <DialogTitle>Dodaj nowe godziny dostępności na {displayedDate}</DialogTitle>
      <DialogContent>
        {isSuccess && <Alert severity='success'>Godzina dostępności dodana pomyślnie</Alert>}
        <Grid container spacing={2} sx={{ p: 2 }}>
          <React.Fragment>
            <Grid item xs={12} sm={6}>
              <TimePicker text={"Godzina rozpoczęcia"} setValue={setStartValue} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimePicker text={"Godzina zakończenia"} setValue={setEndValue} />
            </Grid>
          </React.Fragment>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isRegular}
                    onChange={() => {
                      setIsRegular(!isRegular);
                    }}
                  />
                }
                label='Powtarzaj co tydzień'
              />
            </FormGroup>
          </Grid>
        </Grid>
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
            submit();
          }}
          variant='contained'>
          Zatwierdź
        </Button>
      </DialogActions>
    </>
  );
}

export default AddHours;
