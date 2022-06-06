import moment from "moment";
import "moment/locale/pl";

import { AccordionSummary, Typography } from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function LessonHeading({ lessonTitle, subject, date }) {
  return (
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography sx={{ width: "33%", flexShrink: 0 }}>{lessonTitle}</Typography>
      <Typography sx={{ width: "33%", color: "text.secondary" }}>{subject}</Typography>
      <Typography sx={{ color: "text.secondary" }}>{moment(date).locale("pl").format("lll")}</Typography>
    </AccordionSummary>
  );
}

export default LessonHeading;
