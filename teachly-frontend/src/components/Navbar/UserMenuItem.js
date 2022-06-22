import { Typography, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

function UserMenuItem({ component, func, to, title, id }) {
  return (
    <MenuItem component={Link} to={to} onClick={func}>
      <Typography id={id} textAlign='center'>
        {title}
      </Typography>
    </MenuItem>
  );
}

export default UserMenuItem;
