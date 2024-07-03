"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Button, Chip } from "@mui/material";
import { HomeTableColumns } from "@/data/HomeTableColumns";
import { Status } from "@/data/Status";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";

// Define the DataTableProps interface
export interface DataTableProps {
  collections: HomeTableColumns[];
  participatingAs: string;
}

// Define the DataTable component
const DataTable: React.FC<DataTableProps> = ({
  collections,
  participatingAs,
}) => {
  const router = useRouter();
  const R = require("ramda");
  const withNoMentees = useAppSelector(
    (state) => state.dashboard.withNoMentees
  );
  const withNoMentors = useAppSelector(
    (state) => state.dashboard.withNoMentors
  );

  const statusSort = R.sortWith([R.descend(R.prop("status"))]);

  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <Avatar
          alt="Remy Sharp"
          sx={{ marginTop: 0.5, backgroundColor: "#1E1F42" }}
        >
          {params.value}
        </Avatar>
      ),
    },
    { field: "fullName", headerName: "Full Name", width: 220 },
    { field: "registeredOn", headerName: "Registered On", width: 220 },
    {
      field: "status",
      headerName: "Status",
      width: 220,
      renderCell: (params) => (
        <Chip
          color={
            params.value == Status.Completed
              ? "success"
              : params.value == Status.InProgress
              ? "warning"
              : "error"
          }
          variant="outlined"
          label={params.value}
          sx={{ borderRadius: "5px", width: "150px", fontWeight: "bold" }}
        />
      ),
    },
    { field: "pairedDuring", headerName: "Paired During", width: 220 },
    {
      field: "assignedMentor",
      headerName: "Paired With",
      width: 220,
      renderCell: (params) => {
        const actions = params.value;
        if (actions == "Assign a mentee" || actions == "Assign a mentor") {
          if (actions !== "In progress") {
            if (participatingAs == "Assign a Mentee") {
              if (withNoMentors == 0) {
                return (
                  <Chip
                    variant="outlined"
                    color="error"
                    label="No more mentees"
                    sx={{
                      borderRadius: "5px",
                      width: "150px",
                      fontWeight: "bold",
                    }}
                  ></Chip>
                );
              } else {
                return (
                  <Button
                    variant="contained"
                    value={params.value}
                    sx={{
                      backgroundColor: "#1E1F42",
                    }}
                  >
                    {participatingAs}
                  </Button>
                );
              }
            } else {
              if (withNoMentees == 0) {
                return (
                  <Chip
                    variant="outlined"
                    color="error"
                    label="No more mentors"
                    sx={{
                      borderRadius: "5px",
                      width: "150px",
                      fontWeight: "bold",
                    }}
                  ></Chip>
                );
              } else {
                return (
                  <Button
                    variant="contained"
                    value={params.value}
                    sx={{
                      backgroundColor: "#1E1F42",
                    }}
                  >
                    {participatingAs}
                  </Button>
                );
              }
            }
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
    <DataGrid
      rows={statusSort(collections)}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      onCellClick={(e) =>
        e.field === "assignedMentor" &&
        router.push(`/match?q=${e.row?.fullName}&r=${e.row?.participatingAs}`)
      }
      pageSizeOptions={[10, 20]}
      sx={{ width: "100%" }}
      rowSelection
    />
  );
};

export default DataTable;
