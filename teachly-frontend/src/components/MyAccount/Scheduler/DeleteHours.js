import { DialogActions, DialogContentText, DialogTitle, DialogContent, Button, Typography, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

function DeleteHours({ setOpen, windowReload, displayedDate }) {
  const [auth, setAuth] = useAuth([]);

  const deleteHours = () => {
    axios
      .delete(process.env.REACT_APP_API_URL + `lessons/custom-working-hours/`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      })
      .then(setOpen(false), windowReload(1000));
  };

  return (
    <>
      <DialogTitle>Czy napewno chcesz usunąć tę godzinę w dniu {displayedDate}?</DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <DialogContentText>Po nacisnięciu przycisku usuń, godzina dostępności zostanie usunięta bez możliwości cofnięcia akcji. </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          sx={{ color: "#bdbdbd" }}>
          Cofnij
        </Button>
        <Button id={"deleteOffer-button2"} onClick={deleteHours} color='error' variant='contained' autoFocus startIcon={<DeleteIcon />}>
          USUŃ
        </Button>
      </DialogActions>
    </>
  );
}

export default DeleteHours;
