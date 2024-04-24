"use client";

import {
  Alert,
  Avatar,
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
  styled,
  tableCellClasses,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { FetchCollection } from "@/redux/dashboard/actions/fetchCollection";
import { UpdateStatus } from "@/redux/dashboard/actions/updateStatus";

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
  data: MatchRow[];
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
      const result = await dispatch(UpdateStatus(paramArr));
      if (result.meta.requestStatus === "fulfilled") {
        await dispatch(FetchCollection()); // await dispatch of FetchCollection
        setSuccessAlert(true);
        setTimeout(() => {
          // After a couple of seconds, set successAlert to false
          // Assuming successAlert is a state variable
          setSuccessAlert(false);
        }, 3000); // Adjust the delay as needed, here 3000 milliseconds (3 seconds)
      }
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#F4E6F2",
      color: "black",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

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
    <TableContainer component={Paper}>
      {successAlert && (
        <Alert variant="filled" severity="success">
          This is a filled success Alert.
        </Alert>
      )}
      <Table aria-label="customized table">
        <TableHead sx={{ width: "100%" }}>
          <TableRow>
            <StyledTableCell>RESULTS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div style={{ padding: "10%" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <CircularProgress
                    variant="determinate"
                    value={
                      dataArr[0] && dataArr[0].percentage > 0
                        ? dataArr[0].percentage
                        : 0
                    }
                    size={150}
                    thickness={5}
                    color={"success"}
                  />
                  <Avatar
                    style={{
                      position: "absolute",
                      top: "48%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    OP
                  </Avatar>
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
            <Grid item xs={8}>
              <div
                style={{ height: "80%", paddingTop: "5%", paddingRight: "5%" }}
              >
                <Card variant="outlined" sx={{ height: "70%", padding: "5%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      {" "}
                      Skills{" "}
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
                      {" "}
                      Goals{" "}
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
                      {" "}
                      Personality{" "}
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
                      {" "}
                      Result{" "}
                    </Grid>
                    <Grid item xs={8}>
                      {" "}
                      30%{" "}
                    </Grid>
                  </Grid>
                </Card>
              </div>
            </Grid>
          </Grid>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsComponent;
