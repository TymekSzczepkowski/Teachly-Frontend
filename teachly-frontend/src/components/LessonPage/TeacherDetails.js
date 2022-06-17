import DialogComponent from "./Utils/DialogComponent";
import { CardHeader, Box, Avatar, CardMedia, CardContent, Typography, Stack, Rating } from "@mui/material/";

function TeacherDetails({ offerDetails }) {
  return (
    <DialogComponent
      text={"Informacje o korepetytorze"}
      avatar={<Avatar src={offerDetails.author.avatar} />}
      component={
        <>
          <CardHeader
            title={<Typography sx={{ fontWeight: 400 }} variant='h6'>{`${offerDetails.author.first_name}  ${offerDetails.author.last_name}`}</Typography>}
            subheader={
              <Typography sx={{ fontWeight: 500, mt: 0.3, textTransform: "uppercase" }} color='primary' variant='subtitle2'>
                {offerDetails.author.city}, {offerDetails.author.county}
              </Typography>
            }
          />
          <CardMedia component='img' height='300' image={offerDetails.author.avatar} />
          <CardContent>
            <Box sx={{ maxHeight: "78px", textOverflow: "ellipsis", overflow: "hidden" }}>
              <Typography variant='body2' color='text.secondary'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into
              </Typography>
            </Box>
            <Stack direction='row-reverse' sx={{ mt: 2 }} alignItems='flex-end'>
              <Typography sx={{ mt: 0.3 }} variant='body2' color='text.disabled'>
                56 opinii
              </Typography>
              <Rating value={2} readOnly />
            </Stack>
          </CardContent>
        </>
      }></DialogComponent>
  );
}

export default TeacherDetails;
