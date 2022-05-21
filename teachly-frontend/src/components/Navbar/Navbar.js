import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/authContext";
import useAuth from "../../hooks/useAuth";
import LeftDrawer from "./LeftDrawer.js";
import { Divider, Card, styled, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, MenuItem, Drawer } from "@mui/material";
import guyPhoto from "../../pages/Auth/Register/data/guy.jpeg";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(null);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth) {
      axios
        .get(API_URL + `accounts/users/me`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((response) => {
          setUserDetails(response.data);
        });
    }
  }, [auth]);

  const logout = (e) => {
    e.preventDefault();
    handleCloseUserMenu();
    setAuth(false);
  };

  const handleOpenUserMenu = (event) => {
    setShowUserMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setShowUserMenu(null);
  };

  const toggleDrawer = (open) => () => {
    setShowLeftMenu(open);
  };

  const LinkButton = styled(Button)({
    my: 2,
    marginRight: "5px",
    textTransform: "none",
    display: "block",
    color: "inherit",
    fontWeight: "600",
  });
  return (
    <AppBar square={false} elevation={0}>
      <Card variant='outlined'>
        <Container>
          <Toolbar disableGutters>
            <IconButton component={Link} to={"/"} sx={{ display: { xs: "none", md: "flex" } }}>
              <SchoolIcon color='primary' sx={{ mr: 1, fontSize: "30px" }} />
            </IconButton>
            <Typography
              variant='h6'
              noWrap
              component={Link}
              to={"/"}
              sx={{
                fontSize: "30px",
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 600,
                color: "inherit",
                textDecoration: "none",
              }}>
              teachly
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton size='large' aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={toggleDrawer(true)} color='inherit'>
                <MenuIcon />
              </IconButton>
              <>
                <Drawer open={showLeftMenu} onClose={toggleDrawer(false)}>
                  {LeftDrawer(auth, toggleDrawer)}
                </Drawer>
              </>
            </Box>
            <IconButton component={Link} to={"/"} size='large'>
              <SchoolIcon color='primary' sx={{ display: { xs: "flex", md: "none" }, mr: 1, fontSize: "30px" }} />
            </IconButton>

            <Box sx={{ justifyContent: "flex-start", flexGrow: 2, display: { xs: "none", md: "flex" } }}>
              <LinkButton>Znajdź korepetytora</LinkButton>
              <LinkButton>Zostań korepetytorem</LinkButton>
              <LinkButton>Jak to działa</LinkButton>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {auth ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5 }}>
                  <Avatar sx={{ width: 32, height: 32 }} alt='John Doe' src={guyPhoto} />
                </IconButton>
              ) : (
                <IconButton color='primary' onClick={handleOpenUserMenu} sx={{ p: 0.5 }}>
                  <AccountCircleIcon fontSize='large' />
                </IconButton>
              )}

              <Menu
                sx={{ mt: "45px" }}
                elevation={1}
                id='menu-appbar'
                anchorEl={showUserMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                onClick={handleCloseUserMenu}
                open={Boolean(showUserMenu)}>
                <Box
                  sx={{
                    width: "200px",
                    p: 0.5,
                    ml: 0.75,
                    "& .MuiMenuItem-root": {
                      typography: "body2",
                      borderRadius: 0.75,
                    },
                  }}>
                  {auth ? (
                    <>
                      <Box sx={{ my: 1.5, px: 2.5 }}>
                        <Typography variant='subtitle2' noWrap>
                          {`${userDetails.first_name} ${userDetails.last_name}`}
                        </Typography>
                        <Typography variant='body2' sx={{ color: "text.secondary" }} noWrap>
                          {userDetails.email}
                        </Typography>
                      </Box>
                      <Divider />
                      <MenuItem component={Link} to={"/"} onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>Strona główna</Typography>
                      </MenuItem>
                      <MenuItem component={Link} to={"/myaccount"} onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>Moje konto</Typography>
                      </MenuItem>
                      <MenuItem component={Link} to={"/settings"} onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>Ustawienia</Typography>
                      </MenuItem>
                      <Divider />

                      <MenuItem onClick={logout}>
                        <Typography textAlign='center'>Wyloguj</Typography>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem component={Link} to={"/login"} onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>Zaloguj się</Typography>
                      </MenuItem>
                      <Divider />

                      <MenuItem component={Link} to={"/register"} onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>Zarejestruj się</Typography>
                      </MenuItem>
                    </>
                  )}
                </Box>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </Card>
    </AppBar>
  );
}

export default Navbar;
