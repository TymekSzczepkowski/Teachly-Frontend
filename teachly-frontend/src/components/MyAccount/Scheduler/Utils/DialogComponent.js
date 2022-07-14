import EditHours from "../shit/EditHours";
import DeleteHours from "../shit/DeleteHours";
import AddHours from "../shit/AddHours";
import { Dialog } from "@mui/material/";
function DialogComponent({ selectedDate, selectedDateValues, hourID, type, open, setOpen, action, date, displayedDate, windowReload, weekDays }) {
  const handleClose = () => {
    setOpen(false);
  };

  const getContent = function (action) {
    switch (action) {
      case "edit":
        return <EditHours selectedDate={selectedDate} selectedDateValues={selectedDateValues} date={date} type={type} open={open} setOpen={setOpen} windowReload={windowReload} displayedDate={displayedDate} />;
      case "delete":
        return <DeleteHours hourID={hourID} type={type} displayedDate={displayedDate} date={date} open={open} setOpen={setOpen} windowReload={windowReload} />;
      case "add":
        return <AddHours weekDays={weekDays} hourID={hourID} type={type} displayedDate={displayedDate} date={date} open={open} setOpen={setOpen} windowReload={windowReload} />;
      default:
        return "error";
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      {getContent(action)}
    </Dialog>
  );
}

export default DialogComponent;
