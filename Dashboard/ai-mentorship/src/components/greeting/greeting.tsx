import Paper from "@mui/material/Paper";
import DisplayCalendar from "./calendar/calendar";
import ProgressComponent from "./progress/progress";
import Pairings from "./pairings/pairings";
import { HomeTableColumns } from "@/data/HomeTableColumns";
import { useEffect } from "react";

interface GreetingProps {
  totalMentees: number;
}
const Greetings: React.FC<GreetingProps> = ({ totalMentees }) => {
  return (
    <>
      <div style={{ display: "flex", gap: "2%" }}>
        <Paper elevation={3} sx={{ width: "65%", padding: "10px" }}>
          <DisplayCalendar />
        </Paper>
        <Paper elevation={3} sx={{ width: "35%", padding: "10px" }}>
          <Pairings />
        </Paper>
      </div>
    </>
  );
};

export default Greetings;
