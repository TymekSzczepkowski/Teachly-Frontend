import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Card, Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const API_URL = process.env.REACT_APP_API_URL;

function Searchbar({ parameters, setParameters }) {
  const [auth, setAuth] = useAuth([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    if (auth) {
      axios
        .get(API_URL + `listings/subjects/`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((response) => {
          setAllSubjects(response.data);
        });
    }
  }, []);

  return (
    <Card sx={{ marginBottom: "20px" }}>
      <Autocomplete
        options={allSubjects.map((subject) => subject.name)}
        sx={{ boxShadow: "none" }}
        onChange={(e, newSubject) => {
          setParameters({ ...parameters, subject: newSubject });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder='Czego chcesz się nauczyć'
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ ml: 1, width: 20, height: 20, color: "text.disabled" }} />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Card>
  );
}

export default Searchbar;
