import moment from "moment";
import "moment/locale/pl";
import { Grid, Box, Card, Typography, Stack, Button, Divider, Chip } from "@mui/material/";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
function OffferDetails({ offerDetails }) {
  return (
    <Card>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems='center' spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item>
            <Typography gutterBottom variant='h4'>
              {offerDetails.title}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography gutterBottom variant='h6' color='primary'>
              {offerDetails.subject.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color='primary' gutterBottom variant='h6'>
              {offerDetails.price} zł/h
            </Typography>{" "}
          </Grid>
        </Grid>
        <Typography sx={{ maxHeight: 300, textOverflow: "ellipsis", overflow: "hidden", height: 124 }} color='text.secondary' variant='body2'>
          {offerDetails.description}
        </Typography>
      </Box>
      <Divider variant='middle' />
      <Box sx={{ m: 2 }}>
        <Typography gutterBottom variant='body1'>
          Informacje:
        </Typography>
        <Grid container direction='row' justifyContent='flex-start' alignItems='center' spacing={1}>
          <Grid item>
            <Chip icon={<LocationOnOutlinedIcon />} label={`Lokalizacja: ${offerDetails.city}`} />
          </Grid>
          <Grid item>
            <Chip icon={<AttachMoneyIcon />} color='primary' label={`Cena: ${offerDetails.price} zł`} />
          </Grid>
          <Grid item>
            <Chip icon={<BarChartIcon />} label={`Poziom: ${offerDetails.level}`} />
          </Grid>
          <Grid item>
            <Chip icon={<ListAltIcon />} color='primary' label={`Przedmiot: ${offerDetails.subject.name}`} />
          </Grid>
          <Grid item>
            <Chip icon={<CastForEducationOutlinedIcon />} label={`Typ: ${offerDetails.type}`} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 3, mx: 1, mb: 1 }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
          <Button id={"make-an-appointment-button"} sx={{ width: "70%" }} variant='contained'>
            Umów się
          </Button>
          <Typography sx={{ mt: 0.3 }} variant='body2' color='text.disabled'>
            {moment(offerDetails.created_date).locale("pl").format("lll")}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}

export default OffferDetails;
