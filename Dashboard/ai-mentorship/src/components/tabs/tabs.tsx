"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useRouter } from "next/navigation";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="HOME" value="1" onClick={() => router.push("/")} />
            <Tab
              label="MATCH"
              value="2"
              onClick={() => router.push("/match")}
            />
            <Tab label="BIO" value="3" onClick={() => router.push("/bio")} />
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
}
