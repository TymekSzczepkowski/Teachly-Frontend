import React, { useState } from "react";
import { Button, Box, LinearProgress, Fade, Typography } from "@mui/material";

function Success() {
  const [show, setShow] = useState(false);
  setTimeout(() => {
    setShow(true);
  }, 3000);
  return (
    <Box sx={{ width: "100%", pt: 5 }}>
      {show ? (
        <>
          <Fade in>
            <Typography sx={{ mb: 5 }} gutterBottom align='center' variant='h2'>
              Witaj w Teachly
            </Typography>
          </Fade>
          <Fade in>
            <Button size='large' fullWidth variant='contained'>
              Dalej
            </Button>
          </Fade>
        </>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
}

export default Success;
