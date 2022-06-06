import React, { useContext, useState } from "react";
import { Alert, AlertTitle, ListItemButton, ListItem, Button, ListItemText } from "@mui/material/";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import authContext from "../../../../context/authContext";
import SendIcon from "@mui/icons-material/Send";

function EditEmailRequest() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [open, setOpen] = useState(false);
  const { userDetails } = useContext(authContext);
  const [auth, setAuth] = useAuth();

  const submit = async () => {
    setOpen(true);
    axios.post(
      API_URL + `accounts/users/reset_password/`,
      {
        email: userDetails.email,
      },
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
        <ListItemText secondary='Wyślij link ze zmianą hasła na Twoją skrzynkę pocztową.' />
        <ListItemButton>
          <Button
            id='change-password-button'
            fullWidth
            edge='end'
            onClick={() => {
              submit();
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
