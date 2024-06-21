import Paper from "@mui/material/Paper";
import DisplayCalendar from "./calendar/calendar";
import ProgressComponent from "./progress/progress";
import Image from "next/image";
import adminPic from "./2.png";

interface GreetingsProps {
  menteesData: number[];
  displayTotalAs: string;
  displayWithAs: string;
}
const Greetings: React.FC<GreetingsProps> = ({
  menteesData,
  displayTotalAs,
  displayWithAs,
}) => {
  return (
    <div style={{ display: "flex", gap: "3%" }}>
      <ProgressComponent
        totalValue={menteesData[0]}
        withValue={menteesData[1]}
        withNoValue={menteesData[2]}
        displayTotalAs={displayTotalAs}
        displayWithAs={displayWithAs}
      />
    </div>
  );
};

export default Greetings;
