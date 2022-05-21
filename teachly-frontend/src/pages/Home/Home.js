import React, { useContext } from "react";
import authContext from "../../context/authContext";
import useAuth from "../../hooks/useAuth";
import { Typography, Container, Card } from "@mui/material";

function Home() {
  const { userDetails } = useContext(authContext);
  const [auth, setAuth] = useAuth();

  return (
    <Container maxWidth='sm' sx={{ mb: 4 }}>
      <Card elevation={1} sx={{ my: { xs: 13, md: 16 }, p: { xs: 3.5, md: 3 } }}>
        {auth && <Typography variant='h6'>Hej {userDetails.first_name}, Witaj ponownie</Typography>}
      </Card>
    </Container>
  );
}

export default Home;
