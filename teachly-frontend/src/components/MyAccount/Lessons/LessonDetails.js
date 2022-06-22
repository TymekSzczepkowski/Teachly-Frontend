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
  const [editedListing, setEditedListing] = useState({ title: " ", description: " ", city: " ", price: " ", subject: " ", level: " ", type: " " });
  const foundSubject = allSubjects.find((element) => element.name === editedListing.subject);

  const editOffer = () => {
    axios
      .patch(
        API_URL + `accounts/users/${userDetails.id}/listings/${id}/`,
        {
          title: editedListing.title === " " ? details.title : editedListing.title,
          description: editedListing.description === " " ? details.description : editedListing.description,
          city: editedListing.city === " " ? details.city : editedListing.city,
          price: editedListing.price === " " ? details.price : editedListing.price,
          subject: editedListing.subject === " " ? details.subject.id : foundSubject.id,
          level: editedListing.level === " " ? details.level : editedListing.level,
          type: editedListing.type === " " ? details.type : editedListing.type,
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
  return (
    <AccordionDetails>
      <Box>
        <AlertDialog deleteOffer={deleteOffer} open={open} setOpen={setOpen} />
        {alert && <Alert severity='success'>Ogłoszenie zostało zmodyfikowane pomyślnie</Alert>}
        <CardContent>
          <LessonForm
            idActionButton={"saveOffer-button"}
            deleteOfferButton={"deleteOffer-button"}
            idSubject={"subject-input"}
            defaultValue={details}
            state={editedListing}
            setState={setEditedListing}
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
          <Button id={"checkoutThatLesson-button"} component={Link} to={`/offer/${details.id}`} size='small' startIcon={<SearchIcon />}>
            ZOBACZ OGŁOSZENIE
          </Button>
        </CardActions>
      </Box>
    </AccordionDetails>
  );
}

export default LessonDetails;
