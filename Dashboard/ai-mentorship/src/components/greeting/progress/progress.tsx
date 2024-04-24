import { Box, CircularProgress, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import CircularProgressWithLabel from "./circularprogress/CircularProgressWithLabel";

const ProgressComponent = () => {
  return (
    <>
      <CircularProgressWithLabel />
      <CircularProgressWithLabel />
    </>
  );
};

export default ProgressComponent;
