import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { validateEmail } from "../../../hooks/Auth/emailVerification";
import { validatePassword } from "../../../hooks/Auth/passwordVerification";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Container, Typography, Grid, TextField, Stack, Button, Box, IconButton, InputAdornment, Link as LinkUI } from "@mui/material/";

const API_URL = process.env.REACT_APP_API_URL;
function Login() {
  const navigate = useNavigate();
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
      navigate("/");
    } catch (error) {
      setInputMessage({
        ...inputMessage,
        emailMessage: error.response.data.non_field_errors[0],
        passwordMessage: error.response.data.non_field_errors[0],
      });
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

  useEffect(() => {
    auth && navigate("/");
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: { xs: 13, md: 16 }, p: { xs: 3.5, md: 3 } }}>
        <Typography sx={{ fontWeight: 400 }} variant='h4' align='center' gutterBottom>
          Zaloguj się
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id='email-input'
              autoComplete='off'
              fullWidth
              error={inputMessage.emailMessage === "" ? false : true}
              helperText={inputMessage.emailMessage}
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
              id='password-input'
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
            id='sign-in-button'
            sx={{ p: 1 }}
            onClick={(e) => {
              submit(e);
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
          <LinkUI component={Link} to={"/register"} variant='body2'>
            Nie masz konta? Zarejestruj się
          </LinkUI>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
