import DialogComponent from "./Utils/DialogComponent";
import OpinionList from "./Utils/OpinionList";
import { Avatar } from "@mui/material";

function TeacherFeedback() {
  return <DialogComponent id={"teacher-feedback-button"} text={"Opinie o korepetytorze"} avatar={<Avatar sx={{ bgcolor: "#1976d2" }}>+23</Avatar>} component={<OpinionList />}></DialogComponent>;
}

export default TeacherFeedback;
