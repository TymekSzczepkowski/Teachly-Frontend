import { useState } from "react";
import { List, ListItemText, ListItemAvatar, Card, Collapse, ListItemButton, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "react-reveal/Fade";

function CollapseList({ component, avatar, text, id }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <List>
        <ListItemButton onClick={handleClick} id={id}>
          <ListItemAvatar>{avatar}</ListItemAvatar>
          <ListItemText primary={text} />
          <Button>
            <ExpandMoreIcon sx={{ fontSize: "30px" }} />
          </Button>
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <Fade>{component}</Fade>
        </Collapse>
      </List>
    </Card>
  );
}

export default CollapseList;
