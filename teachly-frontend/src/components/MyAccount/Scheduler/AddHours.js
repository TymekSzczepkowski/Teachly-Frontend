import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Alert, TextField, Grid, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { v4 as uuidv4 } from "uuid";

function AddHours({ date, setOpen, windowReload }) {
  const [auth, setAuth] = useAuth();
  const [timePickerFields, setTimePickerFields] = useState([{ id: uuidv4(), start: "", end: "" }]);
  const [isRegular, setIsRegular] = useState(false);
  const regularDate = date.getDay(); //regular
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
    [regularDate]: [...hoursArrayWithoutId],
  };

  const handleChangeInput = (id, event) => {
    const newTimePickerFields = timePickerFields.map((item) => {
      if (id === item.id) {
        item[event.target.name] = event.target.value + ":00";
      }

      return item;
    });
    setTimePickerFields(newTimePickerFields);
  };

  const handleAddFields = () => {
    setTimePickerFields([...timePickerFields, { id: uuidv4(), start: "", end: "" }]);
  };
  const handleRemoveFields = (id) => {
    const values = [...timePickerFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setTimePickerFields(values);
  };

  const submit = async (e) => {
    if (isRegular) {
      try {
        const response = await axios
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
            windowReload(1000);
            console.log(response);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await axios
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
            // windowReload(1000);
            console.log(response);
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      {timePickerFields.map((timePickerField) => (
        <React.Fragment key={timePickerField.id}>
          <Grid item xs={12} sm={5}>
            <TextField
              id='timer'
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
              value={timePickerField.start}
              onChange={(event) => {
                handleChangeInput(timePickerField.id, event);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              id='second_timer'
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
              value={timePickerField.end}
              onChange={(event) => handleChangeInput(timePickerField.id, event)}
            />
          </Grid>
        </React.Fragment>
      ))}

      <Grid item xs={6} sm={1} sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <Button
          onClick={() => {
            handleRemoveFields();
          }}
          fullWidth>
          <RemoveIcon />
        </Button>
      </Grid>
      <Grid item xs={6} sm={1} sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <Button
          onClick={() => {
            handleAddFields();
          }}
          fullWidth>
          <AddIcon />
        </Button>
      </Grid>
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
      <Grid item xs={6}>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          fullWidth>
          Anuluj
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          onClick={() => {
            submit();
          }}
          variant='contained'
          fullWidth>
          Zatwierdź
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddHours;
