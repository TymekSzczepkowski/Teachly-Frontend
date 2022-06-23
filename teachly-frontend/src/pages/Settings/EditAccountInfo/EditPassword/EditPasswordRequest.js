import React, { useContext, useState } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import authContext from "../../../../context/authContext";
import ListItemSettingsDetails from "../../../../components/Settings/ListItemSettingsDetails";
import { Alert, AlertTitle } from "@mui/material/";
const API_URL = process.env.REACT_APP_API_URL;

function EditEmailRequest() {
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
      <ListItemSettingsDetails id='change-password-button' func={submit} text='Wyślij link ze zmianą hasła na Twoją skrzynkę pocztową.' buttonText='Wyślij'></ListItemSettingsDetails>
    </>
  );
}

export default EditEmailRequest;
