import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext } from "../../context/ColorModeContext";
import useAuth from "../../hooks/useAuth";
import LeftDrawer from "./LeftDrawer.js";
import { Paper, styled, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, MenuItem, Drawer } from "@mui/material";
import guyPhoto from "../../pages/Auth/Register/data/guy.jpeg";
import MenuIcon from "@mui/icons-material/Menu";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  const { colorMode, setColorMode } = useContext(ColorModeContext);
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(null);
  const [auth, setAuth] = useAuth();

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

  const handleColorModeChange = () => {
    setColorMode(!colorMode);
  };

  const changeColorButton = () => {
    return (
      <>
        {colorMode ? (
          <IconButton onClick={handleColorModeChange}>
            <BrightnessHighIcon color='primary' />
          </IconButton>
        ) : (
          <IconButton onClick={handleColorModeChange}>
            <Brightness4Icon color='primary' />
          </IconButton>
        )}
      </>
    );
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
      <Paper elevation={1}>
        <Container>
          <Toolbar disableGutters>
            <SchoolIcon color='primary' sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: "30px" }} />
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
                  {LeftDrawer(auth, colorMode, toggleDrawer, handleColorModeChange)}
                </Drawer>
              </>
            </Box>
            <SchoolIcon color='primary' sx={{ display: { xs: "flex", md: "none" }, mr: 1, fontSize: "30px" }} />
            <Typography
              variant='h5'
              noWrap
              component={Link}
              to={"/"}
              href=''
              sx={{
                fontSize: "30px",
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 600,
                color: "inherit",
                textDecoration: "none",
              }}>
              teachly
            </Typography>
            <Box sx={{ justifyContent: "flex-start", flexGrow: 2, display: { xs: "none", md: "flex" } }}>
              <LinkButton>Znajdź korepetytora</LinkButton>
              <LinkButton>Zostań korepetytorem</LinkButton>
              <LinkButton>Jak to działa</LinkButton>
            </Box>
            <Box sx={{ justifyContent: "flex-end", flexGrow: 2, display: { xs: "none", md: "flex" } }}>{changeColorButton()}</Box>

            <Box sx={{ flexGrow: 0 }}>
              {auth ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ width: 32, height: 32 }} alt='John Doe' src={guyPhoto} />
                </IconButton>
              ) : (
                <IconButton color='primary' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon />
                </IconButton>
              )}

              <Menu
                sx={{ mt: "45px" }}
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
                {auth ? (
                  <div>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>Moje konto</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>Moje zajęcia</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>Wiadomości</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>Ustawienia</Typography>
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      <Typography textAlign='center'>Wyloguj</Typography>
                    </MenuItem>
                  </div>
                ) : (
                  <div>
                    <MenuItem component={Link} to={"/login"} onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>Zaloguj się</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to={"/register"} onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>Zarejestruj się</Typography>
                    </MenuItem>
                  </div>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </Paper>
    </AppBar>
  );
}

export default Navbar;
