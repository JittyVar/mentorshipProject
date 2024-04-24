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
import { Button, Chip } from "@mui/material";
import { HomeTableColumns } from "@/data/HomeTableColumns";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { UpdateStatusToInProgress } from "@/redux/dashboard/actions/updateMenteeStatusToInProgress";

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
  collectionData: HomeTableColumns[];
  chosenData?: string | null;
}

const MatchTableComponent: React.FC<MatchTableComponentProps> = ({
  collectionData,
  chosenData,
}) => {
  const [rows, setRows] = useState<any[]>([]);
  const [chosenName, setChosenName] = useState(chosenData);
  const [participatingAs, setParticipatingAs] = useState("");
  const R = require("ramda");
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Map over the collectionData and create rows using createData function
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
  }, [R, chosenName, collectionData]);

  const assignButton = (name: string) => {
    const foundData = collectionData.find((data: HomeTableColumns) => {
      if (data.fullName == name) {
        return data;
      }
    });
    console.log("found data", foundData);
  };

  const setValues = (name: string, participatingAs: string) => {
    setChosenName(name);
    setParticipatingAs(participatingAs);
  };

  useEffect(() => {
    const foundData = collectionData.find((data: HomeTableColumns) => {
      if (data.fullName == chosenName && data.status == Status.InProgress) {
        return data;
      }
    });
  }, [chosenName, collectionData]);

  useEffect(() => {
    if (chosenName != null) {
      router.push(
        `/match?q=${encodeURIComponent(chosenName)}&r=${participatingAs}`
      );
      //dispatch(UpdateStatusToInProgress())
    }
  }, [chosenName, participatingAs, router]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%" }} aria-label="customized table">
        <TableHead sx={{ width: "100%" }}>
          <TableRow>
            <StyledTableCell>Progress Status</StyledTableCell>
            <StyledTableCell>Avatar</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Participating as</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.fullName}
              onClick={() => setValues(row.fullName, row.participatingAs)}
              sx={
                row.fullName == chosenName
                  ? { "& .MuiTableCell-body": { backgroundColor: "#F4E6F2" } }
                  : { backgroundColor: "white" }
              }
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
                    label={row.status}
                  />
                }
              </StyledTableCell>
              <StyledTableCell>{row.avatar}</StyledTableCell>
              <StyledTableCell>{row.fullName}</StyledTableCell>
              <StyledTableCell>{row.participatingAs}</StyledTableCell>
              <StyledTableCell>
                {row.assignedMentor == "In progress" ? (
                  "---"
                ) : (
                  <Button
                    variant="contained"
                    value={row.assignedMentor}
                    color="secondary"
                    onClick={() => assignButton(row.fullName)}
                  >
                    {row.assignedMentor}
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MatchTableComponent;
