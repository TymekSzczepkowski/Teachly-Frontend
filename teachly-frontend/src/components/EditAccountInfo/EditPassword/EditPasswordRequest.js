import React, { useContext } from "react";
import { ListItem, Button, ListItemText } from "@mui/material/";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import authContext from "../../../context/authContext";
import SendIcon from "@mui/icons-material/Send";
const API_URL = process.env.REACT_APP_API_URL;

function EditEmailRequest() {
  const { userDetails } = useContext(authContext);
  const [auth, setAuth] = useAuth();

  const submit = async () => {
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
    <ListItem
      secondaryAction={
        <Button edge='end' onClick={submit} variant='contained' endIcon={<SendIcon />}>
          Wyślij
        </Button>
      }>
      <ListItemText secondary='Wyślij link ze zmianą hasła na Twoją skrzynkę pocztową.' />
    </ListItem>
  );
}

export default EditEmailRequest;
