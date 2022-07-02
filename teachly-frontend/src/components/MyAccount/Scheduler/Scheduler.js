import { useState, useContext } from "react";
import moment from "moment";
import "moment/locale/pl";
import { ButtonGroup, Card, Grid, Box, Typography, List, ListItemAvatar, ListItemText, ListItem, Avatar, Divider, Button, ListItemButton } from "@mui/material/";
import authContext from "../../../context/authContext";
import Calendar from "./../../Utils/Calendar";
import DialogComponent from "./Utils/DialogComponent";
import Fade from "react-reveal/Fade";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
function Scheduler({ windowReload }) {
  const { userDetails } = useContext(authContext);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(moment(date).locale("pl").format("LL"));
  const [requestDate, setRequestDate] = useState(date.toLocaleDateString("sv-SE").toString());
  const [daysWithFreeHours, setDaysWithFreeHours] = useState([]);
  const [dateWithFreeHours, setDateWithFreeHours] = useState();
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [type, setType] = useState("");

  return (
    <Card sx={{ mb: 4 }}>
      <Grid container>
        <Grid item xs={12} sm={12} lg={6}>
          <Calendar
            highlightedDays={highlightedDays}
            setHighlightedDays={setHighlightedDays}
            date={date}
            setDate={setDate}
            requestDate={requestDate}
            setRequestDate={setRequestDate}
            displayedDate={displayedDate}
            setDisplayedDate={setDisplayedDate}
            daysWithFreeHours={daysWithFreeHours}
            setDaysWithFreeHours={setDaysWithFreeHours}
            setDateWithFreeHours={setDateWithFreeHours}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Divider variant='middle' />
          <Box sx={{ p: 2 }}>
            <Typography varinat='h6' sx={{ fontWeight: 500, pl: { xs: 2 } }}>
              {`Plan zajęć na: ${displayedDate !== undefined && displayedDate}`}
            </Typography>
            <List sx={{ width: "100%" }}>
              <>
                {dateWithFreeHours !== undefined &&
                  dateWithFreeHours.hours.map((hours) => (
                    <Fade key={`${hours.start}key`}>
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar src={userDetails.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={`${hours.start} - ${hours.end}`} secondary={`${userDetails.first_name}  ${userDetails.last_name}`} />
                          </ListItem>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}>
                          <ButtonGroup fullWidth variant='outlined'>
                            <Button
                              variant='outlined'
                              onClick={() => {
                                setOpen(true);
                                setType("delete");
                              }}>
                              <DeleteIcon />
                            </Button>
                            <Button
                              variant='outlined'
                              onClick={() => {
                                setOpen(true);
                                setType("edit");
                              }}>
                              <EditIcon />
                            </Button>
                          </ButtonGroup>
                        </Grid>
                      </Grid>
                    </Fade>
                  ))}
                <ListItemButton>
                  <ListItemText primary={`Dodaj zajęcia`} secondary={`Dodaj godzinową dostępność tego dnia`} />
                  <Button
                    variant='contained'
                    onClick={() => {
                      setOpen(true);
                      setType("add");
                    }}
                    startIcon={<AddIcon />}>
                    Dodaj
                  </Button>
                </ListItemButton>
              </>
            </List>
            <DialogComponent date={date} displayedDate={displayedDate} open={open} setOpen={setOpen} type={type} windowReload={windowReload} />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Scheduler;
