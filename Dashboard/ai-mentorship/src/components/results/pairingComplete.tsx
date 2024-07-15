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

interface MahsaResult {
  mentee_email: string;
  mentee_name: string;
  mentor_email: string;
  mentor_name: string;
}

interface data {
  unique_id: string;
  fullName: string;
  mentor_fullName: string;
  predicted_cosine_similarity: string;
}

interface PairingCompleteProps {
  chosen: string;
  participatingAs: string;
}
const PairingComplete: React.FC<PairingCompleteProps> = ({
  chosen,
  participatingAs,
}) => {
  const [test, setTest] = useState<MahsaResult[]>([]);
  const [menteeName, setMenteeName] = useState<string | null>(null);
  const [mentorName, setMentorName] = useState<string | null>(null);
  const [results, setResults] = useState<data[] | null>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setMenteeName(null);
      setMentorName(null);
      if (chosen) {
        dispatch(restartpairingResultsStatus());
        setMenteeName(null);
        setMentorName(null);
        setResults(null);
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

            const matchingResults: MahsaResult[] =
              await matchingResponse.json();
            const filtermatchingResults = matchingResults
              .filter((doc) => doc.mentee_name !== "NA")
              .slice(0, 3);
            setTest(filtermatchingResults);
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

            const matchingResults: MahsaResult[] =
              await matchingResponse.json();
            const filtermatchingResults = matchingResults
              .filter((doc) => doc.mentor_name !== "NA")
              .slice(0, 3);
            setTest(filtermatchingResults);
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
      {test.length === 0 ? (
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
        <div
          style={{
            display: "flex",
            alignItems: "left",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          {test.map((doc, id) => (
            <div key={id}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <Avatar
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    {participatingAs == "Mentee" &&
                      (doc.mentor_name !== "NA" || doc.mentee_name !== "NA") &&
                      `${doc.mentor_name.split(" ")[0][0]}${
                        doc.mentor_name.split(" ")[1][0]
                      }`}
                    {participatingAs == "Mentor" &&
                      (doc.mentor_name !== "NA" || doc.mentee_name !== "NA") &&
                      `${doc.mentee_name.split(" ")[0][0]}${
                        doc.mentee_name.split(" ")[1][0]
                      }`}
                  </Avatar>
                  {test != null && (
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
                          {participatingAs == "Mentee" ? "Mentor" : "Mentee"}
                        </Typography>
                        <Typography fontWeight={"light"}>
                          {participatingAs == "Mentee"
                            ? doc.mentor_name
                            : doc.mentee_name}
                        </Typography>
                      </div>
                    </div>
                  )}
                </div>
              </Grid>
            </div>
          ))}
        </div>
      )}
      <div style={{ paddingBottom: "10%", marginTop: "10%" }}>
        {results == null ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress color="secondary" size={100} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {results.map((doc, id) => (
              <div key={id}>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "20px",
                    }}
                  >
                    <Avatar
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    >
                      {participatingAs == "Mentee" &&
                        `${doc.mentor_fullName.split(" ")[0][0]}${
                          doc.mentor_fullName.split(" ")[1][0]
                        }`}
                      {participatingAs == "Mentor" &&
                        `${doc.fullName.split(" ")[0][0]}${
                          doc.fullName.split(" ")[1][0]
                        }`}
                    </Avatar>
                    {results != null && (
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
                            {participatingAs == "Mentee" ? "Mentor" : "Mentee"}
                          </Typography>
                          <Typography fontWeight={"light"}>
                            {participatingAs == "Mentee"
                              ? doc.mentor_fullName
                              : doc.fullName}
                          </Typography>
                        </div>
                      </div>
                    )}
                  </div>
                </Grid>
              </div>
            ))}
          </div>
        )}
      </div>
    </Paper>
  );
};

export default PairingComplete;
