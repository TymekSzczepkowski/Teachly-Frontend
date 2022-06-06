import { useContext } from "react";
import { Link } from "react-router-dom";
import { CardHeader, Box, Card, CardMedia, CardContent, Typography, Button, Stack, Rating, Avatar } from "@mui/material/";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import authContext from "../../context/authContext";

function AccountDetails() {
  const { userDetails } = useContext(authContext);

  return (
    <Card>
      <CardHeader avatar={<Avatar sx={{ bgcolor: "#1976d2" }}>{userDetails.type === "Student" ? "S" : "T"}</Avatar>} title={userDetails.type} subheader={userDetails.email} />
      <CardMedia component='img' height='300' image={userDetails.avatar} />
      <CardContent>
        <Typography sx={{ whiteSpace: "nowrap" }} variant='h5'>
          {userDetails.first_name + " " + userDetails.last_name}
        </Typography>
        <Stack direction='row' spacing={0.5} sx={{ mb: 1, mt: 0.5 }}>
          <LocationOnOutlinedIcon color='primary' sx={{ fontSize: "21px" }} />
          <Typography sx={{ fontWeight: 500, mt: 0.3, textTransform: "uppercase" }} color='primary' variant='subtitle2'>
            {userDetails.county}, {userDetails.city}
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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into
          </Typography>
        </Box>
      </CardContent>
      <Stack spacing={1} direction='row' sx={{ px: 2, pb: 2 }}>
        <Button component={Link} to='/settings' variant='contained'>
          Modyfikuj dane
        </Button>
      </Stack>
    </Card>
  );
}

export default AccountDetails;
