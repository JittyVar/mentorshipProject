"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Greetings from "../greeting/greeting";
import DataTable from "../table/table";
import { useAppSelector } from "@/redux/hook";
import { Backdrop, CircularProgress } from "@mui/material";
import { APIStatus } from "@/redux/dashboard/dashboardSlice";
import { HomeTableColumns } from "@/data/HomeTableColumns";

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

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#1E1F42",
              },
            }}
          >
            <Tab label="MENTORS" value="1" />
            <Tab label="MENTEES" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Greetings
            menteesData={mentorsData}
            displayTotalAs={"Mentors"}
            displayWithAs={"Mentees"}
          />
          {mentorRowsStatus == APIStatus.success && (
            <div style={{ marginTop: "2%" }}>
              <DataTable
                collections={mentorRows}
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
                collections={menteeRows}
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
    </Box>
  );
};

export default LabTabs;
