import React, { useState } from "react";
import cities from "./data/cities.json";
import countries from "./data/countries.json";
import region from "./data/region.json";
import {
  Input,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Alert,
} from "@mui/material/";

function PersonalDetails({ state, setState, errorInfo, setErrorInfo }) {
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
          {errorInfo.detailsError !== "" && (
            <Alert severity='error'>{errorInfo.detailsError}</Alert>
          )}
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
            <Select
              onChange={(e) => setState({ ...state, sex: e.target.value })}>
              <MenuItem value='Mężczyzna'>Mężczyzna</MenuItem>
              <MenuItem value='Kobieta'>Kobieta</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={citiesInPoland}
            renderInput={(params) => (
              <TextField {...params} label='Miasto' variant='standard' />
            )}
            getOptionLabel={(option) => option.city}
            value={selectedCity}
            onChange={(e, newCity) => {
              setSelectedCity(newCity);
              setState({ ...state, city: newCity.city });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={allRegions}
            renderInput={(params) => (
              <TextField {...params} label='Województwo' variant='standard' />
            )}
            getOptionLabel={(option) => option.name}
            value={selectedRegion}
            onChange={(e, newRegion) => {
              setSelectedRegion(newRegion);
              setState({ ...state, region: newRegion.name });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={allCountries}
            renderInput={(params) => (
              <TextField {...params} label='Narodowość' variant='standard' />
            )}
            getOptionLabel={(option) => option.name}
            value={selectedCountry}
            onChange={(e, newCountry) => {
              setSelectedCountry(newCountry);
              setState({ ...state, country: newCountry.name });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <label>
            <Input
              onChange={(event) => {
                setState({ ...state, image: event.target.files[0] });
                setAlertOpen(true);
              }}
              accept='image/png, image/jpeg"'
              multiple
              type='file'
              sx={{ display: "none" }}
            />
            <Button fullWidth variant='contained' component='span'>
              Upload your photo
            </Button>
          </label>
          {alertOpen && (
            <Alert
              onClose={() => {
                setAlertOpen(false);
              }}
              severity={"success"}>
              Zdjęcie załadowane pomyślnie.
            </Alert>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default PersonalDetails;
