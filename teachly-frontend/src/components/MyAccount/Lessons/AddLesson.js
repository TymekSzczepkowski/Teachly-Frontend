import { useState, useContext } from "react";
import LessonForm from "./LessonUtils/LessonForm";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import authContext from "../../../context/authContext";
import { Dialog, DialogContent, DialogTitle, Divider, Snackbar, Alert } from "@mui/material";

export default function AddLesson({ open, setOpen, allSubjects, windowReload }) {
  const [auth, setAuth] = useAuth([]);
  const { userDetails } = useContext(authContext);
  const [newListing, setNewListing] = useState({ title: "", description: "", city: "", price: "", subject: "", level: "", type: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const foundSubject = allSubjects.find((element) => element.name === newListing.subject);
  const handleClose = () => {
    setOpen(false);
  };
  const addOffer = () => {
    !disabled &&
      axios
        .post(
          process.env.REACT_APP_API_URL + `accounts/users/${userDetails.id}/listings/`,
          {
            title: newListing.title,
            description: newListing.description,
            city: newListing.city,
            price: newListing.price,
            subject: foundSubject.id,
            level: newListing.level,
            type: newListing.type,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.access}`,
            },
          }
        )
        .then(() => {
          setShowAlert(true);
          setDisabled(true);
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
        <LessonForm
          idTitle={"title-input"}
          idCity={"city-input"}
          idDescription={"description-input"}
          idPrice={"price-input"}
          idSubject={"subject-input"}
          idLevel={"level-input"}
          idType={"type-buttonGroup"}
          idActionButton={"addLesson-button"}
          allSubjects={allSubjects}
          state={newListing}
          setState={setNewListing}
          defaultValue={newListing}
          func1={addOffer}
          func2={handleClose}
          buttonText1='Dodaj ogłoszenie'
          buttonText2='Anuluj'
        />
      </DialogContent>
    </Dialog>
  );
}
