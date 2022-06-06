import { useState, useContext } from "react";
import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import LessonForm from "./LessonForm";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import authContext from "../../../../context/authContext";
const API_URL = process.env.REACT_APP_API_URL;

export default function AddLesson({ open, setOpen, allSubjects }) {
  const [auth, setAuth] = useAuth([]);
  const { userDetails } = useContext(authContext);
  const [state, setState] = useState({ title: "", description: "", city: "", price: "", subject: "", level: "" });

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
          // subject: foundedSubject.id,
          level: state.level,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      )
      .then(() => {});
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{"Dodaj ogłoszenie"}</DialogTitle>
      <Divider />
      <DialogContent>
        <LessonForm allSubjects={allSubjects} state={state} setState={setState} defaultValue={state} func1={addOffer} func2={handleClose} buttonText1='Dodaj ogłoszenie' buttonText2='Anuluj' />
      </DialogContent>
    </Dialog>
  );
}
