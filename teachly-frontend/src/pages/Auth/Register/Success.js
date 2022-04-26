import React, { useState } from "react";
import { Box, LinearProgress, Fade, Typography } from "@mui/material";

function Success() {
  const [show, setShow] = useState(false);
  const time = setTimeout(() => {
    setShow(true);
  }, 4000);
  return (
    <Box sx={{ width: "100%" }}>
      {show ? (
        <Fade in>
          <Typography align='center' variant='h2'>
            Witaj w Teachly
          </Typography>
        </Fade>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
}

export default Success;
