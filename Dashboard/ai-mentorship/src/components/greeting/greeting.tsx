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
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          padding: 3,
          backgroundColor: "#F4F4FA",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <ProgressComponent
            totalValue={menteesData[0]}
            withValue={menteesData[1]}
            withNoValue={menteesData[2]}
            displayTotalAs={displayTotalAs}
            displayWithAs={displayWithAs}
          />
        </div>
      </Paper>
    </div>
  );
};

export default Greetings;
