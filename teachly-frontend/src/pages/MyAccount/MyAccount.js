import React, { useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "../../context/authContext";
import { Box, Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material/";
function MyAccount() {
  const { userDetails } = useContext(authContext);
  return (
    <Container>
      <Box elevation={1} sx={{ my: { xs: 8, md: 8 }, p: { xs: 3.5, md: 3 } }}>
        <Card>
          <CardActionArea>
            <CardMedia component='img' height='400' image={userDetails.avatar} />
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                {userDetails.email}
              </Typography>
              <Typography variant='h5'>{userDetails.first_name + " " + userDetails.last_name}</Typography>

              <Typography gutterBottom sx={{ mb: 1.5 }} color='text.secondary'>
                {userDetails.type}
              </Typography>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography gutterBottom variant='body2'>
                {userDetails.county + ", " + userDetails.city}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button component={Link} to={"/settings"} size='small' color='primary'>
              Modyfikuj dane
            </Button>
          </CardActions>
        </Card>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default MyAccount;
