import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Typography, Paper, Container } from "@mui/material";
import Fade from "react-reveal/Fade";

function VerifyEmail() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { uidURL, tokenURL } = useParams();
  const [errorAppeared, setErrorAppeared] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    axios
      .post(API_URL + "accounts/users/verify-email/", {
        uid: uidURL,
        token: tokenURL,
      })
      .catch((response) => {
        console.log(response.response.status);
        if (response.response.status === 403) {
          setErrorAppeared(true);
          setErrorMessage(response.response.data.detail);
        }
      });
  }, []);
  return (
    <Fade>
      <Container maxWidth='sm' sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 10, md: 6 }, p: { xs: 3.5, md: 3 } }}>
          {!errorAppeared ? (
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
          ) : (
            <Box sx={{ width: "100%", pt: 5 }}>
              <Typography sx={{ mb: 3 }} align='center' variant='h4'>
                {errorMessage}
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
          )}
        </Paper>
      </Container>
    </Fade>
  );
}

export default VerifyEmail;
