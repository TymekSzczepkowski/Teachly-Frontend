import { ListItem, Typography, ListItemIcon, ListItemText } from "@mui/material";

function ListItemTitle({ title, icon }) {
  return (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={<Typography variant='h6'>{title}</Typography>} />
    </ListItem>
  );
}

export default ListItemTitle;
