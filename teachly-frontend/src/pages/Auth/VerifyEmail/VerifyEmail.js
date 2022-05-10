import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Typography, Paper, Container, Link as LinkUI } from "@mui/material";

function VerifyEmail() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { uidURL, tokenURL } = useParams();
  const navigate = useNavigate();

  //TODO
  //Zweryfikować czy nie wchodzimy na linka aktywacyjnego drugi raz
  useEffect(() => {
    try {
      const response = axios.post(API_URL + "accounts/users/verify-email/", {
        uid: uidURL,
        token: tokenURL,
      });
      setTimeout(() => {
        navigate("/login");
      }, 100000000);
      // console.log(response);
    } catch (ex) {
      // console.log(ex);
    }
  }, []);

  return (
    <Container maxWidth='sm' sx={{ mb: 4 }}>
      <Paper sx={{ my: { xs: 10, md: 6 }, p: { xs: 3.5, md: 3 } }}>
        <Box sx={{ width: "100%", pt: 5 }}>
          <Typography sx={{ mb: 3 }} align='center' variant='h4'>
            Twoje konto zostało zweryfikowane.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Link style={{ color: "black", textDecoration: "none" }} to='/login'>
              <Typography variant='body1'>Klinkij tutaj, aby powrócić do strony logowania.</Typography>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default VerifyEmail;
