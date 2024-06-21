import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Chip, Paper } from "@mui/material";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        "& .MuiCircularProgress-root": {
          color: "#1E1F42",
        },
      }}
    >
      <CircularProgress variant="determinate" {...props} />
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
    <div style={{ display: "flex", width: "100%", height: "100%", gap: 50 }}>
      {/* <CircularProgressWithLabel value={progress} size={280} /> */}
      <Paper
        elevation={3}
        sx={{
          width: "200px",
          height: "70px",
          justifyContent: "center",
          padding: "1%",
        }}
      >
        <div>{`Total ${displayTotalAs}`}</div>
        <Typography
          fontSize={"1.45rem"}
          fontWeight={"bold"}
        >{`${total}`}</Typography>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          width: "200px",
          height: "70px",
          justifyContent: "center",
          padding: "1%",
        }}
      >
        <div>{`With ${displayWithAs}`}</div>
        <Typography
          fontSize={"1.45rem"}
          fontWeight={"bold"}
        >{`${withValue}`}</Typography>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          width: "200px",
          height: "70px",
          justifyContent: "center",
          padding: "1%",
        }}
      >
        <div>{`Without ${displayWithAs}`}</div>
        <Typography
          fontSize={"1.45rem"}
          fontWeight={"bold"}
        >{`${withNoValue}`}</Typography>
      </Paper>
    </div>
  );
};

export default CircularWithValueLabel;
