"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Button,
  Chip,
  Paper,
  Switch,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { HomeTableColumns } from "@/data/HomeTableColumns";
import { Status } from "@/data/Status";
import { useRouter } from "next/navigation";
import adminpic from "../greeting/adminpic.png";

// Define the DataTableProps interface
export interface DataTableProps {
  // changeTab: (data: string) => void;
  // allocateMentee: (data: string) => void;
  collections: HomeTableColumns[];
}

// Define the DataTable component
const DataTable: React.FC<DataTableProps> = ({ collections }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const R = require("ramda");
  const [filteredRows, setFilteredRows] =
    useState<HomeTableColumns[]>(collections);
  const [noMentorsChecked, setNoMentorsChecked] = React.useState(false);
  const [noMenteesChecked, setNoMenteesChecked] = React.useState(false);
  const [chosenRowData, setChosenRowData] = useState<HomeTableColumns>();

  const [loading, setLoading] = React.useState(true);
  const handleAbleToDisplay = () => {
    setLoading(false);
  };
  const handleUnableToDisplay = () => {
    setLoading(true);
  };

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

  // useEffect(() => {
  //   console.log("filteredRows ", filteredRows);
  // }, [filteredRows]);

  useEffect(() => {
    if (noMentorsChecked && noMenteesChecked) {
      const newRows = collections.filter((data: HomeTableColumns) => {
        return data.status === Status.Incomplete;
      });
      setFilteredRows(newRows);
    } else if (noMentorsChecked) {
      const newRows = collections.filter((data: HomeTableColumns) => {
        return (
          data.participatingAs === "Mentee" && data.status === Status.Incomplete
        );
      });
      setFilteredRows(newRows);
    } else if (noMenteesChecked) {
      const newRows = collections.filter((data: HomeTableColumns) => {
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
      const sortedData = sortByStatus(collections);
      setFilteredRows(sortedData);
    }
  }, [R, noMenteesChecked, noMentorsChecked, collections]);

  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      renderCell: (avatarIcon) => (
        <Avatar alt="Remy Sharp" src={adminpic.src} />
      ),
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
              e.field === "assignedMentor" &&
              router.push(
                `/match?q=${encodeURIComponent(e.row?.fullName)}&r=${
                  e.row?.participatingAs
                }`
              )
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
};

export default DataTable;
