import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Card } from "@mui/material/";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
function OtherOffers() {
  return (
    <Card sx={{ width: "100%", height: 160 }}>
      <List sx={{ height: 160, width: "100%", bgcolor: "background.paper", overflow: "scroll" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Matematyka Dyskretna' secondary='Jan 9, 2014' />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Język Angielski z klasą' secondary='Jan 7, 2014' />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Przyroda dla ułomnych' secondary='July 20, 2014' />
        </ListItem>
      </List>
    </Card>
  );
}

export default OtherOffers;
