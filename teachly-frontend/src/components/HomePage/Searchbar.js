import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Card, Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Searchbar({ parameters, setParameters, firstname }) {
  const [auth, setAuth] = useAuth([]);
  const [allSubjects, setAllSubjects] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + `listings/subjects/`, {}).then((response) => {
      setAllSubjects(response.data);
    });
  }, []);

  return (
    <Card sx={{ marginBottom: "20px" }}>
      <Autocomplete
        id={"seachbar"}
        options={allSubjects.map((subject) => subject.name)}
        sx={{ boxShadow: "none" }}
        onChange={(e, newSubject) => {
          setParameters({ ...parameters, subject: newSubject });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={`Czego chcesz się nauczyć ${auth ? firstname : ""}`}
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
