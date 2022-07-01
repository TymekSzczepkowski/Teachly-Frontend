import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

function DeleteHours({ open, setOpen, windowReload }) {
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
    <Dialog open={open}>
      <DialogTitle>{"Czy napewno chcesz usunąć tę godzinę?"}</DialogTitle>
      <DialogContent>
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
    </Dialog>
  );
}

export default DeleteHours;
