import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { Alert, AlertTitle, ListItemText, ListItem, Button, ListItemButton } from "@mui/material/";
import SendIcon from "@mui/icons-material/Send";

function EditEmailConfirm() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [errorAppeared, setErrorAppeared] = useState(false);
  const { uidFromUrl, tokenFromUrl, hashedEmail } = useParams();
  const submit = async () => {
    await axios
      .post(
        API_URL + `accounts/users/reset-email-confirm/`,
        {
          uid: uidFromUrl,
          token: tokenFromUrl,
          hashed_email: hashedEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      )
      .catch((error) => {
        if (error.response.status === 500) setErrorAppeared(true);
      });
    await setOpen(true);
  };
  return (
    <>
      {open &&
        (errorAppeared ? (
          <Alert
            severity='error'
            onClose={() => {
              setOpen(false);
            }}>
            <AlertTitle>Error</AlertTitle>
            Twój adres e-mail nie został zmieniony
          </Alert>
        ) : (
          <Alert
            severity='success'
            onClose={() => {
              setOpen(false);
            }}>
            <AlertTitle>Potwierdzono</AlertTitle>
            Twój adres e-mail został zmieniony
          </Alert>
        ))}
      <ListItem>
        <ListItemText secondary='Potwierdź zmianę e-maila.' />
        <ListItemButton>
          <Button id='change-email-button-confirm' fullWidth edge='end' onClick={submit} variant='contained' endIcon={<SendIcon />}>
            Potwierdź
          </Button>
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default EditEmailConfirm;
