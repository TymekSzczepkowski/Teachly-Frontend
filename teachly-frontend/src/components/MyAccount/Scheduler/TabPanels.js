import { useState, useContext } from "react";
import "moment/locale/pl";
import CustomWorkingHours from "./CustomWorkingHours/CustomWorkingHours";
import authContext from "../../../context/authContext";
import { Tabs, Tab, Card, Box } from "@mui/material/";
import DaysOff from "./DaysOff/DaysOff";
import RegularWorkingHours from "./RegularWorkingHours/RegularWorkingHours";

function TabPanels({ windowReload }) {
  const { userDetails } = useContext(authContext);
  const [type, setType] = useState(0);

  const handleChange = (event, newValue) => {
    setType(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
        {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <Card sx={{ mb: 4 }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center", width: "100%" }}>
          <Tabs allowScrollButtonsMobile variant='scrollable' scrollButtons value={type} onChange={handleChange}>
            <Tab label='Regularne dni dostępności' />
            <Tab label='Nieregularne dni dostępności' />
            <Tab label='Dni wolne' />
          </Tabs>
        </Box>
        <TabPanel value={type} index={0}>
          <RegularWorkingHours type={type} userDetails={userDetails} windowReload={windowReload} />
        </TabPanel>
        <TabPanel value={type} index={1}>
          <CustomWorkingHours type={type} userDetails={userDetails} windowReload={windowReload} />
        </TabPanel>
        <TabPanel value={type} index={2}>
          <DaysOff type={type} userDetails={userDetails} windowReload={windowReload} />
        </TabPanel>
      </Box>
    </Card>
  );
}

export default TabPanels;
