import { useState } from "react";
import { Card } from "@mui/material/";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import plLocale from "date-fns/locale/pl";
function Calendar() {
  const [date, setDate] = useState();

  return (
    <Card sx={{ mb: 4 }}>
      <LocalizationProvider adapterLocale={plLocale} dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          views={["day"]}
          displayStaticWrapperAs='desktop'
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
        />
      </LocalizationProvider>
    </Card>
  );
}

export default Calendar;
