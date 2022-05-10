import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import { validateEmail } from "../../../hooks/Auth/emailVerification";
import { validatePassword } from "../../../hooks/Auth/passwordVerification";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Container, Paper, Typography, Grid, TextField, Stack, Button, Box, IconButton, InputAdornment, Link as LinkUI } from "@mui/material/";

const API_URL = process.env.REACT_APP_API_URL;
function Login() {
  const [auth, setAuth] = useAuth();
  const [showPassword, setShowPassword] = useState(true);
  const [click, setClick] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [inputMessage, setInputMessage] = useState({
    emailMessage: "",
    passwordMessage: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    setClick(true);
    try {
      const response = await axios.post(API_URL + `accounts/jwt/create/`, {
        email: state.email,
        password: state.password,
      });
      setAuth({
        refresh: response.data.refresh,
        access: response.data.access,
      });
      console.log(response)
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    if (click) {
      setInputMessage({
        ...inputMessage,
        passwordMessage: validatePassword(state.password),
        emailMessage: validateEmail(state.email),
      });
    }
  }, [click, state]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  return (
    <Container maxWidth='sm' sx={{ mb: 4 }}>
      <Paper sx={{ my: { xs: 10, md: 6 }, p: { xs: 3.5, md: 3 } }}>
        <Typography variant='h4' align='center' data-testid='signin'>
          Zaloguj się
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant='standard'
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
          <Grid item xs={12}>
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
        </Grid>
        <Stack direction='row' spacing={2} sx={{ my: 4, mb: 1 }}>
          <Button
            onClick={(e) => {
              submit(e);
            }}
            fullWidth
            data-testid='buttonContinue'
            variant='contained'>
            Kontynuuj
          </Button>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Link to='/register' data-testid='link'>
            <LinkUI variant='body2'>Nie masz konta? Zarejestruj się</LinkUI>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
