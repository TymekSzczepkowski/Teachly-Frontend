import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
      console.log(response);
      navigate("/profile");
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    auth && navigate("/");
  }, []);

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
      <Paper elevation={1} sx={{ my: { xs: 13, md: 16 }, p: { xs: 3.5, md: 3 } }}>
        <Typography sx={{ fontWeight: 400 }} variant='h4' align='center' data-testid='signin'>
          Zaloguj się
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              autoComplete='off'
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
                    <IconButton color='secondary' aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
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
            sx={{ p: 1 }}
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
          <LinkUI color='secondary' component={Link} to={"/register"} variant='body2'>
            Nie masz konta? Zarejestruj się
          </LinkUI>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
