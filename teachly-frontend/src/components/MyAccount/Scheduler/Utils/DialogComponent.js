import AddHours from "../AddHours";
import DeleteHours from "../DeleteHours";
import { Dialog, DialogTitle, DialogContent, Grid } from "@mui/material/";
function DialogComponent({ open, setOpen, type, date, displayedDate, windowReload }) {
  const handleClose = () => {
    setOpen(false);
  };
  const getContent = function (type) {
    switch (type) {
      case "add":
        return (
          <DialogTitle>
            Dodaj nowe godziny dostępności na {displayedDate}
            <DialogContent>
              <Grid container>
                <Grid item xs={12}>
                  <AddHours date={date} open={open} setOpen={setOpen} windowReload={windowReload} />
                </Grid>
              </Grid>
            </DialogContent>
          </DialogTitle>
        );
      case "delete":
        return (
          <DialogTitle>
            Usuń godzony dostępności w dniu {displayedDate}
            <DialogContent>
              <Grid container>
                <Grid item xs={12}>
                  <DeleteHours date={date}open={open} setOpen={setOpen} windowReload={windowReload} />
                </Grid>
              </Grid>
            </DialogContent>
          </DialogTitle>
        );
      case "edit":
        return 1;

      default:
        return "error";
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      {getContent(type)}
    </Dialog>
  );
}

export default DialogComponent;
