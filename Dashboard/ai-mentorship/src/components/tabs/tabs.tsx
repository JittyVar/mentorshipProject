"use client";

import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Greetings from "../greeting/greeting";
import DataTable from "../table/table";
import { useAppSelector } from "@/redux/hook";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import { APIStatus } from "@/redux/dashboard/dashboardSlice";
import { HomeTableColumns } from "@/data/HomeTableColumns";
import { useUser } from "@auth0/nextjs-auth0/client";

interface LabTabsProps {
  mentorRows: HomeTableColumns[];
  menteeRows: HomeTableColumns[];
  mentorsData: number[];
  menteesData: number[];
}
const LabTabs: React.FC<LabTabsProps> = ({
  mentorRows,
  menteeRows,
  mentorsData,
  menteesData,
}) => {
  const [value, setValue] = React.useState("1");
  const mentorRowsStatus = useAppSelector(
    (state) => state.dashboard.mentorRowsStatus
  );
  const menteeRowsStatus = useAppSelector(
    (state) => state.dashboard.menteeRowsStatus
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [name, setFilterName] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState<HomeTableColumns[]>(
    []
  );

  const { user, error, isLoading } = useUser();

  React.useEffect(() => {
    if (user) {
      let rowData = value == "1" ? mentorRows : menteeRows;
      const filtered = rowData.filter((e: HomeTableColumns) =>
        e.fullName.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
      setFilteredRows(filtered);
    }
  }, [menteeRows, mentorRows, name, user, value]);

  return (
    <TabContext value={value}>
      <div style={{ display: "flex", gap: 55, paddingLeft: "2%" }}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#1E1F42",
            },
            marginBottom: "1%",
            width: "50%",
          }}
        >
          <Tab label="MENTORS" value="1" sx={{ fontSize: "12px" }} />
          <Tab label="MENTEES" value="2" sx={{ fontSize: "12px" }} />
        </TabList>
        <TextField
          id="searchField"
          label="Search Name"
          variant="outlined"
          fullWidth
          sx={{ borderRadius: "50px" }}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </div>
      <TabPanel value="1" sx={{ width: "100%" }}>
        <Greetings
          menteesData={mentorsData}
          displayTotalAs={"Mentors"}
          displayWithAs={"Mentees"}
        />
        {mentorRowsStatus == APIStatus.success && (
          <div
            style={{
              marginTop: "2%",
            }}
          >
            <DataTable
              collections={filteredRows}
              participatingAs={"Assign a Mentee"}
            />
          </div>
        )}
        <Backdrop
          sx={{ color: "pink", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={mentorRowsStatus != APIStatus.success}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </TabPanel>
      <TabPanel value="2">
        <Greetings
          menteesData={menteesData}
          displayTotalAs={"Mentees"}
          displayWithAs={"Mentors"}
        />
        {menteeRowsStatus == APIStatus.success && (
          <div style={{ marginTop: "2%" }}>
            <DataTable
              collections={filteredRows}
              participatingAs="Assign a Mentor"
            />
          </div>
        )}
        <Backdrop
          sx={{ color: "pink", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={menteeRowsStatus != APIStatus.success}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </TabPanel>
      <TabPanel value="3">Item Three</TabPanel>
    </TabContext>
  );
};

export default LabTabs;
