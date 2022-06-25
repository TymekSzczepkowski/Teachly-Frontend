import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { Alert, AlertTitle } from "@mui/material/";
import ListItemSettingsDetails from "../../../../components/Settings/ListItemSettingsDetails";

function EditEmailConfirm() {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [errorAppeared, setErrorAppeared] = useState(false);
  const { uidFromUrl, tokenFromUrl, hashedEmail } = useParams();
  const submit = async () => {
    await axios
      .post(
        process.env.REACT_APP_API_URL + `accounts/users/reset-email-confirm/`,
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
      <ListItemSettingsDetails id='change-email-button-confirm' func={submit} text='Potwierdź zmianę e-maila.' buttonText='Potwierdź'></ListItemSettingsDetails>
    </>
  );
}

export default EditEmailConfirm;
