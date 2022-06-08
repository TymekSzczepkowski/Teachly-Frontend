import { useState } from "react";
import { List, ListItemText, ListItemAvatar, Card, Dialog, ListItemButton } from "@mui/material";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

function DialogComponent({ component, avatar, text }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card sx={{ mb: 2 }}>
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemAvatar>{avatar}</ListItemAvatar>
          <ListItemText primary={text} />
          {!open ? <ToggleOffOutlinedIcon color='primary' /> : <ToggleOnIcon color='primary' />}
        </ListItemButton>

        <Dialog open={open} onClose={handleClose}>
          {component}
        </Dialog>
      </List>
    </Card>
  );
}

export default DialogComponent;
