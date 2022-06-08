import { useState } from "react";
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Card, ListSubheader, Rating, Collapse, ListItemButton, ListItemIcon } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import photo from "../../../data/guy.jpeg";

function TeacherFeedback() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card>
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <ForumOutlinedIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Opinie o korepetytorze' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar src={photo} />
            </ListItemAvatar>
            <ListItemText
              primary='Super nauczyciel!'
              secondary={
                <>
                  Najlepszy z jakim miałem do czynienia wytłumaczył mi wszystko od A do Z.
                  <Rating value={2} readOnly />
                </>
              }
            />
          </ListItem>
          <Divider variant='inset' component='li' />
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar src={photo} />
            </ListItemAvatar>
            <ListItemText
              primary='Mega zajęcia!'
              secondary={
                <>
                  Zajęcia z Panem Markiem miałem przez kilka miesięcy i czas ten sprawił, że mam teraz zupełnie inne spojrzenie.
                  <Rating value={2} readOnly />
                </>
              }
            />
          </ListItem>
        </Collapse>
      </List>
    </Card>
  );
}

export default TeacherFeedback;
