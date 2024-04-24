import { Box, CircularProgress, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import CircularWithValueLabel from "./circularprogress/CircularProgressWithLabel";
const ProgressComponent = () => {
  return (
    <div style={{ display: "flex", gap: "20%" }}>
      <CircularWithValueLabel />
      <CircularWithValueLabel />
    </div>
  );
};

export default ProgressComponent;
