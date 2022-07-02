import { useState } from "react";
import { TextField } from "@mui/material/";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import plLocale from "date-fns/locale/pl";

function TimePicker({ text, setValue }) {
  const [displayedTime, setDisplayedTime] = useState(" ");
  return (
    <LocalizationProvider adapterLocale={plLocale} dateAdapter={AdapterDateFns}>
      <DesktopTimePicker
        label={text}
        views={["hours", "minutes"]}
        value={displayedTime}
        shouldDisableTime={(timeValue, clockType) => {
          if (clockType === "minutes" && timeValue % 10) {
            return true;
          }

          return false;
        }}
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
