import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField, ToggleButtonGroup, ToggleButton, Grid, IconButton, InputAdornment, Alert } from "@mui/material/";

function UserDetails({ state, setState, alignment, setAlignment, errorInfo, setErrorInfo }) {
  const [showPassword, setShowPassword] = useState(true);

  const handleChange = (e, newAlignment) => {
    e.preventDefault();
    setAlignment(newAlignment);
    setState({ ...state, profileType: e.target.value });
    setErrorInfo({
      ...errorInfo,
      profileTypeError: "",
    });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <ToggleButtonGroup sx={{ mb: 1.5 }} fullWidth color='primary' exclusive onChange={handleChange} value={alignment}>
        <ToggleButton value='Uczeń' type='radio' name='profileType'>
          Uczeń
        </ToggleButton>
        <ToggleButton value='Korepetytor' type='radio' name='profileType'>
          Korepetytor
        </ToggleButton>
      </ToggleButtonGroup>
      {errorInfo.profileTypeError !== "" && <Alert severity='error'>{errorInfo.profileTypeError}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            error={errorInfo.emailError === "" ? false : true}
            helperText={errorInfo.emailError}
            fullWidth
            variant='standard'
            label='E-mail'
            value={state.email}
            onChange={(e) => {
              setState({ ...state, email: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errorInfo.passwordError === "" ? false : true}
            helperText={errorInfo.passwordError}
            fullWidth
            variant='standard'
            label='Hasło'
            value={state.password}
            type={showPassword ? "password" : "text"}
            onChange={(e) => {
              setState({ ...state, password: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  {" "}
                  <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errorInfo.repeatPasswordError === "" ? false : true}
            helperText={errorInfo.repeatPasswordError}
            fullWidth
            variant='standard'
            label='Powtórz hasło'
            value={state.repeatPassword}
            type={showPassword ? "password" : "text"}
            onChange={(e) => {
              setState({ ...state, repeatPassword: e.target.value });
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default UserDetails;
