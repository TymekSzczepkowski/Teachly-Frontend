import React, { useState, useEffect } from "react";
import ListItemCheckbox from "./Lesson/ListItemCheckbox";
import ListItemTitle from "./Lesson/ListItemTitle";
import { Divider, useMediaQuery, Collapse, Slider, ListItem, ListSubheader, ListItemIcon, Autocomplete, List, Card, TextField, ListItemText, ListItemButton, Box, InputAdornment } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MapIcon from "@mui/icons-material/Map";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import cities from "../../data/cities.json";

function Filter({ parameters, setParameters }) {
  const [valueSlider, setValueSlider] = useState([40, 200]);
  const [checked, setChecked] = useState();
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

  const handleChangeCheckbox = (event) => {
    if (checked === event.target.value) {
      setChecked(null);
      setParameters({ ...parameters, level: "" });
    } else {
      setChecked(event.target.value);
      setParameters({ ...parameters, level: event.target.value });
    }
  };

  const handleChangeSlider = (event, newValue) => {
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
          <ListItemTitle title={"Lokalizacja"} icon={<MapIcon />} />
          <ListItem sx={{ marginBottom: "1rem" }}>
            <Box sx={{ width: "100%" }}>
              <Autocomplete
                id={"location-filter"}
                options={cities.map((city) => city.city)}
                onChange={(e, newCity) => {
                  setParameters({ ...parameters, localization: newCity });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Gdzie chcesz się nauczyć'
                    InputProps={{
                      ...params.InputProps,
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
          <Divider light />
          <ListItemTitle title={"Cena"} icon={<AccountBalanceWalletIcon />} />
          <ListItem sx={{ marginBottom: "1rem" }}>
            <Box sx={{ width: "100%", mx: 2 }}>
              <Slider value={valueSlider} step={10} max={300} onChange={handleChangeSlider} valueLabelDisplay='auto' marks={marks} />
            </Box>
          </ListItem>
          <Divider light />
          <ListItemTitle title={"Poziom"} icon={<AutoStoriesIcon />} />
          <ListItemCheckbox value='Primary' checked={checked} title='Szkoła podstawowa' func={handleChangeCheckbox} />
          <ListItemCheckbox value='High School' checked={checked} title='Liceum' func={handleChangeCheckbox} />
          <ListItemCheckbox value='University' checked={checked} title='Szkoła wyższa' func={handleChangeCheckbox} />
        </List>
      </Collapse>
    </Card>
  );
}

export default Filter;
