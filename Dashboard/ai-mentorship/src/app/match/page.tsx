"use client";
export const dynamic = "force-dynamic";

import React, { Suspense, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Box, Grid } from "@mui/material";
import ResultsComponent from "@/components/results/resultsComponent";
import MatchTableComponent from "@/components/table/matchPageTable.tsx/table";
import { FetchCollection } from "@/redux/dashboard/actions/fetchCollection";
import { arr } from "@/data/dummyArr";
import { UpdateStatusToInProgress } from "@/redux/dashboard/actions/updateMenteeStatusToInProgress";
import { useSearchParams } from "next/navigation";

const MatchContent = () => {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.dashboard.rows);
  const chosenData = useSearchParams()?.get("q");
  const participatingAs = useSearchParams()?.get("r");
  const firstLog = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paramArr = [
          {
            url:
              participatingAs === "Mentee"
                ? "/api/put/mentees/inProgressStatus"
                : "/api/put/mentors/inProgressStatus",
            param: chosenData,
          },
        ];

        await dispatch(UpdateStatusToInProgress(paramArr));
        dispatch(FetchCollection());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (firstLog.current) {
      fetchData();
      firstLog.current = false;
    }
  }, [dispatch, firstLog, chosenData, participatingAs]);

  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <MatchTableComponent collectionData={rows} chosenData={chosenData} />
        </Grid>
        <Grid item xs={6}>
          <ResultsComponent
            data={arr}
            dataOf={chosenData}
            participatingAs={participatingAs}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const Match = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <MatchContent />
  </Suspense>
);

export default Match;
