"use client";
import LabTabs from "@/components/tabs/tabs";
import { FetchMenteeCollections } from "@/redux/dashboard/actions/fetchMenteeCollection";
import { FetchMentorCollections } from "@/redux/dashboard/actions/fetchMentorCollections";
import { TotalMentees } from "@/redux/dashboard/actions/totalMentees";
import { TotalMentors } from "@/redux/dashboard/actions/totalMentors";
import { WithMentees } from "@/redux/dashboard/actions/withMentees";
import { WithMentors } from "@/redux/dashboard/actions/withMentors";
import { WithNoMentees } from "@/redux/dashboard/actions/withNoMentees";
import { WithNoMentors } from "@/redux/dashboard/actions/withNoMentors";
import { APIStatus, restartStatus } from "@/redux/dashboard/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const firstLog = useRef(true);
  const mentorRows = useAppSelector((state) => state.dashboard.mentorRows);
  const menteeRows = useAppSelector((state) => state.dashboard.menteeRows);
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

  const menteesData = [totalMentees, withMentors, withNoMentors];
  const mentorsData = [totalMentors, withMentees, withNoMentees];

  useEffect(() => {
    if (firstLog.current) {
      const fetchData = async () => {
        try {
          await Promise.all([
            dispatch(FetchMenteeCollections()),
            dispatch(FetchMentorCollections()),
            dispatch(TotalMentees()),
            dispatch(TotalMentors()),
            dispatch(WithMentees()),
            dispatch(WithMentors()),
            dispatch(WithNoMentees()),
            dispatch(WithNoMentors()),
            dispatch(restartStatus(APIStatus.idle)),
          ]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
      firstLog.current = false;
    }
  }, [dispatch, firstLog]);

  return (
    <Box>
      <LabTabs
        mentorRows={mentorRows}
        menteeRows={menteeRows}
        mentorsData={mentorsData}
        menteesData={menteesData}
      />
    </Box>
  );
}
