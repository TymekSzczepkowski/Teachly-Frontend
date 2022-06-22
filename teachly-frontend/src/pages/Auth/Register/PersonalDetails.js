import React, { useState } from "react";
import cities from "../../../data/cities.json";
import countries from "../../../data/countries.json";
import regions from "../../../data/region.json";
import { validateFileTypeUpload, validateFileSizeUpload } from "../../../hooks/Auth/registerVerification";
import { Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Autocomplete, Alert } from "@mui/material/";
import Fade from "react-reveal/Fade";

function PersonalDetails({ state, setState, inputMessage, setInputMessage }) {
  const [alertOpen, setAlertOpen] = useState(false);

  let cityValues = cities.map((e) => e.city);
  let regionValues = regions.map((e) => e.name);
  let countryValues = countries.map((e) => e.name);

  const [inputValue, setInputValue] = useState({ city: state.city, region: " ", country: " " });
  return (
    <Fade>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {inputMessage.detailsMessage !== "" && <Alert severity='error'>{inputMessage.detailsMessage}</Alert>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='firstname-input'
            autoComplete='off'
            fullWidth
            variant='standard'
            label='Imię'
            value={state.firstName}
            onChange={(e) => {
              setState({ ...state, firstName: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='lastname-input'
            autoComplete='off'
            fullWidth
            variant='standard'
            label='Nazwisko'
            value={state.lastName}
            onChange={(e) => {
              setState({ ...state, lastName: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant='standard' fullWidth id='sex-input'>
            <InputLabel>Płeć</InputLabel>
            <Select value={state.sex} onChange={(e) => setState({ ...state, sex: e.target.value })}>
              <MenuItem value='male'>Mężczyzna</MenuItem>
              <MenuItem value='female'>Kobieta</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id='city-input'
            options={cityValues}
            value={state.city}
            renderInput={(params) => <TextField {...params} label='Miasto' variant='standard' />}
            inputValue={inputValue.city}
            onInputChange={(event, newInputValue) => {
              setInputValue({ ...inputValue, city: newInputValue });
            }}
            onChange={(e, newValue) => {
              setState({ ...state, city: newValue });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id='region-input'
            value={state.region}
            options={regionValues}
            renderInput={(params) => <TextField {...params} label='Województwo' variant='standard' />}
            inputValue={inputValue.region}
            onInputChange={(event, newInputValue) => {
              setInputValue({ ...inputValue, region: newInputValue });
            }}
            onChange={(e, newValue) => {
              setState({ ...state, region: newValue });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id='country-input'
            value={state.country}
            options={countryValues}
            renderInput={(params) => <TextField {...params} label='Państwo' variant='standard' />}
            inputValue={inputValue.country}
            onInputChange={(event, newInputValue) => {
              setInputValue({ ...inputValue, country: newInputValue });
            }}
            onChange={(e, newValue) => {
              setState({ ...state, country: newValue });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant='contained' component='label'>
            Upload your photo
            <input
              style={{ display: "none" }}
              id='fileUpload-input'
              onChange={(event) => {
                if (validateFileTypeUpload(event.target.files[0].name) && validateFileSizeUpload(event.target.files[0].size)) {
                  setState({ ...state, image: event.target.files[0] });
                  setInputMessage({ ...inputMessage, imageMessage: "Zdjęcie załadowane pomyślnie." });
                  setAlertOpen(true);
                } else {
                  setAlertOpen(true);
                  setInputMessage({ ...inputMessage, imageMessage: `Nieprawidłowe rozszerzenie pliku lub rozmiar jest zbyt duży` });
                }
              }}
              type='file'
            />
          </Button>
          {alertOpen && (
            <Alert
              onClose={() => {
                setAlertOpen(false);
              }}
              severity={inputMessage.imageMessage === "Zdjęcie załadowane pomyślnie." ? "success" : "warning"}>
              {inputMessage.imageMessage}
            </Alert>
          )}
        </Grid>
      </Grid>
    </Fade>
  );
}

export default PersonalDetails;
