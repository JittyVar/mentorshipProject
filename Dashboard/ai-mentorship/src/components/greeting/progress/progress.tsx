"use client";
import CircularWithValueLabel from "./circularprogress/CircularProgressWithLabel";
import { TotalMentees } from "@/redux/dashboard/actions/totalMentees";
import { TotalMentors } from "@/redux/dashboard/actions/totalMentors";
import { WithMentees } from "@/redux/dashboard/actions/withMentees";
import { WithMentors } from "@/redux/dashboard/actions/withMentors";
import { WithNoMentees } from "@/redux/dashboard/actions/withNoMentees";
import { WithNoMentors } from "@/redux/dashboard/actions/withNoMentors";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { Box, Paper } from "@mui/material";
import { useEffect } from "react";

interface ProgressComponentProps {
  totalValue: number;
  withValue: number;
  withNoValue: number;
}
const ProgressComponent: React.FC<ProgressComponentProps> = ({
  totalValue,
  withValue,
  withNoValue,
}) => {
  return (
    <Box display="flex" justifyContent="center" gap={10}>
      <Box display="flex" alignItems="center">
        <CircularWithValueLabel
          total={totalValue}
          withValue={withValue}
          withNoValue={withNoValue}
          displayTotalAs={"Mentors"}
          displayWithAs={"Mentees"}
        />
      </Box>
    </Box>
  );
};

export default ProgressComponent;
