import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { validatePassword } from "../../../hooks/Auth/passwordVerification";
import { validateRepeatInput } from "../../../hooks/Auth/registerVerification";
import { IconButton, InputAdornment, Modal, Typography, TextField, Grid, Container, Box, ListItem, Button } from "@mui/material/";
import SendIcon from "@mui/icons-material/Send";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function EditPassword() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [showPassword, setShowPassword] = useState(true);
  const { uidFromUrl, tokenFromUrl } = useParams();
  const [auth, setAuth] = useAuth();
  const [click, setClick] = useState(false);
  const [inputMessage, setInputMessage] = useState({
    passwordMessage: "",
    repeatPasswordMessage: "",
  });

  const [state, setState] = useState({ newPassword: "", reNewPassword: "" });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const submit = async (e) => {
    e.preventDefault();
      axios.post(
        API_URL + `accounts/users/reset_password_confirm/`,
        {
          uid: uidFromUrl,
          token: tokenFromUrl,
          new_password: state.newPassword,
          re_new_password: state.reNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      );
      if (inputMessage.passwordMessage === "" && inputMessage.repeatPasswordMessage === "") {
        handleOpen();
      }
      handleOpen();
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (click) {
      setInputMessage({
        ...inputMessage,
        passwordMessage: validatePassword(state.newPassword),
        repeatPasswordMessage: validateRepeatInput(state.newPassword, state.reNewPassword),
      });
    }
  }, [click, state]);

  return (
    <Container maxWidth='md' sx={{ marginLeft: 0 }}>
      <Box sx={{ my: { xs: 1, md: 1 }, px: { xs: 2, md: 2 }, pt: { xs: 1, md: 1 } }}>
        <Grid container spacing={3}>
          <ListItem>
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
                value={state.newPassword}
                type={showPassword ? "password" : "text"}
                onChange={(e) => {
                  setState({ ...state, newPassword: e.target.value });
                }}
              />
            </Grid>
          </ListItem>
          <ListItem>
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
                error={inputMessage.repeatPasswordMessage === "" ? false : true}
                helperText={inputMessage.repeatPasswordMessage}
                fullWidth
                variant='standard'
                label='Powtórz hasło'
                value={state.reNewPassword}
                type={showPassword ? "password" : "text"}
                onChange={(e) => {
                  setState({ ...state, reNewPassword: e.target.value });
                }}
              />
            </Grid>
          </ListItem>
          <ListItem>
            <Grid item xs={12}>
              <Button
                variant='contained'
                onClick={() => {
                  submit();
                  setClick(true);
                }}
                endIcon={<SendIcon />}>
                Wyślij
              </Button>
            </Grid>
          </ListItem>
        </Grid>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant='h6'>Hasło zostało zmienione</Typography>
        </Box>
      </Modal>
    </Container>
  );
}

export default EditPassword;
