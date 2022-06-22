import React from "react";
import { ListItem, Checkbox, ListItemText, ListItemButton } from "@mui/material";

function ListItemCheckbox({ value, func, title, checked }) {
  return (
    <ListItem secondaryAction={<Checkbox edge='end' value={value} checked={checked === value ? true : false} onChange={func} />} disablePadding>
      <ListItemButton>
        <ListItemText secondary={title} />
      </ListItemButton>
    </ListItem>
  );
}

export default ListItemCheckbox;
