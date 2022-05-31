import React, { useContext, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import authContext from "../../../context/authContext";
import { Alert, AlertTitle, ListItemButton, Button, ListItemText, ListItem } from "@mui/material/";
import SendIcon from "@mui/icons-material/Send";

function EditEmailRequest() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [open, setOpen] = useState(false);
  const { userDetails } = useContext(authContext);
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
          Link ze zmianą e-maila został wysłany na adres — <strong>{userDetails.email}</strong>
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
