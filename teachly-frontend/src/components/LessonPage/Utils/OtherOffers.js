import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { List, ListItemButton, ListItemAvatar, ListItemText, Avatar, Card, ListSubheader, Button } from "@mui/material/";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import Fade from "react-reveal/Fade";
const API_URL = process.env.REACT_APP_API_URL;

function OtherOffers({ offerDetails }) {
  const [auth, setAuth] = useAuth();
  const [otherOffers, setOtherOffers] = useState();
  useEffect(() => {
    if (auth)
      axios
        .get(API_URL + `accounts/users/${offerDetails.author.id}/listings/`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((response) => {
          setOtherOffers(response.data);
        });
  }, []);

  return (
    <Card sx={{ width: "100%", height: 160 }}>
      {otherOffers !== undefined && (
        <List sx={{ height: 160, width: "100%", bgcolor: "background.paper", overflow: "scroll" }} subheader={<ListSubheader>Inne ogłoszenia tego korepetytora</ListSubheader>}>
          {otherOffers.map((offer) => (
            <Fade bottom>
              <ListItemButton key={offer.id}>
                <ListItemAvatar>
                  <Avatar>
                    <CalculateOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={offer.title} secondary={`Poziom: ${offer.level}, ${offer.subject.name},`} />
                <Button
                  id={"AnotherLessonOffer-button"}
                  onClick={() => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 50);
                  }}
                  component={Link}
                  to={`/offer/${offer.id}`}
                  variant='contained'
                  startIcon={<ArrowForwardIcon />}>
                  ZOBACZ
                </Button>
              </ListItemButton>
            </Fade>
          ))}
        </List>
      )}
    </Card>
  );
}

export default OtherOffers;
