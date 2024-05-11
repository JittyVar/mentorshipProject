"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Box, Button, Chip, Paper } from "@mui/material";
import { useEffect } from "react";
import { HomeTableColumns } from "@/data/HomeTableColumns";
import { Status } from "@/data/Status";
import { useRouter } from "next/navigation";
import adminpic from "../greeting/adminpic.png";

// Define the DataTableProps interface
export interface DataTableProps {
  collections: HomeTableColumns[];
}

// Define the DataTable component
const DataTable: React.FC<DataTableProps> = ({ collections }) => {
  const router = useRouter();
  const firstLog = React.useRef(true);

  useEffect(() => {
    if (firstLog.current) {
      console.log("collections ", collections);
      firstLog.current = false;
    }
  }, [collections, firstLog]);

  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      renderCell: () => (
        <Avatar alt="Remy Sharp" src={adminpic.src} sx={{ marginTop: 0.5 }} />
      ),
    },
    { field: "fullName", headerName: "Full Name", width: 220 },
    { field: "registeredOn", headerName: "Registered On", width: 200 },
    {
      field: "participatingAs",
      headerName: "Participating as",
      width: 180,
      renderCell: (params) => (
        <Chip
          label={params.value}
          variant="outlined"
          color="secondary"
          sx={{ width: "100px" }}
        />
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
          sx={{ borderRadius: "5px", width: "150px" }}
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
        if (actions == "Assign a mentee" || actions == "Assign a mentor") {
          if (actions !== "In progress") {
            return (
              <Button
                variant="contained"
                value={params.value}
                sx={{
                  backgroundColor: "#8F3880",
                }}
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
      <Paper elevation={3}>
        <DataGrid
          rows={collections}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          onCellClick={(e) =>
            e.field === "assignedMentor" &&
            router.push(
              `/match?q=${e.row?.fullName}&r=${e.row?.participatingAs}`
            )
          }
          pageSizeOptions={[20, 25]}
          rowSelection
          sx={{
            "& .MuiDataGrid-filler": {
              backgroundColor: "#8F3880",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#8F3880",
              width: "100%",
            },
            "& .MuiDataGrid-columnHeaderTitle  ": { color: "white" },
            "& .MuiDataGrid-root": {
              backgroundColor: "pink",
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default DataTable;
