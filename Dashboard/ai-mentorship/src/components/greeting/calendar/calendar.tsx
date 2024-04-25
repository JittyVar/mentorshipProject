"use client";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { Box } from "@mui/material";

export default function BasicDateCalendar() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));
  useEffect(() => {
    console.log(value?.format("dddd MMMM D, YYYY"));
  }, [value]);
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={dayjs("2022-04-17")}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          sx={{
            "& .MuiPickersDay-root ": {
              backgroundColor: "#F4E6F2",
              borderRadius: "10%",
            },
            "& .MuiPickersDay-root.Mui-selected ": {
              backgroundColor: "#FC8eAC",
            },
            backgroundColor: "white",
            borderRadius: 5,
            border: 0.2,
            borderColor: "lightgrey",
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}
