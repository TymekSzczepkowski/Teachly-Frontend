import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Card, ListSubheader, Stack, Typography, Rating, Divider } from "@mui/material/";
import photo from "../../data/guy.jpeg";

function OpinionList() {
  return (
    //kiedys trzeba to wydzielic do komponentow jak beda opinie na backend
    <Card sx={{ width: "100%", mt: 4 }}>
      <List id={"feedback-list"} subheader={<ListSubheader>Opinie o korepetytorze</ListSubheader>}>
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar src={photo} />
          </ListItemAvatar>
          <ListItemText
            primary='Super nauczyciel! - Jarek S.'
            secondary={
              <Stack component='span' direction='column' spacing={1}>
                Najlepszy z jakim miałem do czynienia wytłumaczył mi wszystko od A do Z.
                <Rating sx={{ mt: 1 }} value={2} readOnly />
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
            primary='Mega zajęcia! - Marek P.'
            secondary={
              <Stack component='span' direction='column' spacing={1}>
                Zajęcia z Panem Markiem miałem przez kilka miesięcy i czas ten sprawił, że mam teraz zupełnie inne spojrzenie.
                <Rating sx={{ mt: 1 }} value={2} readOnly />
              </Stack>
            }
          />
        </ListItem>
      </List>
    </Card>
  );
}

export default OpinionList;
{
}
