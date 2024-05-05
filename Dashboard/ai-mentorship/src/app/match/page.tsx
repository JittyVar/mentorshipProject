"use client";
export const dynamic = "force-dynamic";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Box, Grid } from "@mui/material";
import ResultsComponent from "@/components/results/resultsComponent";
import MatchTableComponent from "@/components/table/matchPageTable.tsx/table";
import { FetchCollections } from "@/redux/dashboard/actions/fetchCollection";
import { arr } from "@/data/dummyArr";
import { UpdateStatusToInProgress } from "@/redux/dashboard/actions/updateMenteeStatusToInProgress";
import { useSearchParams } from "next/navigation";
import { GetPairResult } from "@/redux/dashboard/actions/getPairResults";
import { UpdateStatus } from "@/redux/dashboard/actions/updateStatus";

const MatchContent = () => {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.dashboard.rows);
  const chosenData = useSearchParams()?.get("q");
  const [participatingAs, setParticipatingAs] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true); // Add a state variable to track loading state
  const firstRender = useRef(true);

  useEffect(() => {
    const fetchDataFirstRender = async () => {
      if (firstRender) {
        await dispatch(FetchCollections());
      }
    };

    firstRender.current = false;
    fetchDataFirstRender();
  }, [dispatch, firstRender]);

  useEffect(() => {
    const foundData = rows.find((e) => e.fullName === chosenData);
    setParticipatingAs(foundData?.participatingAs);
  }, [chosenData, rows]);

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
        const completeStatusArr = [
          {
            url:
              participatingAs === "Mentee"
                ? "/api/put/mentees/completeStatus"
                : "/api/put/mentors/completeStatus",
            param: chosenData,
          },
        ];

        await dispatch(UpdateStatusToInProgress(paramArr));

        // Delay for 5 seconds
        setTimeout(async () => {
          await dispatch(GetPairResult(chosenData!));
          dispatch(UpdateStatus(completeStatusArr)).then(() => {
            dispatch(FetchCollections());
          });
        }, 5000); // 5000 milliseconds = 5 seconds
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!isLoading) {
      // Check if the first useEffect has completed
      fetchData();
    }
  }, [dispatch, isLoading, chosenData, participatingAs]);

  // Update isLoading state when participatingAs is set
  useEffect(() => {
    if (participatingAs !== undefined) {
      setIsLoading(false);
    }
  }, [participatingAs]);

  return (
    <Box paddingTop={5}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <MatchTableComponent
            collectionData={rows}
            chosenData={chosenData}
            participatingAs={participatingAs}
          />
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

const Match = () => <MatchContent />;

export default Match;
