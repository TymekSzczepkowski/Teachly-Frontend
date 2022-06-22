import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import authContext from "../../context/authContext";
import Searchbar from "../../components/HomePage/Searchbar";
import Filter from "../../components/HomePage/Filter";
import { Container, Grid, Fab, useMediaQuery } from "@mui/material";
import LessonCard from "../../components/HomePage/Lesson/LessonCard";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "react-reveal/Fade";
const API_URL = process.env.REACT_APP_API_URL;

function Home() {
  const { userDetails } = useContext(authContext);
  const [offers, setOffers] = useState([]);
  const [params, setParams] = useState({ price_from: "", price_to: "", level: "", subject: "", localization: "" });
  const isMobileDevice = useMediaQuery("(min-width:600px)");
  const searchOffers = async (e) => {
    try {
      const response = await axios.get(API_URL + "listings", { params: { price_from: params.price_from, price_to: params.price_to, level: params.level, subject: params.subject, localization: params.localization } });
      setOffers(response.data);
    } catch (ex) {}
  };

  useEffect(() => {
    searchOffers();
  }, [params]);
  return (
    <Fade>
      <Container maxWidth='xl' sx={{ my: { xs: 8, md: 9 }, px: { xl: 4 }, p: { xs: 3.5, md: 3 } }}>
        <Searchbar parameters={params} setParameters={setParams} firstname={userDetails.first_name} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Filter parameters={params} setParameters={setParams} />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Grid container spacing={3}>
              {offers.map((offer) => (
                <Grid key={offer.id} item xs={12} sm={6} md={6} lg={4} xl={4}>
                  <Fade right>
                    <LessonCard data={offer} />
                  </Fade>
                </Grid>
              ))}
              {!isMobileDevice && (
                <Fab
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  sx={{ position: "sticky", bottom: 60, left: 500 }}
                  color='primary'>
                  <KeyboardArrowUpIcon size='large' />
                </Fab>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
}

export default Home;
