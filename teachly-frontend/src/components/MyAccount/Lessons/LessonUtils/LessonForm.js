import { useState, useEffect, useRef } from "react";
import { Button, MenuItem, Autocomplete, Grid, TextField, InputAdornment, ToggleButtonGroup, ToggleButton } from "@mui/material/";
import cities from "../../../../data/cities.json";

function LessonForm({ defaultValue, state, setState, func1, func2, buttonText1, buttonText2, allSubjects }) {
  const [disabledAdd, setDisabledAdd] = useState(true);
  const [disabledEdit, setDisabledEdit] = useState(true);
  const [value, setValue] = useState({ city: defaultValue.city, subject: defaultValue.subject.name });
  const [inputValue, setInputValue] = useState({ city: " ", subject: " " });
  const [alignment, setAlignment] = useState(defaultValue.type);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setState({ ...state, type: newAlignment });
  };

  let cityValues = cities.map((e) => e.city);
  let subjectValues = allSubjects.map((e) => e.name);

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
      setDisabledEdit(false);
      if (state.title !== "" && state.city !== "" && state.description !== "" && state.price !== "" && state.subject !== "" && state.level !== "" && state.type !== "") {
        setDisabledAdd(false);
      }
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
          value={value.city}
          onChange={(event, newValue) => {
            setValue({ ...value, city: newValue });
            setState({ ...state, city: newValue });
          }}
          inputValue={inputValue.city}
          onInputChange={(event, newInputValue) => {
            setInputValue({ ...inputValue, city: newInputValue });
          }}
          options={cityValues}
          renderInput={(params) => <TextField {...params} label='Miasto' />}
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
          value={value.subject}
          onChange={(event, newValue) => {
            setValue({ ...value, subject: newValue });
            setState({ ...state, subject: newValue });
          }}
          inputValue={inputValue.subject}
          onInputChange={(event, newInputValue) => {
            setInputValue({ ...inputValue, subject: newInputValue });
          }}
          options={subjectValues}
          renderInput={(params) => <TextField {...params} label='Przedmiot' />}
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
      <Grid item xs={12} sm={12} md={6}>
        <ToggleButtonGroup sx={{ height: "100%" }} fullWidth color='primary' value={alignment} exclusive onChange={handleChange}>
          <ToggleButton value='Remote'>Remote</ToggleButton>
          <ToggleButton value='Hybrid'>Hybrid</ToggleButton>
          <ToggleButton value='Stationary'>stationary</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={12} md={8}>
        <Button disabled={buttonText1 === "Dodaj ogłoszenie" ? disabledAdd : disabledEdit} onClick={func1} fullWidth variant='contained'>
          {buttonText1}
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button color='warning' onClick={func2} fullWidth variant='contained'>
          {buttonText2}
        </Button>
      </Grid>
    </Grid>
  );
}

export default LessonForm;
