import React from "react";
import { Link } from "react-router-dom";
import LeftDrawerItem from "./LeftDrawerItem";
import { Box, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
function LeftDrawer(auth, toggleDrawer) {
  return (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <LeftDrawerItem component={Link} to='/' title='Strona Głowna' icon={<HomeIcon />} />
      {!auth && (
        <>
          <LeftDrawerItem component={Link} to='/login' title='Zaloguj się' icon={<LiveHelpIcon />} />
          <LeftDrawerItem component={Link} to='/register' title='Zarejestruj się' icon={<LiveHelpIcon />} />
          <Divider />
        </>
      )}
    </Box>
  );
}

export default LeftDrawer;
