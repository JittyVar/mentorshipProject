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
import { FetchCollections } from "@/redux/dashboard/actions/fetchCollection";
import { UpdateStatus } from "@/redux/dashboard/actions/updateStatus";
import adminPic from "../greeting/adminpic.png";
import { APIStatus } from "@/redux/dashboard/dashboardSlice";
import PairingComplete from "./pairingComplete";
import { useSearchParams } from "next/navigation";
import PairingCompleteSkeleton from "./pairingCompleteSkeleton";

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
  const [chosenDataOf, setChosen] = useState<string | null | undefined>("");

  const searchParams = useSearchParams();
  const chosenValue = searchParams.get("q");

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper elevation={3}>
        {chosenValue != undefined ? (
          <PairingComplete
            chosen={dataOf!}
            participatingAs={participatingAs!}
          />
        ) : (
          <PairingCompleteSkeleton />
        )}
      </Paper>
    </Box>
  );
};

export default ResultsComponent;
