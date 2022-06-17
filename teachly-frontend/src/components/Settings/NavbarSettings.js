import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListItemSettings from "./ListItemSettings";
import { Collapse, Card, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from "@mui/material/";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AbcIcon from "@mui/icons-material/Abc";
import PaymentIcon from "@mui/icons-material/Payment";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PasswordIcon from "@mui/icons-material/Password";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
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
        <ListItemSettings id='account-settings' func={handleSetSettingsName} title={"Konto"} icon={<SwitchAccountOutlinedIcon />}></ListItemSettings>
        <ListItemSettings id='payment-settings' func={handleSetSettingsName} title={"Płatność"} icon={<PaymentIcon />}></ListItemSettings>
        <ListItemButton onClick={handleExpandMore}>
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText id='profile-data' primary='Dane o profilu' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List sx={{ pl: 1 }} component='div' disablePadding>
            <ListItemSettings id='description-settings' func={handleSetSettingsName} title={"Zmień opis"} icon={<AbcIcon />}></ListItemSettings>
            <ListItemSettings id='avatar-settings' func={handleSetSettingsName} title={"Zmień zdjęcie profilowe"} icon={<PhotoLibraryOutlinedIcon />}></ListItemSettings>
            <ListItemSettings component={Link} to={"/settings/editemail"} id='change-email' func={handleSetSettingsName} title={"Zmień email"} icon={<ContactMailOutlinedIcon />}></ListItemSettings>
            <ListItemSettings component={Link} to={"/settings/editpassword"} id='change-password' func={handleSetSettingsName} title={"Zmień hasło"} icon={<PasswordIcon />}></ListItemSettings>
          </List>
        </Collapse>
        <ListItemSettings func={handleSetSettingsName} title={"Inne"} icon={<QuestionMarkIcon />}></ListItemSettings>
      </List>
    </Card>
  );
}

export default NavbarSettings;
