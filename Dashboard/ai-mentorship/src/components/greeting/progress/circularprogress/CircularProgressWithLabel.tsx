import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Chip } from "@mui/material";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} color="secondary" />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}% COMPLETE`}</Typography>
      </Box>
    </Box>
  );
}
interface CircularWithValueLabelProps {
  total: number;
  withValue: number;
  withNoValue: number;
  displayTotalAs: string;
  displayWithAs: string;
}
const CircularWithValueLabel: React.FC<CircularWithValueLabelProps> = ({
  total,
  withValue,
  withNoValue,
  displayTotalAs,
  displayWithAs,
}) => {
  const progress = (withValue / total) * 100;

  return (
    <div style={{ display: "flex", gap: 50 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          justifyContent: "center",
        }}
      >
        <Chip
          label={`Total ${displayTotalAs} ${total}`}
          color="primary"
          variant="filled"
          sx={{
            backgroundColor: "#1E1F42",
            fontSize: "1rem",
            fontWeight: "bold",
            height: "50px",
          }}
        />
        <Chip
          label={`With ${displayWithAs} ${withValue}`}
          color="primary"
          variant="outlined"
          sx={{
            borderColor: "#1E1F42",
            color: "#1E1F42",
            fontSize: "1rem",
            fontWeight: "bold",
            height: "50px",
          }}
        />
        <Chip
          label={`With No ${displayWithAs} ${withNoValue}`}
          color="primary"
          variant="outlined"
          sx={{
            borderColor: "#1E1F42",
            color: "#1E1F42",
            fontSize: "1rem",
            fontWeight: "bold",
            height: "50px",
          }}
        />
      </div>
      <CircularProgressWithLabel value={progress} size={180} />
    </div>
  );
};

export default CircularWithValueLabel;
