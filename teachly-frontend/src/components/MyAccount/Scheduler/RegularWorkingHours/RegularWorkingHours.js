import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import Scheduler from "../Scheduler";
export default function RegularWorkingHours({ userDetails, type, windowReload }) {
  const [auth, setAuth] = useAuth([]);
  const [regularDays, setRegularDays] = useState();
  const [daysWithRegularHours, setDaysWithRegularHours] = useState([]);

  const weekDays = [
    { day: 1, name: "Poniedziałek" },
    { day: 2, name: "Wtorek" },
    { day: 3, name: "Środa" },
    { day: 4, name: "Czwartek" },
    { day: 5, name: "Piątek" },
    { day: 6, name: "Sobota" },
    { day: 7, name: "Niedziela" },
  ];

  const showRegularWorkingHours = () => {
    axios
      .get(process.env.REACT_APP_API_URL + `lessons/regular-working-hours/`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      })
      .then((response) => {
        setRegularDays(response.data);
        setDaysWithRegularHours(Object.keys(response.data).map((elem) => parseInt(elem, 10)));
      });
  };

  const includeThatWeekDay = (arr, weekday) => {
    return arr.includes(weekday);
  };

  useEffect(() => {
    showRegularWorkingHours();
  }, []);

  return <Scheduler weekDays={weekDays} type={type} includeThatWeekDay={includeThatWeekDay} regularDays={regularDays} daysWithRegularHours={daysWithRegularHours} userDetails={userDetails} windowReload={windowReload} />;
}
