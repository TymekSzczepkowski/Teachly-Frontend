import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField, ToggleButtonGroup, ToggleButton, Grid, IconButton, InputAdornment, Alert } from "@mui/material/";

function UserDetails({ state, setState, alignment, setAlignment, inputMessage, setInputMessage }) {
  const [showPassword, setShowPassword] = useState(true);

  const handleChange = (e, newAlignment) => {
    e.preventDefault();
    setAlignment(newAlignment);
    setState({ ...state, profileType: e.target.value });
    setInputMessage({
      ...inputMessage,
      profileTypeMessage: "",
    });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <ToggleButtonGroup sx={{ mb: 1.5 }} fullWidth color='primary' exclusive onChange={handleChange} value={alignment}>
        <ToggleButton value='Student' type='radio' name='profileType'>
          Uczeń
        </ToggleButton>
        <ToggleButton value='Teacher' type='radio' name='profileType'>
          Korepetytor
        </ToggleButton>
      </ToggleButtonGroup>
      {inputMessage.profileTypeMessage !== "" && <Alert severity='error'>{inputMessage.profileTypeMessage}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id='email-input'
            autoComplete='off'
            error={inputMessage.emailMessage === "" ? false : true}
            helperText={inputMessage.emailMessage}
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
            id='password-input'
            error={inputMessage.passwordMessage === "" ? false : true}
            helperText={inputMessage.passwordMessage}
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
                  <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            id='repassword-input'
            error={inputMessage.repeatPasswordMessage === "" ? false : true}
            helperText={inputMessage.repeatPasswordMessage}
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
    </>
  );
}

export default UserDetails;
