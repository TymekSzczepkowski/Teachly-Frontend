import EditHours from "../EditHours";
import DeleteHours from "../DeleteHours";
import AddHours from "../AddHours";
import { Dialog } from "@mui/material/";
function DialogComponent({ open, setOpen, type, date, displayedDate, windowReload }) {
  const handleClose = () => {
    setOpen(false);
  };
  const getContent = function (type) {
    switch (type) {
      case "edit":
        return <EditHours date={date} open={open} setOpen={setOpen} windowReload={windowReload} displayedDate={displayedDate} />;
      case "delete":
        return <DeleteHours displayedDate={displayedDate} date={date} open={open} setOpen={setOpen} windowReload={windowReload} />;
      case "add":
        return <AddHours displayedDate={displayedDate} date={date} open={open} setOpen={setOpen} windowReload={windowReload} />;

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
