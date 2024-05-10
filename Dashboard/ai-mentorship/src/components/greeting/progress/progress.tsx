"use client";
import CircularWithValueLabel from "./circularprogress/CircularProgressWithLabel";
import { Box } from "@mui/material";

interface ProgressComponentProps {
  totalValue: number;
  withValue: number;
  withNoValue: number;
  displayTotalAs: string;
  displayWithAs: string;
}
const ProgressComponent: React.FC<ProgressComponentProps> = ({
  totalValue,
  withValue,
  withNoValue,
  displayTotalAs,
  displayWithAs,
}) => {
  return (
    <Box display="flex" justifyContent="center" gap={10}>
      <Box display="flex" alignItems="center">
        <CircularWithValueLabel
          total={totalValue}
          withValue={withValue}
          withNoValue={withNoValue}
          displayTotalAs={displayTotalAs}
          displayWithAs={displayWithAs}
        />
      </Box>
    </Box>
  );
};

export default ProgressComponent;
