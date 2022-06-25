import CollapseList from "./Utils/CollapseList";
import ListOfOtherOffers from "./Utils/ListOfOtherOffers";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { Avatar } from "@mui/material";

function OtherOffers({ offerDetails }) {
  return (
    <CollapseList
      id={"teacher-feedback-button"}
      text={"Inne ogłoszenia tego korepetytora"}
      avatar={
        <Avatar>
          <TableRowsIcon />
        </Avatar>
      }
      component={<ListOfOtherOffers offerDetails={offerDetails} />}></CollapseList>
  );
}

export default OtherOffers;
