import React from "react";
import { ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Rating, ListSubheader, List, Stack, Typography } from "@mui/material";
import photo from "../../../data/guy.jpeg";

function OpinionList() {
  return (
    <>
      <List id={"feedback-list"} subheader={<ListSubheader>Opinie o korepetytorze</ListSubheader>}>
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar src={photo} />
          </ListItemAvatar>
          <ListItemText
            primary='Super nauczyciel!'
            secondary={
              <Stack direction='column' spacing={1}>
                <Typography> Najlepszy z jakim miałem do czynienia wytłumaczył mi wszystko od A do Z</Typography>
                <Rating value={2} readOnly />
              </Stack>
            }
          />
        </ListItem>
        <Divider variant='inset' />
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar src={photo} />
          </ListItemAvatar>
          <ListItemText
            primary='Mega zajęcia!'
            secondary={
              <Stack direction='column' spacing={1}>
                <Typography> Zajęcia z Panem Markiem miałem przez kilka miesięcy i czas ten sprawił, że mam teraz zupełnie inne spojrzenie.</Typography>
                <Rating value={2} readOnly />
              </Stack>
            }
          />
        </ListItem>
      </List>
      ;
    </>
  );
}

export default OpinionList;
