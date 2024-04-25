"use client";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { FetchCollection } from "@/redux/dashboard/actions/fetchCollection";
import { UpdateStatus } from "@/redux/dashboard/actions/updateStatus";
import adminPic from "../greeting/adminpic.png";
import { APIStatus } from "@/redux/dashboard/dashboardSlice";
import PairingComplete from "./pairingComplete";

export interface MatchRow {
  name: string;
  participatingAs: string;
  skills: number;
  goals: number;
  personality: number;
  percentage: number;
  assignedMentor: string;
}

interface ResultsProps {
  data: MatchRow[] | null;
  dataOf?: string | null | undefined;
  participatingAs?: string | null;
}

const ResultsComponent: React.FC<ResultsProps> = ({
  data,
  dataOf,
  participatingAs,
}) => {
  const [dataArr, setDataArr] = useState<MatchRow[]>([]);
  const dispatch = useAppDispatch();
  const [chosenDataOf, setChosen] = useState<string | null | undefined>("");
  const [successAlert, setSuccessAlert] = useState(false);
  const pairingSuccess = useAppSelector(
    (state) => state.dashboard.completeStatus
  );

  const paramArr: { url: string; param: string | null | undefined }[] = [
    {
      url:
        participatingAs == "Mentee"
          ? "/api/put/mentees/completeStatus"
          : "/api/put/mentors/completeStatus",
      param: dataOf,
    },
  ];

  const changeStatus = async () => {
    try {
      console.log("participatingAs ", participatingAs);
      await dispatch(UpdateStatus(paramArr)).then((request) => {
        dispatch(FetchCollection()); // await dispatch of FetchCollection
        if (request.meta.requestStatus === "fulfilled") {
          setSuccessAlert(true);
          setTimeout(() => {
            // After a couple of seconds, set successAlert to false
            // Assuming successAlert is a state variable
            setSuccessAlert(false);
          }, 3000); // Adjust the delay as needed, here 3000 milliseconds (3 seconds)
        }
      });
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    setChosen(dataOf);
  }, [dataOf]);

  useEffect(() => {
    if (data) {
      const foundItems = data.filter(
        (item: MatchRow) => item.name == chosenDataOf
      );
      setDataArr(foundItems); // Set dataArr to an array of found items
    } else {
      setDataArr([]); // Reset dataArr if data is undefined or null
    }
  }, [chosenDataOf, data]); // Add dataOf as a dependency

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
      transitionDelay: "1.5s ease-in-out", // Adjust the duration and easing function as needed
    },
  }));

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper elevation={3}>
        {pairingSuccess !== APIStatus.success ? (
          <Grid sx={{ display: "flex" }} spacing={2}>
            <Grid
              item
              xs={6}
              md={5}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ padding: "10%" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <CircularProgress
                    variant="determinate"
                    value={
                      dataArr[0] && dataArr[0].percentage > 0
                        ? dataArr[0].percentage
                        : 0
                    }
                    size={250}
                    thickness={5}
                    color={"success"}
                  />
                  <Avatar
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "200px",
                      height: "200px",
                    }}
                    src={adminPic.src}
                  />
                </div>
                <div
                  style={{
                    paddingTop: "10%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="contained" onClick={(e) => changeStatus()}>
                    Pair Up
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={7}>
              <div
                style={{ height: "80%", paddingTop: "5%", paddingRight: "5%" }}
              >
                <Card variant="outlined" sx={{ height: "70%", padding: "5%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      Skills
                    </Grid>
                    <Grid item xs={8}>
                      <BorderLinearProgress
                        variant="determinate"
                        value={
                          dataArr[0] && dataArr[0].skills > 0
                            ? dataArr[0].skills
                            : 0
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      Goals
                    </Grid>
                    <Grid item xs={8}>
                      <BorderLinearProgress
                        variant="determinate"
                        value={
                          dataArr[0] && dataArr[0].goals > 0
                            ? dataArr[0].goals
                            : 0
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      Personality
                    </Grid>
                    <Grid item xs={8}>
                      <BorderLinearProgress
                        variant="determinate"
                        value={
                          dataArr[0] && dataArr[0].personality > 0
                            ? dataArr[0].personality
                            : 0
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      Result
                    </Grid>
                    <Grid item xs={8}>
                      30%
                    </Grid>
                  </Grid>
                </Card>
              </div>
            </Grid>
          </Grid>
        ) : (
          <PairingComplete />
        )}
      </Paper>
    </Box>
  );
};

export default ResultsComponent;
