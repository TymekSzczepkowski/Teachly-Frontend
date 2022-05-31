import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material/";

function ListItemSettings({ title, func, icon, id, component, to }) {
  return (
    <ListItemButton
      component={component}
      to={to}
      id={id}
      onClick={(e) => {
        func(e);
      }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
}

export default ListItemSettings;
