"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Status } from "@/data/Status";
import { Avatar, Button, Chip } from "@mui/material";
import { HomeTableColumns } from "@/data/HomeTableColumns";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { APIStatus, restartStatus } from "@/redux/dashboard/dashboardSlice";
import { FetchCollections } from "@/redux/dashboard/actions/fetchCollection";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  avatar: string,
  fullName: string,
  status: Status,
  assignedMentor: string,
  participatingAs: string
) {
  return { avatar, fullName, status, assignedMentor, participatingAs };
}

interface MatchTableComponentProps {
  collectionData: HomeTableColumns[] | null;
  chosenData?: string | null;
  participatingAs: string | undefined;
}

const MatchTableComponent: React.FC<MatchTableComponentProps> = ({
  collectionData,
  chosenData,
  participatingAs,
}) => {
  const [rows, setRows] = useState<any[]>([]);
  const [chosenName, setChosenName] = useState(chosenData);
  const R = require("ramda");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [matchMeClicked, setMatchedMeClicked] = useState(false);
  const userData = useAppSelector((state) => state.dashboard.user);

  useEffect(() => {
    // Map over the collectionData and create rows using createData function
    if (collectionData != null) {
      const updatedRows = collectionData.map((data) =>
        createData(
          data.avatar,
          data.fullName,
          data.status,
          data.assignedMentor,
          data.participatingAs
        )
      );
      const filterByStatus = R.filter(
        (data: HomeTableColumns) =>
          data.status == Status.Incomplete || data.status == Status.InProgress
      );
      setRows(filterByStatus(updatedRows));
    }
  }, [R, chosenName, collectionData]);

  const handleClick = async (name: string, participating: string) => {
    try {
      if (userData) {
        dispatch(restartStatus(APIStatus.idle));
        setChosenName(name);
        setMatchedMeClicked(true);
        dispatch(FetchCollections());
        router.push(`/match?q=${encodeURIComponent(name)}&r=${participating}`);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (chosenName != null && !matchMeClicked && userData) {
      router.push(
        `/match?q=${encodeURIComponent(chosenName)}&r=${participatingAs}`
      );
      setMatchedMeClicked(false);
    }
  }, [chosenName, router, participatingAs, matchMeClicked, userData]);

  return (
    userData && (
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              width: "100%",
              "& .MuiTableCell-root": {
                backgroundColor: "white",
              },
              "& .MuiTableCell-head": {
                backgroundColor: "#1E1F42",
                color: "white",
                borderColor: "grey",
                borderWidth: "1px",
              },
            }}
          >
            <TableRow>
              <StyledTableCell>Progress Status</StyledTableCell>
              <StyledTableCell>Avatar</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.fullName}
                sx={
                  row.fullName == chosenName
                    ? {
                        "& .MuiTableCell-body": {
                          backgroundColor: "#F4E6F2",
                        },
                      }
                    : { backgroundColor: "white" }
                }
                onClick={() => {
                  row.status == Status.InProgress &&
                    handleClick(row.fullName, row.participatingAs);
                }}
              >
                <StyledTableCell component="th" scope="row">
                  {
                    <Chip
                      color={
                        row.status === Status.Completed
                          ? "success"
                          : row.status === Status.InProgress
                          ? "warning"
                          : "error"
                      }
                      variant="outlined"
                      label={row.status}
                    />
                  }
                </StyledTableCell>
                <StyledTableCell>
                  <Avatar>{`${row.fullName.split(" ")[0][0]}${
                    row.fullName.split(" ")[0][0]
                  }`}</Avatar>
                </StyledTableCell>
                <StyledTableCell>{row.fullName}</StyledTableCell>
                <StyledTableCell>
                  {row.assignedMentor == "In progress" ? (
                    "---"
                  ) : (
                    <Button
                      variant="contained"
                      value={row.assignedMentor}
                      sx={{
                        backgroundColor: "#1E1F42",
                      }}
                      onClick={() =>
                        handleClick(row.fullName, row.participatingAs)
                      }
                    >
                      MATCH ME
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default MatchTableComponent;
