import React from "react";
import { Box, CardMedia, Typography, Card, CardContent, Button, CardActions, Stack } from "@mui/material";
import guy from "../../data/guy.jpeg";

function Offer({ data }) {
  return (
    <Card>
      <CardMedia component='img' height='180' image={guy} />
      <CardContent>
        <Typography gutterBottom variant='h5'>
          {data.title}
        </Typography>
        <Box sx={{ maxHeight: "78px", textOverflow: "ellipsis", overflow: "hidden" }}>
          <Typography variant='body2' color='text.secondary'>
            {data.description}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Stack direction='row-reverse' justifyContent='space-between' alignItems='center' spacing={17}>
          <Typography variant='body2' color='text.secondary'>
            {`Cena: ${data.price} zł/h`}
          </Typography>
          <Button variant='outlined' size='small'>
            Zobacz
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}

export default Offer;
