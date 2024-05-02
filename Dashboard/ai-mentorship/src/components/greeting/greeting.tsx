import Paper from "@mui/material/Paper";
import DisplayCalendar from "./calendar/calendar";
import { LineChart } from "@mui/x-charts/LineChart";
import { Grid, Stack } from "@mui/material";
import ProgressComponent from "./progress/progress";
import Image from "next/image";
import adminPic from "./adminpic.png";

interface GreetingsProps {
  menteesData: number[];
}
const Greetings: React.FC<GreetingsProps> = ({ menteesData }) => {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          padding: 3,
          gap: 2,
          backgroundColor: "#F4F4FA",
        }}
      >
        <Image
          src={adminPic.src}
          alt="image"
          width={250}
          height={350}
          style={{ marginRight: "5%" }}
        />
        <div style={{ marginRight: "5%" }}>
          <DisplayCalendar />
        </div>
        <div
          style={{
            width: "100%",
            borderRadius: 5,
            display: "flex",
          }}
        >
          <ProgressComponent
            totalValue={menteesData[0]}
            withValue={menteesData[1]}
            withNoValue={menteesData[2]}
          />
        </div>
      </Paper>
    </>
  );
};

export default Greetings;
