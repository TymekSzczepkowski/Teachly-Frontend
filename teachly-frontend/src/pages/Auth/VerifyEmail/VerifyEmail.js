import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Card, Container } from "@mui/material";
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
        if ((response.response.status === 403, 400)) {
          setErrorAppeared(true);
          setErrorMessage("Link weryfikacyjny jest już nieaktualny");
        }
      });
  }, []);
  return (
    <Fade>
      <Container maxWidth='sm' sx={{ mt: { xs: 13, md: 12 }, p: { xs: 3.5, md: 3 } }}>
        <Card sx={{ width: "100%", pt: 5, pb: 5 }}>
          <Box>
            {!errorAppeared ? (
              <Typography sx={{ mb: 2 }} align='center' variant='h4'>
                Twoje konto zostało zweryfikowane.
              </Typography>
            ) : (
              <Typography sx={{ mb: 2 }} align='center' variant='h4'>
                {errorMessage}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}>
              <Link style={{ color: "black", textDecoration: "none" }} to='/login'>
                <Typography color='primary' variant='body1'>
                  Klinkij tutaj, aby powrócić do strony logowania.
                </Typography>
              </Link>
            </Box>
          </Box>
        </Card>
      </Container>
    </Fade>
  );
}

export default VerifyEmail;
