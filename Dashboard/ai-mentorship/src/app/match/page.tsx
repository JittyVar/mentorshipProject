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
        console.log("received ", participatingAs);
        const paramArr = [
          {
            url:
              participatingAs === "Mentee"
                ? "/api/put/mentees/inProgressStatus"
                : "/api/put/mentors/inProgressStatus",
            param: chosenData,
          },
        ];

        await dispatch(UpdateStatusToInProgress(paramArr)).then(() => {
          dispatch(FetchCollections());
        });
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
