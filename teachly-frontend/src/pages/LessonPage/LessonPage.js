import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import isLoading from "../../hoc/IsLoading";
import TeacherDetails from "../../components/LessonPage/TeacherDetails";
import OfferDetails from "../../components/LessonPage/OffferDetails";
import Calendar from "../../components/LessonPage/Utils/Calendar";
import TeacherFeedback from "../../components/LessonPage/Utils/TeacherFeedback";
import axios from "axios";
import { Container, Grid, Card, Stack, Button } from "@mui/material/";
import Fade from "react-reveal/Fade";
const API_URL = process.env.REACT_APP_API_URL;

function LessonPage({ setLoading }) {
  const { id } = useParams();
  const [offerDetails, setOfferDetails] = useState();

  useEffect(() => {
    axios.get(API_URL + `listings/${id}`).then((response) => {
      console.log(response.data);
      setOfferDetails(response.data);
      setLoading(false);
    });
  }, []);
  return (
    <Fade>
      <Container maxWidth='xl' sx={{ my: { xs: 8, md: 9 }, px: { xl: 4 }, p: { xs: 3.5, md: 3 } }}>
        {offerDetails !== undefined && (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={5} md={4} lg={3} xl={3}>
              <TeacherDetails offerDetails={offerDetails} />
            </Grid>
            <Grid item xs={12} sm={7} md={8} lg={9} xl={6}>
              <OfferDetails offerDetails={offerDetails} />
            </Grid>
            <Grid item xs={12} md={8} lg={4} xl={3}>
              <Calendar />
              <TeacherFeedback />
            </Grid>
            <Grid item xs={12} md={8} lg={3}></Grid>
          </Grid>
        )}
      </Container>
    </Fade>
  );
}

export default isLoading(LessonPage);
