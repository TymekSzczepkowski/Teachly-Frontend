import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { ListItemButton, Button, ListItemText, ListItem } from "@mui/material/";
import SendIcon from "@mui/icons-material/Send";
const API_URL = process.env.REACT_APP_API_URL;

function EditEmailRequest() {
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
