import React, { useState, useEffect, useContext } from "react";
import authContext from "../../../context/authContext";
import AlertDialog from "./LessonUtils/AlertDialog";
import LessonForm from "./LessonUtils/LessonForm";
import { Alert, CardContent, Box, AccordionDetails } from "@mui/material/";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
const API_URL = process.env.REACT_APP_API_URL;

function LessonDetails({ details, id, allSubjects }) {
  const { userDetails } = useContext(authContext);
  const [auth, setAuth] = useAuth([]);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [state, setState] = useState({ title: " ", description: " ", city: " ", price: " ", subject: " ", level: " " });
  const foundedSubject = allSubjects.find((element) => element.name === state.subject);

  const windowReload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const editOffer = () => {
    axios
      .patch(
        API_URL + `accounts/users/${userDetails.id}/listings/${id}/`,
        {
          title: state.title === " " ? details.title : state.title,
          description: state.description === " " ? details.description : state.description,
          city: state.city === " " ? details.city : state.city,
          price: state.price === " " ? details.price : state.price,
          // subject: state.subject === " " ? details.subject : state.subject,
          level: state.level === " " ? details.level : state.level,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      )
      .then(() => {
        setAlert(true);
        windowReload();
      });
  };

  const deleteOffer = () => {
    axios
      .delete(API_URL + `accounts/users/${userDetails.id}/listings/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      })
      .then(setOpen(false), windowReload());
  };

  return (
    <AccordionDetails>
      <Box>
        <AlertDialog deleteOffer={deleteOffer} open={open} setOpen={setOpen} />
        {alert && <Alert severity='success'>Ogłoszenie zostało zmodyfikowane pomyślnie</Alert>}
        <CardContent>
          <LessonForm
            defaultValue={details}
            state={state}
            setState={setState}
            allSubjects={allSubjects}
            func1={editOffer}
            func2={() => {
              setOpen(true);
            }}
            buttonText1='Zapisz zmiany'
            buttonText2='Usuń ogłoszenie'
          />
        </CardContent>
      </Box>
    </AccordionDetails>
  );
}

export default LessonDetails;
