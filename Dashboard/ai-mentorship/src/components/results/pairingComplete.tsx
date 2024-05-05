import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Grow,
  Paper,
  Typography,
} from "@mui/material";
import adminPic from "../greeting/adminpic.png";
import mentorPic from "../greeting/mentor.jpg";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect } from "react";
import { APIStatus, restartStatus } from "@/redux/dashboard/dashboardSlice";
import { MatchRow } from "./resultsComponent";
import { UpdateStatus } from "@/redux/dashboard/actions/updateStatus";
import { FetchCollections } from "@/redux/dashboard/actions/fetchCollection";

const PairingComplete = () => {
  const pairingResult = useAppSelector(
    (state) => state.dashboard.pairingResults
  );
  const pairingResultStatus = useAppSelector(
    (state) => state.dashboard.pairingResultsStatus
  );

  return (
    <Paper>
      {pairingResultStatus != APIStatus.success ? (
        <CircularProgress color="secondary" />
      ) : (
        <Grid container spacing={2} sx={{ widht: "100%", height: "300px" }}>
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
                {pairingResult.length != 0 && (
                  <Typography>Mentee Name</Typography>
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
                {pairingResult.length != 0 && (
                  <Typography>Mentor Name</Typography>
                )}
              </div>
            </Grid>
          </Grow>
        </Grid>
      )}
    </Paper>
  );
};

export default PairingComplete;
