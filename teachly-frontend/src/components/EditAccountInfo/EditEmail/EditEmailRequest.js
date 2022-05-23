import React from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Button, ListItemText, ListItem } from "@mui/material/";
import SendIcon from "@mui/icons-material/Send";
const API_URL = process.env.REACT_APP_API_URL;

function EditEmailRequest() {
  const [auth, setAuth] = useAuth();

  const onChangeEmail = () => {
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
    <ListItem
      secondaryAction={
        <Button
          edge='end'
          onClick={(e) => {
            onChangeEmail();
          }}
          variant='contained'
          endIcon={<SendIcon />}>
          Wyślij
        </Button>
      }>
      <ListItemText secondary='Wyślij link ze zmianą e-maila na Twoją skrzynkę pocztową.' />
    </ListItem>
  );
}

export default EditEmailRequest;
