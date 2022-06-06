import { useState, useEffect, useRef } from "react";
import { Button, MenuItem, Autocomplete, Grid, TextField, InputAdornment } from "@mui/material/";
import cities from "../../../../data/cities.json";

function LessonForm({ defaultValue, state, setState, func1, func2, buttonText1, buttonText2, allSubjects }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const citiesInPoland = cities;
  const levels = [
    {
      value: "Primary",
    },
    {
      value: "High School",
    },
    {
      value: "University",
    },
  ];

  const notInitialRender = useRef(false);
  useEffect(() => {
    if (notInitialRender.current) {
      setDisabled(false);
    } else {
      notInitialRender.current = true;
    }
  }, [state]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Tytuł'
          variant='outlined'
          defaultValue={defaultValue.title}
          onChange={(e) => {
            setState({ ...state, title: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          options={citiesInPoland}
          renderInput={(params) => <TextField {...params} label='Miasto' variant='outlined' />}
          defaultValue={state.city === "" ? selectedCity : state.city}
          getOptionLabel={(option) => option.city || state.city}
          onChange={(e, newCity) => {
            setSelectedCity(newCity);
            setState({ ...state, city: newCity.city });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='Opis'
          fullWidth
          defaultValue={defaultValue.description}
          multiline
          onChange={(e) => {
            setState({ ...state, description: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label='Cena'
          variant='outlined'
          defaultValue={defaultValue.price}
          InputProps={{
            endAdornment: <InputAdornment position='end'>zł</InputAdornment>,
          }}
          onChange={(e) => {
            setState({ ...state, price: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          defaultValue={state.subject === "" ? selectedSubject : state.subject}
          options={allSubjects.map((subject) => subject.name)}
          renderInput={(params) => <TextField {...params} label='Przedmiot' />}
          onChange={(e, newSubject) => {
            setState({ ...state, subject: newSubject });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          select
          label='Poziom'
          defaultValue={defaultValue.level}
          onChange={(e) => {
            setState({ ...state, level: e.target.value });
          }}>
          {levels.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={4}>
        <Button disabled={disabled} onClick={func1} fullWidth variant='contained' sx={{ height: "91%" }}>
          {buttonText1}
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={2}>
        <Button color='warning' onClick={func2} fullWidth variant='contained' sx={{ height: "91%" }}>
          {buttonText2}
        </Button>
      </Grid>
    </Grid>
  );
}

export default LessonForm;
