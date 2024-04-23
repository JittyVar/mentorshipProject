"use client";

import * as React from "react";
import { RootState } from "@/redux/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { useSelector } from "react-redux";
import { FetchCollection } from "@/redux/dashboard/actions/fetchCollection";
import { HomeTableColumns } from "@/data/HomeTableColumns";
import { Status } from "@/data/Status";

// Define the DataTableProps interface
export interface DataTableProps {
  changeTab: (data: string) => void;
  allocateMentee: (data: string) => void;
}

// Define the DataTable component
export default function DataTable() {
  const dispatch = useAppDispatch();
  const [noMentorsChecked, setNoMentorsChecked] = React.useState(false);
  const [noMenteesChecked, setNoMenteesChecked] = React.useState(false);
  const R = require("ramda");

  const handleNoMentorsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNoMentorsChecked(event.target.checked);
  };

  const handleNoMenteesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNoMenteesChecked(event.target.checked);
  };

  const [tabValue, setTabValue] = useState("1");
  const rows = useSelector((state: RootState) => state.dashboard.rows);
  const [chosenRowData, setChosenRowData] = useState<HomeTableColumns>();
  const [filteredRows, setFilteredRows] = useState<HomeTableColumns[]>(rows);

  const assignButton = (data: HomeTableColumns) => {
    setChosenRowData(data);
  };

  useEffect(() => {
    dispatch(FetchCollection());
  }, [dispatch]);

  useEffect(() => {
    if (noMentorsChecked && noMenteesChecked) {
      const newRows = rows.filter((data: HomeTableColumns) => {
        return data.status === Status.Incomplete;
      });
      setFilteredRows(newRows);
    } else if (noMentorsChecked) {
      const newRows = rows.filter((data: HomeTableColumns) => {
        return (
          data.participatingAs === "Mentee" && data.status === Status.Incomplete
        );
      });
      setFilteredRows(newRows);
    } else if (noMenteesChecked) {
      const newRows = rows.filter((data: HomeTableColumns) => {
        return (
          data.participatingAs === "Mentor" && data.status === Status.Incomplete
        );
      });
      setFilteredRows(newRows);
    } else {
      const sortByStatus = R.sortBy((item: HomeTableColumns) => {
        if (item.status === Status.InProgress) {
          return 0; // "In Progress" comes first
        } else if (item.status === Status.Incomplete) {
          return 1; // "Incomplete" comes after "In Progress"
        }
        return 2; // Other statuses come last
      });

      // Sort the array using the custom sorting function
      const sortedData = sortByStatus(rows);
      setFilteredRows(sortedData);
    }
  }, [R, noMenteesChecked, noMentorsChecked, rows]);

  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      renderCell: (avatarIcon) => <Avatar />,
    },
    { field: "fullName", headerName: "Full Name", width: 220 },
    { field: "registeredOn", headerName: "Registered On", width: 200 },
    {
      field: "participatingAs",
      headerName: "Participating as",
      width: 180,
      renderCell: (params) => (
        <Chip label={params.value} variant="outlined" color="secondary" />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <Chip
          color={
            params.value == Status.Completed
              ? "success"
              : params.value == Status.InProgress
              ? "warning"
              : "error"
          }
          label={params.value}
        />
      ),
    },
    { field: "pairedDuring", headerName: "Paired During", width: 200 },
    {
      field: "assignedMentor",
      headerName: "Assigned Mentor/Mentee",
      width: 220,
      renderCell: (params) => {
        const actions = params.value;
        if (actions !== "Mentor name") {
          if (actions !== "In progress") {
            return (
              <Button
                variant="contained"
                value={params.value}
                color="secondary"
                onClick={() => setTabValue("2")}
              >
                {actions}
              </Button>
            );
          } else {
            return <div></div>;
          }
        } else {
          return (
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Avatar /> {params.value}
            </div>
          );
        }
      },
    },
  ];

  return (
    <Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <Switch
          checked={noMentorsChecked}
          onChange={handleNoMentorsChange}
          inputProps={{ "aria-label": "controlled" }}
          color="secondary"
        />
        <Typography>No Mentors</Typography>
        <Switch
          checked={noMenteesChecked}
          onChange={handleNoMenteesChange}
          inputProps={{ "aria-label": "controlled" }}
          color="secondary"
        />
        <Typography>No Mentees</Typography>
      </div>
      <Paper elevation={3}>
        {filteredRows.length === 0 ? (
          <div>No results</div>
        ) : (
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            onCellClick={(e) =>
              e.field === "assignedMentor" && assignButton(e.row)
            }
            pageSizeOptions={[20, 25]}
            rowSelection
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#8F3880",
                width: "100%",
              },
              "& .MuiDataGrid-columnHeaderTitle  ": { color: "white" },
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
