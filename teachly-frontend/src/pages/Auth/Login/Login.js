import React from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box, 
  Link
} from "@mui/material/";

function Login() {
  return (
    <Container maxWidth='sm' sx={{ mb: 4 }}>
      <Paper sx={{ my: { xs: 10, md: 6 }, p: { xs: 3.5, md: 3 } }}>
        <Typography variant='h4' align='center'>
          Zaloguj się
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth variant='standard' label='E-mail' />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant='standard'
              label='Hasło'
              placeholder='Podaj hasło'
              type='password'
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
            fullWidth 
            variant='contained'>
              Zaloguj się
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Link href='/register' variant='body2'>
            Nie posiadasz konta? Zarejestruj się
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
