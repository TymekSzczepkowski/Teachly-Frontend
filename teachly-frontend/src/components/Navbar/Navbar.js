import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/authContext";
import useAuth from "../../hooks/useAuth";
import LeftDrawer from "./LeftDrawer.js";
import UserMenuItem from "./UserMenuItem";
import { styledButton } from "./style/stylesNavbar";
import { Badge, Divider, Card, styled, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, MenuItem, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
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

  const LinkButton = styled(Button)({ styledButton });

  return (
    <AppBar square={false} elevation={0}>
      <Card variant='outlined'>
        <Container>
          <Toolbar disableGutters>
            <IconButton component={Link} to={"/"} sx={{ display: { xs: "none", md: "flex" } }}>
              <SchoolIcon color='primary' sx={{ fontSize: "40px" }} />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton size='large' onClick={toggleDrawer(true)} color='inherit'>
                <MenuIcon />
              </IconButton>
              <>
                <Drawer open={showLeftMenu} onClose={toggleDrawer(false)}>
                  {LeftDrawer(auth, toggleDrawer)}
                </Drawer>
              </>
            </Box>

            <Box sx={{ justifyContent: "flex-start", flexGrow: 2, display: { xs: "none", md: "flex" } }}>
              <LinkButton>Korepetycje</LinkButton>
              <LinkButton>Zostań korepetytorem</LinkButton>
              <LinkButton>Pomoc</LinkButton>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton size='large'>
                <Badge badgeContent={2} color='primary'>
                  <MailIcon color='action' />
                </Badge>
              </IconButton>

              {auth ? (
                <IconButton onClick={handleOpenUserMenu} id='profile-avatar'>
                  <Avatar sx={{ width: 20, height: 20 }} sx={{ width: 24, height: 24 }} alt='John Doe' src={userDetails.avatar} />
                </IconButton>
              ) : (
                <IconButton onClick={handleOpenUserMenu} size='large' id='profile-icon'>
                  <AccountCircleIcon />
                </IconButton>
              )}

              <Menu
                sx={{ mt: "45px" }}
                elevation={1}
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
                      <UserMenuItem component={Link} to={"/"} onClick={handleCloseUserMenu} title={"Strona główna"} />
                      <UserMenuItem id={"my-account"} component={Link} to={"/myaccount"} onClick={handleCloseUserMenu} title={"Moje konto"} />
                      <UserMenuItem id={"settings"} component={Link} to={"/settings"} onClick={handleCloseUserMenu} title={"Ustawienia"} />
                      <Divider />
                      <MenuItem onClick={logout}>
                        <Typography textAlign='center'>Wyloguj </Typography>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <UserMenuItem id={"sign-in"} component={Link} to={"/login"} onClick={handleCloseUserMenu} title={"Zaloguj się"} />
                      <Divider />
                      <UserMenuItem id={"sign-up"} component={Link} to={"/register"} onClick={handleCloseUserMenu} title={"Zarejestruj się"} />
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
