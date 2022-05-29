import React, { useState, useEffect } from "react";
import { useMediaQuery, Collapse, Slider, Typography, ListItem, Checkbox, ListSubheader, ListItemIcon, Autocomplete, List, Card, TextField, ListItemText, ListItemButton, Box, InputAdornment } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MapIcon from "@mui/icons-material/Map";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
function Filter({ parameters, setParameters }) {
  const marks = [
    {
      value: 0,
      label: "0zł/h",
    },
    {
      value: 150,
      label: "150zł/h",
    },

    {
      value: 300,
      label: "300zł/h",
    },
  ];
  const [valueSlider, setValueSlider] = useState([0, 300]);

  const handleChange = (event, newValue) => {
    setValueSlider(newValue);
    setParameters({ ...parameters, price_from: valueSlider[0], price_to: valueSlider[1] });
  };
  const [open, setOpen] = useState(false);

  const matches = useMediaQuery("(min-width:900px)");
  const handleClick = () => {
    if (matches === false) {
      setOpen(!open);
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {
    if (matches) setOpen(true);
  }, [matches]);

  return (
    <Card sx={{ position: "sticky", zIndex: 5, top: 80 }}>
      {!matches && (
        <List sx={{ width: "100%" }}>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <SortIcon />
            </ListItemIcon>
            <ListItemText primary={"Filtrowanie"} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </List>
      )}
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List sx={{ width: "100%", marginBottom: "10px" }} subheader={matches && <ListSubheader>Filtrowanie</ListSubheader>}>
          <ListItem>
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='h6'>Poziom</Typography>} />
          </ListItem>
          <ListItem secondaryAction={<Checkbox edge='end' />} disablePadding>
            <ListItemButton>
              <ListItemText secondary={`Szkoła podstawowa`} />
            </ListItemButton>
          </ListItem>
          <ListItem secondaryAction={<Checkbox edge='end' />} disablePadding>
            <ListItemButton>
              <ListItemText secondary={`Liceum`} />
            </ListItemButton>
          </ListItem>
          <ListItem secondaryAction={<Checkbox edge='end' />} disablePadding>
            <ListItemButton>
              <ListItemText secondary={`Szkoła wyższa`} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='h6'>Cena</Typography>} />
          </ListItem>
          <ListItem>
            <Box sx={{ width: "100%", mx: 2, mt: 4 }}>
              <Slider value={valueSlider} step={10} max={300} onChange={handleChange} valueLabelDisplay='on' marks={marks} />
            </Box>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='h6'>Lokalizacja</Typography>}></ListItemText>
          </ListItem>
          <ListItem>
            <Box sx={{ width: "100%" }}>
              <Autocomplete
                // options={options}
                // value={valueAutocomplete}
                // onChange={(newValue) => {
                //   setValueAutocomplete(newValue);
                // }}
                // inputValue={inputValue}
                // onInputChange={(newInputValue) => {
                //   setInputValue(newInputValue);
                // }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='standard'
                    placeholder='Gdzie chcesz szukać korepetycji'
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      startAdornment: (
                        <InputAdornment position='start'>
                          <LocationOnIcon sx={{ ml: 1, width: 20, height: 20, color: "text.disabled" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </ListItem>
        </List>
      </Collapse>
    </Card>
  );
}

export default Filter;
