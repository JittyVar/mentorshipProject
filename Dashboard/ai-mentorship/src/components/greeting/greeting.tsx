import Paper from "@mui/material/Paper";
import DisplayCalendar from "./calendar/calendar";
import ProgressComponent from "./progress/progress";
import Pairings from "./pairings/pairings";
import { HomeTableColumns } from "@/data/HomeTableColumns";
import { useEffect } from "react";
import Image from "next/image";
import adminpic from "./adminpic.png";

interface GreetingProps {
  totalMentees: number;
}
const Greetings: React.FC<GreetingProps> = ({ totalMentees }) => {
  return (
    <>
      <div>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            padding: "10px",
            gap: 5,
            backgroundColor: "#F4F4FA",
          }}
        >
          <Image src={adminpic} width={250} alt="Logo" />
          <DisplayCalendar />
        </Paper>
      </div>
    </>
  );
};

export default Greetings;
