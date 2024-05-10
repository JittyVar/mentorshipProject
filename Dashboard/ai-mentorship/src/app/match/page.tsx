"use client";
export const dynamic = "force-dynamic";

import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Box, Grid } from "@mui/material";
import ResultsComponent from "@/components/results/resultsComponent";
import MatchTableComponent from "@/components/table/matchPageTable.tsx/table";
import { FetchCollections } from "@/redux/dashboard/actions/fetchCollection";
import { arr } from "@/data/dummyArr";
import { UpdateStatusToInProgress } from "@/redux/dashboard/actions/updateMenteeStatusToInProgress";
import { useSearchParams } from "next/navigation";
import { GetPairMenteeResult } from "@/redux/dashboard/actions/getPairMenteeResults";

const MatchContent = () => {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.dashboard.rows);
  const chosenData = useSearchParams()?.get("q");
  const participatingAs = useSearchParams()?.get("r");
  const [isLoading, setIsLoading] = useState(true); // Add a state variable to track loading state
  const firstRender = useRef(true);
  const dataRender = useRef(true);

  useEffect(() => {
    const fetchDataFirstRender = async () => {
      if (firstRender.current) {
        await dispatch(FetchCollections());
      }
    };

    firstRender.current = false;
    fetchDataFirstRender();
  }, [dispatch, firstRender]);

  // Update isLoading state when participatingAs is set
  useEffect(() => {
    if (dataRender.current) {
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

        dispatch(UpdateStatusToInProgress(paramArr)).then(() => {
          dispatch(FetchCollections());
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    dataRender.current = false;
  }, [chosenData, dispatch, participatingAs]);

  return (
    <Box paddingTop={5}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <MatchTableComponent
            collectionData={rows}
            chosenData={chosenData}
            participatingAs={participatingAs!}
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

const Match = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <MatchContent />
  </Suspense>
);

export default Match;
