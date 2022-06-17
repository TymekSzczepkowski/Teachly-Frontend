import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import authContext from "../../../context/authContext";
import AlertDialog from "./LessonUtils/AlertDialog";
import LessonForm from "./LessonUtils/LessonForm";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Alert, CardContent, Box, AccordionDetails, CardActions, Button } from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
const API_URL = process.env.REACT_APP_API_URL;

function LessonDetails({ details, id, allSubjects, windowReload }) {
  const { userDetails } = useContext(authContext);
  const [auth, setAuth] = useAuth([]);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [state, setState] = useState({ title: " ", description: " ", city: " ", price: " ", subject: " ", level: " ", type: " " });
  const foundedSubject = allSubjects.find((element) => element.name === state.subject);

  const editOffer = () => {
    axios
      .patch(
        API_URL + `accounts/users/${userDetails.id}/listings/${id}/`,
        {
          title: state.title === " " ? details.title : state.title,
          description: state.description === " " ? details.description : state.description,
          city: state.city === " " ? details.city : state.city,
          price: state.price === " " ? details.price : state.price,
          subject: state.subject === " " ? details.subject.id : foundedSubject.id,
          level: state.level === " " ? details.level : state.level,
          type: state.type === " " ? details.type : state.type,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      )
      .then(() => {
        setAlert(true);
        windowReload(1000);
      });
  };

  const deleteOffer = () => {
    axios
      .delete(API_URL + `accounts/users/${userDetails.id}/listings/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      })
      .then(setOpen(false), windowReload(1000));
  };
  console.log(details);
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
        <CardActions>
          <Button component={Link} to={`/offer/${details.id}`} size='small' startIcon={<SearchIcon />}>
            ZOBACZ OGŁOSZENIE
          </Button>
        </CardActions>
      </Box>
    </AccordionDetails>
  );
}

export default LessonDetails;
