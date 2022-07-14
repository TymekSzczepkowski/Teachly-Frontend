import Scheduler from "../Scheduler";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
// [
//   {
//     id: "01gBLKW",
//     teacher: {
//       id: "xwK1LX6",
//       avatar: "http://127.0.0.1:8013/media/avatars/guy2_Zyuxw7x.jpeg",
//       type: "Teacher",
//       email: "jeh@gmail.com",
//       first_name: "Tomasz",
//       last_name: "Tegoniemasz",
//       sex: "male",
//       country: "Poland",
//       county: "Pomorskie",
//       city: "Starogard Gdański",
//     },
//     date: "2022-07-16",
//   },
//   {
//     id: "o24v8XR",
//     teacher: {
//       id: "xwK1LX6",
//       avatar: "http://127.0.0.1:8013/media/avatars/guy2_Zyuxw7x.jpeg",
//       type: "Teacher",
//       email: "jeh@gmail.com",
//       first_name: "Tomasz",
//       last_name: "Tegoniemasz",
//       sex: "male",
//       country: "Poland",
//       county: "Pomorskie",
//       city: "Starogard Gdański",
//     },
//     date: "2022-07-15",
//   },
// ];
function DaysOff({ userDetails, windowReload, type }) {
  const [auth, setAuth] = useAuth([]);
  const [daysToHighlight, setDaysToHighlight] = useState([]);
  const [daysOffDays, setDaysOffDays] = useState();
  const daysWithDaysOff = [];
  const showDaysOff = () => {
    axios
      .get(process.env.REACT_APP_API_URL + `lessons/days-off/`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      })
      .then((response) => {
        setDaysOffDays(response.data);
        daysWithDaysOff.push(...response.data.map((day) => day.date));
        setDaysToHighlight(daysWithDaysOff.map((e) => parseInt(e.substr(8, 2))));
      });
  };
  useEffect(() => {
    showDaysOff();
  }, []);
  return <Scheduler type={type} daysOffDays={daysOffDays} daysToHighlight={daysToHighlight} userDetails={userDetails} windowReload={windowReload} />;
}

export default DaysOff;
