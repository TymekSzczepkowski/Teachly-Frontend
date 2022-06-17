import { useState, useContext } from "react";
import LessonForm from "./LessonUtils/LessonForm";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import authContext from "../../../context/authContext";
import { Dialog, DialogContent, DialogTitle, Divider, Snackbar, Alert } from "@mui/material";
const API_URL = process.env.REACT_APP_API_URL;

export default function AddLesson({ open, setOpen, allSubjects, windowReload }) {
  const [auth, setAuth] = useAuth([]);
  const { userDetails } = useContext(authContext);
  const [state, setState] = useState({ title: "", description: "", city: "", price: "", subject: "", level: "", type: "" });
  const [showAlert, setShowAlert] = useState(false);
  const foundedSubject = allSubjects.find((element) => element.name === state.subject);

  const handleClose = () => {
    setOpen(false);
  };

  const addOffer = () => {
    axios
      .post(
        API_URL + `accounts/users/${userDetails.id}/listings/`,
        {
          title: state.title,
          description: state.description,
          city: state.city,
          price: state.price,
          subject: foundedSubject.id,
          level: state.level,
          type: state.type,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      )
      .then(() => {
        setShowAlert(true);
        windowReload(1000);
      });
  };

  return (
    <Dialog open={open}>
      <Snackbar open={showAlert}>
        {showAlert ? (
          <Alert variant='filled' severity='success' sx={{ width: "100%" }}>
            Ogłoszenie dodane pomyślnie
          </Alert>
        ) : null}
      </Snackbar>
      <DialogTitle>{"Dodaj ogłoszenie"}</DialogTitle>
      <Divider />
      <DialogContent>
        <LessonForm allSubjects={allSubjects} state={state} setState={setState} defaultValue={state} func1={addOffer} func2={handleClose} buttonText1='Dodaj ogłoszenie' buttonText2='Anuluj' />
      </DialogContent>
    </Dialog>
  );
}
