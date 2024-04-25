import Paper from "@mui/material/Paper";
import DisplayCalendar from "./calendar/calendar";
import { LineChart } from "@mui/x-charts/LineChart";
import { Grid, Stack } from "@mui/material";
import ProgressComponent from "./progress/progress";

interface GreetingProps {
  totalMentees: number;
}
const Greetings: React.FC<GreetingProps> = ({ totalMentees }) => {
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
        <DisplayCalendar />
        <div
          style={{
            width: "100%",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProgressComponent />
        </div>
      </Paper>
    </>
  );
};

export default Greetings;
