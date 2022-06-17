import { useState } from "react";
import { List, ListItemText, ListItemAvatar, Card, Dialog, ListItemButton, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
          <Button>
            <ArrowForwardIcon />
          </Button>
        </ListItemButton>

        <Dialog open={open} onClose={handleClose}>
          {component}
        </Dialog>
      </List>
    </Card>
  );
}

export default DialogComponent;
