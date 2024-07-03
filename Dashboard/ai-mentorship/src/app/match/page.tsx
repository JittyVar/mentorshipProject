"use client";
export const dynamic = "force-dynamic";

import React, { Suspense, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Box, Grid, Tab } from "@mui/material";
import ResultsComponent from "@/components/results/resultsComponent";
import MatchTableComponent from "@/components/table/matchPageTable.tsx/table";
import { FetchCollections } from "@/redux/dashboard/actions/fetchCollection";
import { arr } from "@/data/dummyArr";
import { UpdateStatusToInProgress } from "@/redux/dashboard/actions/updateMenteeStatusToInProgress";
import { useSearchParams } from "next/navigation";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { HomeTableColumns } from "@/data/HomeTableColumns";

const MatchContent = () => {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.dashboard.rows);
  const chosenData = useSearchParams()?.get("q");
  const participatingAs = useSearchParams()?.get("r");
  const firstRender = useRef(true);
  const [value, setValue] = React.useState("1");
  const userData = useAppSelector((state) => state.dashboard.user);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchDataFirstRender = async () => {
      if (firstRender.current && userData) {
        await dispatch(FetchCollections());
      }
    };

    firstRender.current = false;
    fetchDataFirstRender();
  }, [dispatch, firstRender, userData]);

  // Update isLoading state when participatingAs is set
  useEffect(() => {
    const paramArr = [
      {
        url:
          participatingAs === "Mentee"
            ? "/api/put/mentees/inProgressStatus"
            : "/api/put/mentors/inProgressStatus",
        param: chosenData,
      },
    ];
    const updateStatus = async () => {
      await Promise.all([
        dispatch(UpdateStatusToInProgress(paramArr)).then(() => {
          dispatch(FetchCollections());
        }),
      ]);
    };

    updateStatus();
  }, [chosenData, dispatch, participatingAs]);

  return (
    userData && (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box
            sx={{
              width: "100%",
              typography: "body1",
              marginTop: "2%",
              marginBottom: "2%",
            }}
          >
            <TabContext value={value}>
              <Box>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#1E1F42",
                    },
                  }}
                >
                  <Tab label="MENTORS" value="1" />
                  <Tab label="MENTEES" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box>
                  <MatchTableComponent
                    collectionData={rows.filter(
                      (e: HomeTableColumns) => e.participatingAs == "Mentor"
                    )}
                    chosenData={chosenData}
                    participatingAs={participatingAs!}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box>
                  <MatchTableComponent
                    collectionData={rows.filter(
                      (e: HomeTableColumns) => e.participatingAs == "Mentee"
                    )}
                    chosenData={chosenData}
                    participatingAs={participatingAs!}
                  />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ marginTop: "6%" }}>
          <ResultsComponent
            data={arr}
            dataOf={chosenData}
            participatingAs={participatingAs}
          />
        </Grid>
      </Grid>
    )
  );
};

const Match = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <MatchContent />
  </Suspense>
);

export default Match;
