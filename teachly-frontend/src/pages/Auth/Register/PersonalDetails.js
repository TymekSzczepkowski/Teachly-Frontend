import React, { useState } from "react";
import cities from "./data/cities.json";
import countries from "./data/countries.json";
import region from "./data/region.json";
import { validateFileTypeUpload, validateFileSizeUpload } from "../../../hooks/Auth/registerVerification";
import { Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Autocomplete, Alert } from "@mui/material/";

function PersonalDetails({ state, setState, inputMessage, setInputMessage }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const citiesInPoland = cities;
  const allCountries = countries;
  const allRegions = region;
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {inputMessage.detailsMessage !== "" && <Alert severity='error'>{inputMessage.detailsMessage}</Alert>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
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
          <FormControl variant='standard' fullWidth>
            <InputLabel>Płeć</InputLabel>
            <Select data-testid='sex-input' value={state.sex} onChange={(e) => setState({ ...state, sex: e.target.value })}>
              <MenuItem value='male'>Mężczyzna</MenuItem>
              <MenuItem value='female'>Kobieta</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={citiesInPoland}
            renderInput={(params) => <TextField {...params} label='Miasto' variant='standard' />}
            defaultValue={state.city === "" ? selectedCity : state.city}
            getOptionLabel={(option) => option.city || state.city}
            onChange={(e, newCity) => {
              setSelectedCity(newCity);
              setState({ ...state, city: newCity.city });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={allRegions}
            renderInput={(params) => <TextField {...params} label='Województwo' variant='standard' />}
            defaultValue={state.region === "" ? selectedRegion : state.region}
            getOptionLabel={(option) => option.name || state.region}
            onChange={(e, newRegion) => {
              setSelectedRegion(newRegion);
              setState({ ...state, region: newRegion.name });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={allCountries}
            renderInput={(params) => <TextField {...params} label='Narodowość' variant='standard' />}
            defaultValue={state.country === "" ? selectedCountry : state.country}
            getOptionLabel={(option) => option.name || state.country}
            onChange={(e, newCountry) => {
              setSelectedCountry(newCountry);
              setState({ ...state, country: newCountry.name });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <label>
            <input
              data-testid='upload-file'
              style={{ display: "none" }}
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
            <Button fullWidth variant='contained' component='span' name='upload'>
              Upload your photo
            </Button>
          </label>
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
    </div>
  );
}

export default PersonalDetails;
