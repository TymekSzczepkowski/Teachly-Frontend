import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { styledBox } from "../style/stylesEditAccount";
import { validateRepeatInput } from "../../../../hooks/Auth/registerVerification";
import { validateEmail } from "../../../../hooks/Auth/emailVerification";
import { Modal, Typography, TextField, Grid, Container, Box, ListItem, Button } from "@mui/material/";
import SendIcon from "@mui/icons-material/Send";

function EditEmail() {
  const [auth, setAuth] = useAuth();
  const [click, setClick] = useState(false);
  const { uidFromUrl, tokenFromUrl } = useParams();
  const [state, setState] = useState({ email: "", re_email: "", handleSend: false });
  const [inputMessage, setInputMessage] = useState({
    emailMessage: "",
    repeateEmailMessage: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submit = async () => {
    axios
      .post(
        process.env.REACT_APP_API_URL + `accounts/users/reset-email/`,
        {
          uid: uidFromUrl,
          token: tokenFromUrl,
          new_email: state.email,
          re_new_email: state.re_email,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      )
      .then(() => {
        handleOpen();
      })
      .catch((error) => {
        setInputMessage({
          ...inputMessage,
          emailMessage: error.response.data.uid,
          repeateEmailMessage: error.response.data.uid,
        });
      });
  };

  useEffect(() => {
    if (click) {
      setInputMessage({
        ...inputMessage,
        emailMessage: validateEmail(state.email),
        repeateEmailMessage: validateRepeatInput(state.email, state.re_email),
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
                id='new-email-input'
                autoComplete='off'
                error={inputMessage.emailMessage === "" ? false : true}
                helperText={inputMessage.emailMessage}
                fullWidth
                variant='standard'
                label='Nowy e-mail'
                value={state.email}
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                }}
              />
            </Grid>
          </ListItem>
          <ListItem>
            <Grid item xs={12}>
              <TextField
                id='repeat-email-input'
                autoComplete='off'
                fullWidth
                error={inputMessage.repeateEmailMessage === "" ? false : true}
                helperText={inputMessage.repeateEmailMessage}
                variant='standard'
                label='Powtórz e-mail'
                value={state.re_email}
                onChange={(e) => {
                  setState({ ...state, re_email: e.target.value });
                }}
              />
            </Grid>
          </ListItem>
          <ListItem>
            <Grid item xs={12}>
              <Button
                id='change-email-button-send'
                variant='contained'
                onClick={() => {
                  setClick(true);
                  submit();
                }}
                endIcon={<SendIcon />}>
                Wyślij
              </Button>
            </Grid>
          </ListItem>
        </Grid>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styledBox}>
          <Typography variant='h6'>Potwierdź zmianę e-maila</Typography>
          <Typography sx={{ mt: 2 }}>Aby potwiedzić zmieniony adres e-mail, kliknij w link aktywacyjny który znajdziesz w skrzynce pocztowej.</Typography>
        </Box>
      </Modal>
    </Container>
  );
}

export default EditEmail;
