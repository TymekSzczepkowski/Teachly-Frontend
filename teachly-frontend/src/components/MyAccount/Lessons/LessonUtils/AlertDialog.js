import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AlertDialog({ deleteOffer, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{"Czy napewno chcesz usunąć to ogłoszenie?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>Po nacisnięciu przycisku usuń, ogłoszenie zostanie usunięte bez możliwości cofnięcia akcji. </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "#bdbdbd" }}>
          Cofnij
        </Button>
        <Button id={"deleteOffer-button2"} onClick={deleteOffer} color='error' variant='contained' autoFocus startIcon={<DeleteIcon />}>
          USUŃ
        </Button>
      </DialogActions>
    </Dialog>
  );
}
