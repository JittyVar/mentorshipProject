"use client";

import {
  Avatar,
  CircularProgress,
  Grid,
  Grow,
  Paper,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "@/redux/hook";
import React, { useEffect, useState } from "react";
import { restartpairingResultsStatus } from "@/redux/dashboard/dashboardSlice";
import { UpdateStatus } from "@/redux/dashboard/actions/updateStatus";
import { FetchCollections } from "@/redux/dashboard/actions/fetchCollection";
import CustomizedSnackbars from "../snackbar/snackBar";
import { GetPairMenteeResult } from "@/redux/dashboard/actions/getPairMenteeResults";
import { GetPairMentorResult } from "@/redux/dashboard/actions/getPairMentorResults";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    const fetchData = async () => {
      setMenteeName(null);
      setMentorName(null);
      if (chosen) {
        dispatch(restartpairingResultsStatus());
        setMenteeName(null);
        setMentorName(null);
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

            const rResponse1 = await fetch(
              `/api/get/mentees/pair2?slug=${chosen}`,
              {
                next: { revalidate: 60 },
              }
            );
            if (rResponse1.ok) {
              const responseR = await rResponse1.json();
              console.log(responseR);
            } else {
              console.log("Failed to fetch R data");
            }
            const rResponse2 = await fetch("/api/test-pair", {
              next: { revalidate: 60 },
            });
            if (rResponse2.ok) {
              const responseR = await rResponse2.json();
              setResults(responseR);
            } else {
              console.log("Failed to fetch R data");
            }

            //await dispatch(UpdateStatus(completeStatusArr));
            await dispatch(FetchCollections());
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

            const rResponse1 = await fetch(
              `/api/get/mentors/pair2?slug=${chosen}`,
              {
                next: { revalidate: 60 },
              }
            );
            if (rResponse1.ok) {
              const responseR = await rResponse1.json();
              console.log(responseR);
            } else {
              console.log("Failed to fetch R data");
            }
            const rResponse2 = await fetch("/api/test-pair", {
              next: { revalidate: 60 },
            });
            if (rResponse2.ok) {
              const responseR = await rResponse2.json();
              setResults(responseR);
            } else {
              console.log("Failed to fetch R data");
            }

            //await dispatch(UpdateStatus(completeStatusArr));
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

  interface data {
    unique_id: string;
    fullName: string;
    mentor_fullName: string;
    predicted_cosine_similarity: string;
  }

  const [results, setResults] = useState<data[]>([]);

  const uploadphoto = async () => {
    try {
      const rResponse1 = await fetch(
        "/api/get/mentees/pair2?slug=${encodedId}",
        {
          next: { revalidate: 60 },
        }
      );
      if (rResponse1.ok) {
        const responseR = await rResponse1.json();
        console.log(responseR);
      } else {
        console.log("Failed to fetch R data");
      }
      const rResponse2 = await fetch("/api/test-pair", {
        next: { revalidate: 60 },
      });
      if (rResponse2.ok) {
        const responseR = await rResponse2.json();
        setResults(responseR);
      } else {
        console.log("Failed to fetch R data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    uploadphoto();
  }, []);

  return (
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
      <div>
        {results.map((doc, id) => (
          <>
            Mentee Name= {doc.fullName} Mentor Name = {doc.mentor_fullName}
            <br />
          </>
        ))}
      </div>
    </Paper>
  );
};

export default PairingComplete;
