import React from "react";
import { Card, List, ListSubheader } from "@mui/material/";

function ContentSettings({ settingsName, children }) {
  return (
    <Card>
      <List subheader={<ListSubheader>{settingsName}</ListSubheader>}>{children}</List>
    </Card>
  );
}

export default ContentSettings;
