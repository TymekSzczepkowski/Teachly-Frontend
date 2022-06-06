import { useState, useEffect, useRef } from "react";
import { Button, MenuItem, Autocomplete, Grid, TextField, InputAdornment } from "@mui/material/";
import cities from "../../../../data/cities.json";

function LessonForm({ value, defaultValue, state, setState, func1, func2, buttonText1, buttonText2, allSubjects }) {
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
          value={state.title === " " ? defaultValue.title : state.title}
          onChange={(e) => {
            setState({ ...state, title: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          options={citiesInPoland}
          renderInput={(params) => <TextField {...params} label='Miasto' variant='outlined' />}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          inputValue={state.city === " " ? defaultValue.city : state.city}
          getOptionLabel={(option) => option.city || state.city}
          onChange={(e, newCity) => {
            setState({ ...state, city: newCity.city });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='Opis'
          fullWidth
          value={state.description === " " ? defaultValue.description : state.description}
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
          value={state.price === " " ? defaultValue.price : state.price}
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
          inputValue={state.subject === " " ? defaultValue.subject.name : state.subject}
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
          value={state.level === " " ? defaultValue.level : state.level}
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
