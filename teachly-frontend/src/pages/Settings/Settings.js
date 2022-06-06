import { useState } from "react";
import NavbarSettings from "./../../components/Settings/NavbarSettings";
import ContentSettings from "../../components/Settings/ContentSettings.js";
import Fade from "react-reveal/Fade";

import { Container, Grid } from "@mui/material/";

function Settings({ children }) {
  const [settingsSubheader, setSettingsSubheader] = useState("Ustawienia");
  return (
    <>
      <Fade>
        <Container maxWidth='xl' sx={{ my: { xs: 8, md: 9 }, px: { xl: 4 }, p: { xs: 3.5, md: 3 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={3}>
              <NavbarSettings setSettingsName={setSettingsSubheader} />
            </Grid>
            <Grid item xs={12} md={12} lg={9}>
              <ContentSettings children={children} settingsName={settingsSubheader} />
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </>
  );
}

export default Settings;
