import React from "react";
import { CircularProgress, Box, Grid } from "@mui/material";
function LoadingSpinner() {
  return (
    <Box sx={{ mt: 40 }}>
      <Grid item xs={4} style={{ textAlign: "center" }}>
        <CircularProgress />
      </Grid>
    </Box>
  );
}

export default LoadingSpinner;
