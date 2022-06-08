import { Avatar, AvatarGroup } from "@mui/material";

import DialogComponent from "./Utils/DialogComponent";
import OpinionList from "./Utils/OpinionList";

function TeacherFeedback() {
  return <DialogComponent text={"Opinie o korepetytorze"} avatar={<Avatar sx={{ bgcolor: "#1976d2" }}>+23</Avatar>} component={<OpinionList />}></DialogComponent>;
}

export default TeacherFeedback;
