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
import React, { useEffect, useState } from "react";
import { restartpairingResultsStatus } from "@/redux/dashboard/dashboardSlice";
import { UpdateStatus } from "@/redux/dashboard/actions/updateStatus";
import { FetchCollections } from "@/redux/dashboard/actions/fetchCollection";
import CustomizedSnackbars from "../snackbar/snackBar";
import { GetPairMenteeResult } from "@/redux/dashboard/actions/getPairMenteeResults";
import { GetPairMentorResult } from "@/redux/dashboard/actions/getPairMentorResults";

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

  const userData = useAppSelector((state) => state.dashboard.user);

  useEffect(() => {
    const fetchData = async () => {
      setMenteeName(null);
      setMentorName(null);
      if (chosen && userData) {
        dispatch(restartpairingResultsStatus());
        setMenteeName(null);
        setMentorName(null);
        try {
          if (participatingAs == "Mentee") {
            dispatch(GetPairMenteeResult(chosen));
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
            await dispatch(FetchCollections());
          }
          if (participatingAs == "Mentor") {
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
            await dispatch(FetchCollections());
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
    userData && (
      <Paper>
        <Paper
          elevation={3}
          sx={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            backgroundColor: "#1E1F42",
            color: "white",
          }}
        >
          <Typography fontWeight={"bold"}>RESULTS</Typography>
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
              sx={{
                widht: "100%",
                height: "350px",
                padding: 3,
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
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
                    >
                      {`${menteeName.split(" ")[0][0]}${
                        menteeName.split(" ")[1][0]
                      }`}
                    </Avatar>
                    {menteeName != null && (
                      <div
                        style={{
                          width: "100%",
                          height: "50px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "10%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography fontWeight={"bold"} fontSize={20}>
                            Mentee
                          </Typography>
                          <Typography fontWeight={"light"}>
                            {menteeName}
                          </Typography>
                        </div>
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
                    >{`${mentorName!.split(" ")[0][0]}${
                      mentorName!.split(" ")[1][0]
                    }`}</Avatar>
                    {mentorName != null && (
                      <div
                        style={{
                          width: "100%",
                          height: "50px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "10%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography fontWeight={"bold"} fontSize={20}>
                            Mentor
                          </Typography>
                          <Typography fontWeight={"light"}>
                            {mentorName}
                          </Typography>
                        </div>
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
    )
  );
};

export default PairingComplete;
