"use client";
import Greetings from "@/components/greeting/greeting";
import DataTable from "@/components/table/table";
import { FetchCollection } from "@/redux/dashboard/actions/fetchCollection";
import { TotalMentees } from "@/redux/dashboard/actions/totalMentees";
import { APIStatus } from "@/redux/dashboard/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useRef } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.dashboard.rows);
  const rowsStatus = useAppSelector((state) => state.dashboard.status);
  const mentees = useAppSelector((state) => state.dashboard.totalMentees);
  const firstLog = useRef(true);

  useEffect(() => {
    if (firstLog.current) {
      const fetchData = async () => {
        try {
          await Promise.all([
            dispatch(FetchCollection()),
            dispatch(TotalMentees()),
          ]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
      firstLog.current = false;
    }
  }, [dispatch, firstLog]);

  return (
    <>
      <Greetings totalMentees={mentees} />
      {rowsStatus == APIStatus.success && <DataTable collections={rows} />}
      <Backdrop
        sx={{ color: "pink", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={rowsStatus != APIStatus.success}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
