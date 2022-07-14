import Scheduler from "../Scheduler";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";

function CustomWorkingHours({ userDetails, windowReload, type }) {
  const [auth, setAuth] = useAuth([]);
  const [daysToHighlight, setDaysToHighlight] = useState([]);
  const [customDays, setCustomDays] = useState();
  const daysWithCustomHours = [];

  const showCustomWorkingHours = () => {
    axios
      .get(process.env.REACT_APP_API_URL + `lessons/custom-working-hours/`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      })
      .then((response) => {
        setCustomDays(response.data);
        daysWithCustomHours.push(Object.keys(response.data));
        setDaysToHighlight(daysWithCustomHours[0].map((e) => parseInt(e.substr(8, 2))));
      });
  };
  useEffect(() => {
    showCustomWorkingHours();
  }, []);
  return <Scheduler type={type} customDays={customDays} daysToHighlight={daysToHighlight} userDetails={userDetails} windowReload={windowReload} />;
}

export default CustomWorkingHours;
