import { ListItemButton, ListItem, Button, ListItemText, Grid } from "@mui/material/";
import SendIcon from "@mui/icons-material/Send";

function ListItemSettingsDetails({ text, id, buttonText, func }) {
  return (
    <ListItem>
      <Grid container>
        <Grid xs={6} sm={8}>
          <ListItemText secondary={text} />
        </Grid>
        <Grid xs={6} sm={4}>
          <ListItemButton>
            <Button
              id={id}
              fullWidth
              onClick={() => {
                func();
              }}
              variant='contained'
              endIcon={<SendIcon />}>
              {buttonText}
            </Button>
          </ListItemButton>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default ListItemSettingsDetails;
