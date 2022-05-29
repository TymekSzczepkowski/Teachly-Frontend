import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import authContext from "../../context/authContext";
import useAuth from "../../hooks/useAuth";
import Searchbar from "../../components/HomePage/Searchbar";
import Filter from "../../components/HomePage/Filter";
import { Container, Grid } from "@mui/material";
import Offer from "../../components/HomePage/Offer";

function Home() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { userDetails } = useContext(authContext);
  const [auth, setAuth] = useAuth([]);
  const [offers, setOffers] = useState([]);
  const [params, setParams] = useState({ price_from: "", price_to: "", level: "", subject: "", localization: "" });
  const searchOffers = async (e) => {
    try {
      const response = await axios.get(API_URL + "listings", { params: { price_from: params.price_from, price_to: params.price_to, level: params.level, subject: params.subject, localization: params.localization } });
      setOffers(response.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    searchOffers();
  }, [params]);

  console.log(params);

  return (
    //px:{xl:8} margin Right and left
    <Container maxWidth='xl' sx={{ my: { xs: 8, md: 9 }, px: { xl: 4 }, p: { xs: 3.5, md: 3 } }}>
      <Searchbar parameters={params} setParameters={setParams} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <Filter parameters={params} setParameters={setParams} />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Grid container spacing={3}>
            {offers.map((offer) => (
              <Grid key={offer.id} item sm={6} md={6} lg={4}>
                <Offer data={offer} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
