"use client";

import {
  Avatar,
  CircularProgress,
  Grid,
  Grow,
  Paper,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect, useRef, useState } from "react";
import { restartpairingResultsStatus } from "@/redux/dashboard/dashboardSlice";
import { UpdateStatus } from "@/redux/dashboard/actions/updateStatus";
import { FetchCollections } from "@/redux/dashboard/actions/fetchCollection";
import CustomizedSnackbars from "../snackbar/snackBar";
import { GetPairMenteeResult } from "@/redux/dashboard/actions/getPairMenteeResults";
import { GetPairMentorResult } from "@/redux/dashboard/actions/getPairMentorResults";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface PairingCompleteProps {
  chosen: string;
  participatingAs: string;
}
const PairingComplete: React.FC<PairingCompleteProps> = ({
  chosen,
  participatingAs,
}) => {
  const [menteeName, setMenteeName] = useState<string | null>(null);
  const [mentorName, setMentorName] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      if (chosen) {
        dispatch(restartpairingResultsStatus());
        try {
          if (participatingAs == "Mentee") {
            console.log("getting mentee", chosen);
            dispatch(GetPairMenteeResult(chosen)); //rename
            const matchingResponse = await fetch("/api/pair", {
              next: { revalidate: 60 },
            });

            if (!matchingResponse.ok) {
              throw new Error("failed to fetch data");
            }

            const matchingResults = await matchingResponse.json();
            setMenteeName(matchingResults[0].mentee_name);
            setMentorName(matchingResults[0].mentor_name);

            const completeStatusArr = [
              {
                url: "/api/put/mentees/completeStatus",
                param: [chosen, matchingResults[0]], // Ensure this structure matches the expected type
              },
            ];

            await dispatch(UpdateStatus(completeStatusArr));
            dispatch(FetchCollections());
          }
          if (participatingAs == "Mentor") {
            console.log("getting mentor", chosen);
            await dispatch(GetPairMentorResult(chosen));
            const matchingResponse = await fetch("/api/pair", {
              next: { revalidate: 60 },
            });

            if (!matchingResponse.ok) {
              throw new Error("failed to fetch data");
            }

            const matchingResults = await matchingResponse.json();
            setMenteeName(matchingResults[0].mentee_name);
            setMentorName(matchingResults[0].mentor_name);

            const completeStatusArr = [
              {
                url: "/api/put/mentors/completeStatus",
                param: [chosen, matchingResults[0]], // Ensure this structure matches the expected type
              },
            ];

            await dispatch(UpdateStatus(completeStatusArr));
            dispatch(FetchCollections());
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen!]);

  return (
    <Paper>
      <Paper
        elevation={3}
        sx={{ height: "25px", padding: 2, backgroundColor: "#F4E6F2" }}
      >
        <Typography>RESULTS</Typography>
      </Paper>
      {menteeName == null ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" size={100} />
        </div>
      ) : (
        <>
          <Grid
            container
            spacing={2}
            sx={{ widht: "100%", height: "300px", padding: 3 }}
          >
            <Grow in={true}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Avatar
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                  />
                  {menteeName != null && (
                    <div
                      style={{
                        width: "100%",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{menteeName}</Typography>
                    </div>
                  )}
                </div>
              </Grid>
            </Grow>
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...(true ? { timeout: 1000 } : {})}
            >
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Avatar
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                  />
                  {mentorName != null && (
                    <div
                      style={{
                        width: "100%",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{mentorName}</Typography>
                    </div>
                  )}
                </div>
              </Grid>
            </Grow>
          </Grid>
          <CustomizedSnackbars success={true} />
        </>
      )}
    </Paper>
  );
};

export default PairingComplete;
