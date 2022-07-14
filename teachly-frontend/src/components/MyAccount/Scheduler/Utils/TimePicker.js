import { useState } from "react";
import { TextField } from "@mui/material/";
import { TimePicker as TimePickers } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import plLocale from "date-fns/locale/pl";

function TimePicker({ text, setValue }) {
  const [displayedTime, setDisplayedTime] = useState(new Date());
  return (
    <LocalizationProvider adapterLocale={plLocale} dateAdapter={AdapterDateFns}>
      <TimePickers
        label={text}
        views={["hours", "minutes"]}
        value={displayedTime}
        onChange={(newValue) => {
          setDisplayedTime(newValue);
          setValue(newValue.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }}
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
    </LocalizationProvider>
  );
}

export default TimePicker;
