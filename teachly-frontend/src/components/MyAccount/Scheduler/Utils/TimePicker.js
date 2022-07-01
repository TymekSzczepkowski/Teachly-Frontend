import { TextField } from "@mui/material/";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import plLocale from "date-fns/locale/pl";

function TimePicker({ text, setValue, value, func }) {
  return (
    <LocalizationProvider adapterLocale={plLocale} dateAdapter={AdapterDateFns}>
      <DesktopTimePicker
        label={text}
        views={["hours", "minutes"]}
        value={value}
        shouldDisableTime={(timeValue, clockType) => {
          if (clockType === "minutes" && timeValue % 10) {
            return true;
          }

          return false;
        }}
        // onChange={(newValue) => {
        //   setValue(newValue);
        // }}
        onChange={func}
        renderInput={(params) => <TextField sx={{ mt: 2 }} {...params} />}
      />
    </LocalizationProvider>
  );
}

export default TimePicker;
