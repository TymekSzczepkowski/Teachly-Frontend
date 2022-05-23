import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { ListItemText, ListItem, Button } from "@mui/material/";
import SendIcon from "@mui/icons-material/Send";
const API_URL = process.env.REACT_APP_API_URL;

function EditEmailConfirm() {
  const [auth, setAuth] = useAuth();
  const { uidFromUrl, tokenFromUrl, hashedEmail } = useParams();
  const submit = async () => {
    axios.post(
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
    );
  };
  return (
    <ListItem
      secondaryAction={
        <Button edge='end' onClick={submit} variant='contained' endIcon={<SendIcon />}>
          Potwierdź
        </Button>
      }>
      <ListItemText secondary='Potwierdź zmianę e-maila.' />
    </ListItem>
  );
}

export default EditEmailConfirm;
