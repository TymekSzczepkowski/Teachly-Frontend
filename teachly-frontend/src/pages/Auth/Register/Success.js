import React, { useState } from "react";
import { Box, CircularProgress, Typography, Grid, Card } from "@mui/material";
import Fade from "react-reveal/Fade";

function Success({ state }) {
  const [show, setShow] = useState(false);
  setTimeout(() => {
    setShow(true);
  }, 3000);
  return (
    <Box sx={{ width: "100%", pt: 5 }}>
      {show ? (
        <>
          <Fade>
            <Typography sx={{ mb: 1 }} color='primary' align='center' variant='h2'>
              {`Witaj ${state.firstName} ${state.lastName}`}
            </Typography>
            <Typography sx={{ mb: 4 }} gutterBottom align='center' variant='body1'>
              Na Twojego maila wysłaliśmy link weryfikacyjny, kliknij w niego, aby potwierdzić rejestracje.
            </Typography>
          </Fade>
        </>
      ) : (
        <Grid container justifyContent='center'>
          <CircularProgress />
        </Grid>
      )}
    </Box>
  );
}

export default Success;
