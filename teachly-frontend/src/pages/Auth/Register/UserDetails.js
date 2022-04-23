import React from "react";
import {
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
} from "@mui/material/";

function UserDetails({ state, setState }) {
  const [alignment, setAlignment] = React.useState("Uczeń");
  const handleChange = (e, newAlignment) => {
    e.preventDefault();
    setAlignment(newAlignment);
    setState({ ...state, profileType: e.target.value });
  };
  return (
    <div>
      <ToggleButtonGroup
        sx={{ mb: 1.5 }}
        fullWidth
        color='primary'
        exclusive
        onChange={handleChange}
        value={alignment}>
        <ToggleButton value='Uczeń' type='radio' name='profileType'>
          Uczeń
        </ToggleButton>
        <ToggleButton value='Korepetytor' type='radio' name='profileType'>
          Korepetytor
        </ToggleButton>
      </ToggleButtonGroup>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
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
            fullWidth
            variant='standard'
            label='Hasło'
            value={state.password}
            type='password'
            onChange={(e) => {
              setState({ ...state, password: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant='standard'
            label='Powtórz hasło'
            value={state.repeatPassword}
            type='password'
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
