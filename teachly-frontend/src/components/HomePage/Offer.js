import React from "react";
import { Box, CardMedia, Typography, Card, CardContent, Button, Stack, Rating } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import guy from "../../data/guy.jpeg";

function Offer({ data }) {
  return (
    <Card>
      <CardMedia component='img' height='180' image={guy} />
      <CardContent>
        <Typography variant='h5'>{data.title}</Typography>
        <Stack direction='row' alignItems='center' gap={0.7} sx={{ mb: 1, mt: 0.5 }}>
          <LocationOnOutlinedIcon color='primary' sx={{ fontSize: "21px" }} />
          <Typography sx={{ fontWeight: 500, mt: 0.3 }} color='primary' variant='subtitle2'>
            {data.city.toUpperCase()}
          </Typography>
          <Rating sx={{ ml: { xs: 3, sm: 3, md: 0 }, color: "#ff6d75" }} name='customized-color' defaultValue={2} precision={0.5} icon={<FavoriteIcon fontSize='inherit' />} emptyIcon={<FavoriteBorderIcon fontSize='inherit' />} />
          <Typography variant='body2'>56 opinii</Typography>
        </Stack>
        <Box sx={{ maxHeight: "78px", textOverflow: "ellipsis", overflow: "hidden" }}>
          <Typography variant='body2' color='text.secondary'>
            {data.description}
          </Typography>
        </Box>
      </CardContent>
      <Stack
        spacing={1}
        direction='row'
        justifyContent='flex-start
'
        alignItems='flex-start'
        sx={{ px: 2, pb: 2 }}>
        <Button variant='contained'>ZOBACZ</Button>
        <Button disableRipple variant='outlined'>{`${data.price} zł/h`}</Button>
      </Stack>
    </Card>
  );
}

export default Offer;
