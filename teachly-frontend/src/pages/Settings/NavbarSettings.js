import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Card, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from "@mui/material/";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AbcIcon from "@mui/icons-material/Abc";
import PaymentIcon from "@mui/icons-material/Payment";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PasswordIcon from "@mui/icons-material/Password";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

function NavbarSettings({ setSettingsName }) {
  const [open, setOpen] = useState(false);

  const handleSetSettingsName = (e) => {
    setSettingsName(e.target.innerText);
  };

  const handleExpandMore = () => {
    setOpen(!open);
  };
  return (
    <Card>
      <List
        sx={{
          overflow: "auto",
        }}
        subheader={<ListSubheader>Ustawienia</ListSubheader>}>
        <ListItemButton
          onClick={(e) => {
            handleSetSettingsName(e);
          }}>
          <ListItemIcon>
            <SwitchAccountIcon />
          </ListItemIcon>
          <ListItemText primary='Konto' />
        </ListItemButton>
        <ListItemButton
          onClick={(e) => {
            handleSetSettingsName(e);
          }}>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary='Płatności' />
        </ListItemButton>
        <ListItemButton onClick={handleExpandMore}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary='Dane o profilu' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton
              sx={{ pl: 3 }}
              onClick={(e) => {
                handleSetSettingsName(e);
              }}>
              <ListItemIcon>
                <AbcIcon />
              </ListItemIcon>
              <ListItemText primary='Zmień opis' />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 3 }}
              onClick={(e) => {
                handleSetSettingsName(e);
              }}>
              <ListItemIcon>
                <InsertPhotoIcon />
              </ListItemIcon>
              <ListItemText primary='Zmień zdjęcie profilowe' />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to={"/settings/editemail"}
              sx={{ pl: 3 }}
              onClick={(e) => {
                handleSetSettingsName(e);
              }}>
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary='Zmień email' />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to={"/settings/editpasswordrequest"}
              sx={{ pl: 3 }}
              onClick={(e) => {
                handleSetSettingsName(e);
              }}>
              <ListItemIcon>
                <PasswordIcon />
              </ListItemIcon>
              <ListItemText primary='Zmień hasło' />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          onClick={(e) => {
            handleSetSettingsName(e);
          }}>
          <ListItemIcon>
            <QuestionMarkIcon />
          </ListItemIcon>
          <ListItemText primary='Inne' />
        </ListItemButton>
      </List>
    </Card>
  );
}

export default NavbarSettings;
