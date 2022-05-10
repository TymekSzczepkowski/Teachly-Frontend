import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, MenuItem, List, Divider, ListItem, Drawer, ListItemIcon, ListItemText, Switch, ListSubheader } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SchoolIcon from "@mui/icons-material/School";
import JohnDoe from "../../pages/Auth/Register/data/guy.jpeg";

function Navbar() {
  const [auth, setAuth] = useAuth();

  const logout = (e) => {
    e.preventDefault();
    handleCloseUserMenu();
    setAuth(false);
  };

  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(null);

  const handleOpenUserMenu = (event) => {
    setShowUserMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setShowUserMenu(null);
  };

  const toggleDrawer = (open) => () => {
    setShowLeftMenu(open);
  };

  const list = () => (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      {auth ? (
        <>
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Znajdź korepetytora' />
            </ListItem>
          </List>
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Zostań korepetytorem' />
            </ListItem>
          </List>
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Wirtualna klasa' />
            </ListItem>
          </List>
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Skontaktuj się' />
            </ListItem>
          </List>
          <Divider />
        </>
      ) : (
        <>
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Znajdź korepetytora' />
            </ListItem>
          </List>
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Zostań korepetytorem' />
            </ListItem>
          </List>
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Skontaktuj się' />
            </ListItem>
          </List>
          <Divider />
        </>
      )}
    </Box>
  );
  return (
    <AppBar>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <SchoolIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            TEACHLY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size='large' aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={toggleDrawer(true)} color='inherit'>
              <MenuIcon />
            </IconButton>
            <>
              <Drawer open={showLeftMenu} onClose={toggleDrawer(false)}>
                {list()}
              </Drawer>
            </>
          </Box>

          <SchoolIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            TEACHLY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {auth ? (
              <>
                <Button sx={{ my: 2, color: "white", display: "block" }}>Znajdź korepetytora</Button>
                <Button sx={{ my: 2, color: "white", display: "block" }}>Zostań korepetytorem</Button>
                <Button sx={{ my: 2, color: "white", display: "block" }}>Wirtualna klasa</Button>
                <Button sx={{ my: 2, color: "white", display: "block" }}>Skontaktuj się</Button>
              </>
            ) : (
              <>
                <Button sx={{ my: 2, color: "white", display: "block" }}>Znajdź korepetytora</Button>
                <Button sx={{ my: 2, color: "white", display: "block" }}>Zostań korepetytorem</Button>
                <Button sx={{ my: 2, color: "white", display: "block" }}>Skontaktuj się</Button>
              </>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {auth ? (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='John Doe' src={JohnDoe} />
              </IconButton>
            ) : (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='John Doe' />
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
                <>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>Moje konto</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>Moje zajęcia</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>Ustawienia</Typography>
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <Typography textAlign='center'>Wyloguj</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>Zarejestruj się</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>Zaloguj się</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
