import { useState, useContext, useEffect } from "react";
import authContext from "../../context/authContext";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import isLoading from "../../hoc/IsLoading";
import AccountDetails from "./../../components/MyAccount/AccountDetails";
import LessonHeading from "../../components/MyAccount/Lessons/LessonHeading";
import LessonDetails from "../../components/MyAccount/Lessons/LessonDetails";
import AddLesson from "../../components/MyAccount/Lessons/AddLesson";
import { Accordion, Container, Grid, Button } from "@mui/material/";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Fade from "react-reveal/Fade";

function MyAccount({ setLoading }) {
  const { userDetails } = useContext(authContext);
  const [offers, setOffers] = useState();
  const [open, setOpen] = useState(false);
  const [offerDetails, setOfferDetails] = useState();
  const [auth, setAuth] = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [allSubjects, setAllSubjects] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `accounts/users/${userDetails.id}/listings/`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      })
      .then((response) => {
        setOffers(response.data);
        setLoading(false);
      });

    if (auth) {
      axios
        .get(process.env.REACT_APP_API_URL + `listings/subjects/`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((response) => {
          setAllSubjects(response.data);
        });
    }
  }, []);

  const windowReload = (time) => {
    setTimeout(() => {
      window.location.reload();
    }, time);
  };
  const handleChange = (id) => (event, isExpanded) => {
    if (!expanded || expanded !== id) {
      axios
        .get(process.env.REACT_APP_API_URL + `accounts/users/${userDetails.id}/listings/${id}/`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((response) => {
          setOfferDetails(response.data);
          setExpanded(isExpanded ? id : false);
        });
    } else {
      setOfferDetails();
      setExpanded(isExpanded && false);
    }
  };
  return (
    <Fade>
      <Container maxWidth='xl' sx={{ my: { xs: 8, md: 9 }, px: { xl: 4 }, p: { xs: 3.5, md: 3 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <AccountDetails />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            {userDetails.type === "Teacher" &&
              offers !== undefined &&
              offers.map((offer) => (
                <Accordion id={offer.title + "-id"} expanded={expanded === offer.id} onChange={handleChange(offer.id)} key={offer.id} sx={{ mb: 1 }}>
                  <LessonHeading id={offer.title + "-heading"} lessonTitle={offer.title} subject={offer.subject.name} date={offer.modified_date} />
                  {offerDetails !== undefined && <LessonDetails windowReload={windowReload} details={offerDetails} id={offer.id} allSubjects={allSubjects} />}
                </Accordion>
              ))}
            <Button
              id={"addNewLesson-button"}
              color='success'
              onClick={() => {
                setOpen(true);
              }}
              endIcon={<AddCircleIcon />}
              fullWidth
              variant='contained'>
              Dodaj ogłoszenie
            </Button>
            <AddLesson open={open} setOpen={setOpen} allSubjects={allSubjects} windowReload={windowReload} />
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
}

export default isLoading(MyAccount);
