import React, { useState } from "react";
import emailVerification from "../../../hooks/Auth/emailVerification";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Stack,
  Button,
  Box,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material/";

function Login() {
  const [showPassword, setShowPassword] = useState(true);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [errorInfo, setErrorInfo] = useState({
    emailError: "",
    passwordError: "",
  });

  const emailVerifier = emailVerification(state, errorInfo, setErrorInfo);

  const passwordVerifier = () => {
    if (state.password === "") {
      setErrorInfo({ ...errorInfo, passwordError: "Proszę wpisać hasło" });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  return (
    <Container maxWidth='sm' sx={{ mb: 4 }}>
      <Paper sx={{ my: { xs: 10, md: 6 }, p: { xs: 3.5, md: 3 } }}>
        <Typography variant='h4' align='center'>
          Zaloguj się
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant='standard'
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
          <Grid item xs={12}>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
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
        </Grid>
        <Stack direction='row' spacing={2} sx={{ my: 4, mb: 1 }}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              passwordVerifier();
              emailVerifier();
            }}
            fullWidth
            variant='contained'>
            Kontynuuj
          </Button>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Link href='/register' variant='body2'>
            Nie masz konta? Zarejestruj się
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
