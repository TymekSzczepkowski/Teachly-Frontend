import React, { useState } from "react";
import NavbarSettings from "./NavbarSettings.js";
import ContentSettings from "./ContentSettings.js";
import { Box, Grid } from "@mui/material/";

function Settings({ children }) {
  const [settingsSubheader, setSettingsSubheader] = useState("Zmień email");
  return (
    <>
      <Box sx={{ my: { xs: 8.5, md: 8.5 }, p: { xs: 2.5, md: 2.5 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <NavbarSettings setSettingsName={setSettingsSubheader} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContentSettings children={children} settingsName={settingsSubheader} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Settings;
