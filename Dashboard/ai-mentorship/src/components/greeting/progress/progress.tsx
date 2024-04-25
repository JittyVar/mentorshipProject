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

const ProgressComponent = () => {
  const totalMentees = useAppSelector((state) => state.dashboard.totalMentees);
  const totalMentors = useAppSelector((state) => state.dashboard.totalMentors);
  const withMentees = useAppSelector((state) => state.dashboard.withMentees);
  const withMentors = useAppSelector((state) => state.dashboard.withMentors);
  const withNoMentees = useAppSelector(
    (state) => state.dashboard.withNoMentees
  );
  const withNoMentors = useAppSelector(
    (state) => state.dashboard.withNoMentors
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTotalMenteesData = async () => {
      try {
        await Promise.all([
          dispatch(TotalMentees()),
          dispatch(TotalMentors()),
          dispatch(WithMentees()),
          dispatch(WithMentors()),
          dispatch(WithNoMentees()),
          dispatch(WithNoMentors()),
        ]);
      } catch (error) {
        console.error("Error fetching total mentees:", error);
      }
    };

    fetchTotalMenteesData();
  }, [dispatch]);

  return (
    <Box display="flex" justifyContent="center" gap={10}>
      <Box display="flex" alignItems="center">
        <CircularWithValueLabel
          total={totalMentees}
          withValue={withMentors}
          withNoValue={withNoMentors}
          displayTotalAs={"Mentees"}
          displayWithAs={"Mentors"}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <CircularWithValueLabel
          total={totalMentors}
          withValue={withMentees}
          withNoValue={withNoMentees}
          displayTotalAs={"Mentors"}
          displayWithAs={"Mentees"}
        />
      </Box>
    </Box>
  );
};

export default ProgressComponent;
