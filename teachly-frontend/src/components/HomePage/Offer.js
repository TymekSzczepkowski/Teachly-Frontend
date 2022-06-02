import { Box, CardMedia, Typography, Card, CardContent, Button, Stack, Rating } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import guy from "../../data/guy.jpeg";

function Offer({ data }) {
  return (
    <Card>
      <CardMedia component='img' height='180' image={guy} />
      <CardContent>
        <Typography sx={{ whiteSpace: "nowrap" }} variant='h5'>
          {data.title}
        </Typography>
        <Stack direction='row' spacing={0.5} sx={{ mb: 1, mt: 0.5 }}>
          <LocationOnOutlinedIcon color='primary' sx={{ fontSize: "21px" }} />
          <Typography sx={{ fontWeight: 500, mt: 0.3 }} color='primary' variant='subtitle2'>
            {data.city.toUpperCase()}, POLAND
          </Typography>
        </Stack>
        <Stack direction='row' sx={{ mb: 1, mt: 0.5 }}>
          <Rating value={2} readOnly />
          <Typography sx={{ mt: 0.3 }} variant='body2' color='text.disabled'>
            56 opinii
          </Typography>
        </Stack>
        <Box sx={{ maxHeight: "78px", textOverflow: "ellipsis", overflow: "hidden" }}>
          <Typography variant='body2' color='text.secondary'>
            {data.description}
          </Typography>
        </Box>
      </CardContent>
      <Stack spacing={1} direction='row' sx={{ px: 2, pb: 2 }}>
        <Button variant='contained'>ZOBACZ</Button>
        <Button disableRipple variant='outlined'>{`${data.price} zł/h`}</Button>
      </Stack>
    </Card>
  );
}

export default Offer;
