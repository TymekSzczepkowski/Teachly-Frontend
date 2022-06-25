import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { ListItemButton, ListItemText, ListItemAvatar, Avatar, List } from "@mui/material";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";

function ListOfOtherOffers({ offerDetails }) {
  const [auth, setAuth] = useAuth();
  const [otherOffers, setOtherOffers] = useState();
  useEffect(() => {
    if (auth)
      axios
        .get(process.env.REACT_APP_API_URL + `accounts/users/${offerDetails.author.id}/listings/`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((response) => {
          setOtherOffers(response.data);
        });
  }, []);

  return (
    <>
      {otherOffers !== undefined && (
        <List sx={{ bgcolor: "background.paper", overflow: "scroll", pl: 4 }}>
          {otherOffers.map((offer) => (
            <ListItemButton
              id={"AnotherLessonOffer-button"}
              key={offer.id}
              onClick={() => {
                setTimeout(() => {
                  window.location.reload();
                }, 50);
              }}
              component={Link}
              to={`/offer/${offer.id}`}>
              <ListItemAvatar>
                <Avatar>
                  <CalculateOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={offer.title} secondary={`Poziom: ${offer.level}, ${offer.subject.name},`} />
            </ListItemButton>
          ))}
        </List>
      )}
    </>
  );
}

export default ListOfOtherOffers;
