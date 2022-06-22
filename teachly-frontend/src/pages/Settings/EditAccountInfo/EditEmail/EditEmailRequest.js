import React, { useState, useContext } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { ListItemButton, Button, ListItemText, ListItem, Alert, AlertTitle } from "@mui/material/";
import authContext from "../../../../context/authContext";
import SendIcon from "@mui/icons-material/Send";
const API_URL = process.env.REACT_APP_API_URL;

function EditEmailRequest() {
  const { userDetails } = useContext(authContext);
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useAuth();

  const onChangeEmail = () => {
    setOpen(true);
    axios.post(
      API_URL + `accounts/users/reset-email-send-mail/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      }
    );
  };

  return (
    <>
      {open && (
        <Alert
          severity='success'
          onClose={() => {
            setOpen(false);
          }}>
          <AlertTitle>Link został wysłany</AlertTitle>
          Link ze zmianą hasła został wysłany na adres — <strong>{userDetails.email}</strong>
        </Alert>
      )}
      <ListItem>
        <ListItemText secondary='Wyślij link ze zmianą e-maila na Twoją skrzynkę pocztową.' />
        <ListItemButton>
          <Button
            id='change-email-button'
            fullWidth
            edge='end'
            onClick={(e) => {
              onChangeEmail();
            }}
            variant='contained'
            endIcon={<SendIcon />}>
            Wyślij
          </Button>
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default EditEmailRequest;
