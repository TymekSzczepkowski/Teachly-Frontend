import { DialogActions, DialogContentText, DialogTitle, DialogContent, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";

function DeleteHours({ hourID, type, setOpen, windowReload, displayedDate }) {
  const [auth, setAuth] = useAuth([]);

  const deleteCustomHours = () => {
    axios
      .delete(process.env.REACT_APP_API_URL + `lessons/custom-working-hours/${hourID}`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      })
      .then(() => {
        setOpen(false);
        windowReload(1000);
      });
  };

  const deleteRegularHours = () => {
    axios
      .delete(process.env.REACT_APP_API_URL + `lessons/regular-working-hours/${hourID}/`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      })
      .then(() => {
        setOpen(false);
        windowReload(1000);
      });
  };

  const deleteDayOff = () => {
    axios
      .delete(process.env.REACT_APP_API_URL + `lessons/days-off/${hourID}/`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      })
      .then(() => {
        setOpen(false);
        windowReload(1000);
      });
  };
  const deleteHours = (type) => {
    switch (type) {
      case 0:
        deleteRegularHours();
        break;

      case 1:
        deleteCustomHours();
        break;

      case 2:
        deleteDayOff();
        break;

      default:
        return "error";
    }
  };

  return (
    <>
      <DialogTitle>{`Czy napewno chcesz usunąć ${type === 2 ? "dzień wolny" : "tę godzinę"} w dniu ${displayedDate}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>Po nacisnięciu przycisku usuń, godzina dostępności zostanie usunięta bez możliwości cofnięcia akcji.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          sx={{ color: "#bdbdbd" }}>
          Cofnij
        </Button>
        <Button id={"deleteOffer-button2"} onClick={() => deleteHours(type)} color='error' variant='contained' autoFocus startIcon={<DeleteIcon />}>
          USUŃ
        </Button>
      </DialogActions>
    </>
  );
}

export default DeleteHours;
