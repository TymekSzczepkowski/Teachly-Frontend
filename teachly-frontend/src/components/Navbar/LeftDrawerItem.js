import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";

function LeftDrawerItem({ icon, component, to, title }) {
  return (
    <List>
      <ListItem component={component} to={to} button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </List>
  );
}

export default LeftDrawerItem;
