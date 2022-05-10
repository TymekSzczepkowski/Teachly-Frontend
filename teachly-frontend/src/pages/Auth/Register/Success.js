import React, { useState } from "react";
import { Box, LinearProgress, Fade, Typography } from "@mui/material";

function Success({ state }) {
  const [show, setShow] = useState(false);
  setTimeout(() => {
    setShow(true);
  }, 3000);
  return (
    <Box sx={{ width: "100%", pt: 5 }}>
      {show ? (
        <>
          <Fade in>
            <Typography sx={{ mb: 3 }} gutterBottom align='center' variant='h2'>
              {`Witaj ${state.firstName} ${state.lastName}`}
            </Typography>
          </Fade>
          <Fade in>
            <Typography sx={{ mb: 4 }} gutterBottom align='center' variant='body1'>
              Na Twojego maila wysłaliśmy link weryfikacyjny, kliknij w niego, aby potwierdzić rejestracje.
            </Typography>
          </Fade>
        </>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
}

export default Success;
