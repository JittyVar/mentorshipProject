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
import { APIStatus, PairingResult } from "@/redux/dashboard/dashboardSlice";
import { UpdateStatus } from "@/redux/dashboard/actions/updateStatus";
import { FetchCollections } from "@/redux/dashboard/actions/fetchCollection";
import CustomizedSnackbars from "../snackbar/snackBar";

interface PairingCompleteProps {
  chosen: string;
  participatingAs: string;
}
const PairingComplete: React.FC<PairingCompleteProps> = ({
  chosen,
  participatingAs,
}) => {
  const pairingResult = useAppSelector(
    (state) => state.dashboard.pairingResults
  );
  const pairingResultStatus = useAppSelector(
    (state) => state.dashboard.pairingResultsStatus
  );
  const [pairedData, setPairedData] = useState<PairingResult[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pairingResult && chosen && participatingAs) {
      if (participatingAs === "Mentee") {
        setPairedData(
          pairingResult!.filter((e: PairingResult) => chosen === e.mentee_name)
        );
      } else {
        setPairedData(
          pairingResult!.filter((e: PairingResult) => chosen === e.mentor_name)
        );
      }
    }
  }, [pairingResult, chosen, participatingAs]);

  useEffect(() => {
    const updateCompleteStatus = async () => {
      if (pairedData[0] != undefined) {
        const completeStatusArr = [
          {
            url:
              participatingAs === "Mentee"
                ? "/api/put/mentees/completeStatus"
                : "/api/put/mentors/completeStatus",
            param: [chosen, pairedData], // Ensure this structure matches the expected type
          },
        ];

        await dispatch(UpdateStatus(completeStatusArr)).then(() => {
          dispatch(FetchCollections());
        });
      }
    };
    updateCompleteStatus();
  }, [chosen, dispatch, pairedData, participatingAs]);

  return (
    <Paper>
      <Paper
        elevation={3}
        sx={{ height: "25px", padding: 2, backgroundColor: "#F4E6F2" }}
      >
        <Typography>RESULTS</Typography>
      </Paper>
      {pairingResultStatus != APIStatus.success ? (
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
                  {pairedData[0] != undefined && (
                    <div
                      style={{
                        width: "100%",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{pairedData[0]!.mentee_name}</Typography>
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
                  {pairedData[0] != undefined && (
                    <div
                      style={{
                        width: "100%",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{pairedData[0]!.mentor_name}</Typography>
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
