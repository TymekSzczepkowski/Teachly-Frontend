import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { DialogActions, DialogContent, DialogTitle, Alert, TextField, Grid, DialogContentText, Button } from "@mui/material/";

function AddHours({ selectedDate, selectedDateValues, type, date, setOpen, windowReload, displayedDate }) {
  const [auth, setAuth] = useAuth();
  const [timePickerFields, setTimePickerFields] = useState([{ start: "", end: "" }]);
  const [isSuccess, setIsSuccess] = useState(false);
  const customDate = date.toLocaleDateString("sv-SE"); //custom

  const hoursArrayWithoutId = timePickerFields
    .map((element) => {
      if (!Object.values(element).some((val) => val === "")) {
        return { start: element.start, end: element.end };
      }
    })
    .filter((notUndefined) => notUndefined !== undefined);

  let requestCustom = {
    [customDate]: [...hoursArrayWithoutId],
  };
  let requestRegular = {
    [selectedDate]: [...hoursArrayWithoutId],
  };

  const handleChangeInput = (id, event) => {
    const newTimePickerFields = selectedDateValues.map((hours) => {
      if (id === hours.id) {
        hours[event.target.name] = event.target.value + ":00";
      }
      return hours;
    });
    setTimePickerFields(newTimePickerFields);
  };

  const editCustomHours = () => {
    const response = axios
      .put(
        process.env.REACT_APP_API_URL + `lessons/custom-working-hours/update-bulk/`,
        {
          ...requestCustom,
        },
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

  const editRegularHours = () => {
    const response = axios
      .put(
        process.env.REACT_APP_API_URL + `lessons/regular-working-hours/update-bulk/`,
        {
          ...requestRegular,
        },
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

  const editHours = (type) => {
    switch (type) {
      case 0:
        editRegularHours();
        break;
      case 1:
        editCustomHours();
        break;
      default:
        return "error";
    }
  };
  return (
    <>
      <DialogTitle>Edytuj godziny dostępności na {displayedDate}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>Aby zedytować godziny dostępności, naciśnij na godzinę rozpoczęcia zajęć oraz zakończenia zajęć, a następnie wybierz odpowiadający Ci czas dostępności.</DialogContentText>
        {isSuccess && <Alert severity='success'>Godzina dostępności dodana pomyślnie</Alert>}
        <Grid container spacing={2} sx={{ p: 2 }}>
          {selectedDateValues.map((hours) => (
            <React.Fragment key={selectedDateValues.id}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id={hours.id}
                  type='time'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300,
                  }}
                  variant='standard'
                  name='start'
                  fullWidth
                  label={"Godzina rozpoczęcia zajęć"}
                  defaultValue={hours.start}
                  onChange={(event) => {
                    handleChangeInput(event.target.id, event);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id={hours.id}
                  type='time'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300,
                  }}
                  variant='standard'
                  name='end'
                  fullWidth
                  label={"Godzina zakończenia zajęć"}
                  defaultValue={hours.end}
                  onChange={(event) => {
                    handleChangeInput(event.target.id, event);
                  }}
                />
              </Grid>
            </React.Fragment>
          ))}
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
            editHours(type);
          }}
          variant='contained'>
          Zatwierdź
        </Button>
      </DialogActions>
    </>
  );
}

export default AddHours;
