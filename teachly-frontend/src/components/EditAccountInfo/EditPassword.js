import React from "react";
import { TextField, Grid, Container, Box, ListItem } from "@mui/material/";

function EditPassword() {
  return (
    <Container maxWidth='md' sx={{ marginLeft: 0 }}>
      <Box sx={{ my: { xs: 1, md: 1 }, px: { xs: 2, md: 2 }, pt: { xs: 1, md: 1 } }}>
        <Grid container spacing={3}>
          <ListItem>
            <Grid item xs={12}>
              <TextField
                autoComplete='off'
                // error={inputMessage.emailMessage === "" ? false : true}
                // helperText={inputMessage.emailMessage}
                fullWidth
                variant='standard'
                label='Nowe hasło'
                // value={state.email}
                // onChange={(e) => {
                //   setState({ ...state, email: e.target.value });
                // }}
              />
            </Grid>
          </ListItem>
          <ListItem>
            <Grid item xs={12}>
              <TextField
                autoComplete='off'
                // error={inputMessage.emailMessage === "" ? false : true}
                // helperText={inputMessage.emailMessage}
                fullWidth
                variant='standard'
                label='Powtórz hasło'
                // value={state.email}
                // onChange={(e) => {
                //   setState({ ...state, email: e.target.value });
                // }}
              />
            </Grid>
          </ListItem>
        </Grid>
      </Box>
    </Container>
  );
}

export default EditPassword;
