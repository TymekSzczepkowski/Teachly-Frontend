import moment from "moment";
import "moment/locale/pl";
import { AccordionSummary, Typography, Grid } from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function LessonHeading({ lessonTitle, subject, date, id }) {
  return (
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Grid container>
        <Grid item xs={9}>
          <Typography id={id} sx={{ flexShrink: 0 }}>
            {lessonTitle}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ color: "text.secondary" }}>{moment(date).locale("pl").format("lll")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ color: "text.secondary" }}>{subject}</Typography>
        </Grid>
      </Grid>
    </AccordionSummary>
  );
}

export default LessonHeading;
