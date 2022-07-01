import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import isLoading from "../../hoc/IsLoading";
import useAuth from "../../hooks/useAuth";
import TeacherDetails from "../../components/LessonPage/Utils/TeacherDetails";
import OfferDetails from "../../components/LessonPage/OfferDetails";
import AvailabilityCalendar from "../../components/LessonPage/AvailabilityCalendar";
import OpinionList from "../../components/LessonPage/OpinionList";
import OtherOffers from "../../components/LessonPage/OtherOffers";
import axios from "axios";
import { Container, Grid } from "@mui/material/";
import Fade from "react-reveal/Fade";


function LessonPage({ setLoading }) {
  const [auth, setAuth] = useAuth();
  const { id } = useParams();
  const [offerDetails, setOfferDetails] = useState();

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + `listings/${id}`).then((response) => {
      setOfferDetails(response.data);
      setLoading(false);
    });
  }, []);
  return (
    <Fade>
      <Container maxWidth='xl' sx={{ my: { xs: 8, md: 9 }, px: { xl: 4 }, p: { xs: 3.5, md: 3 } }}>
        {offerDetails !== undefined && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <OfferDetails offerDetails={offerDetails} />
              <OpinionList offerDetails={offerDetails} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AvailabilityCalendar />
              {auth && <OtherOffers offerDetails={offerDetails} />}
              <TeacherDetails offerDetails={offerDetails} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Fade>
  );
}

export default isLoading(LessonPage);
