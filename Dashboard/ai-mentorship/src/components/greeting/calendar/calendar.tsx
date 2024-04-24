"use client";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import Pairings from "../pairings/pairings";
import ProgressComponent from "../progress/progress";

export default function BasicDateCalendar() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));
  useEffect(() => {
    console.log(value?.format("dddd MMMM D, YYYY"));
  }, [value]);
  return (
    <div style={{ display: "flex" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={dayjs("2022-04-17")}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
        <div>
          <h1>Hello, Admin! </h1>
          <h2>Pairings made {value?.format("dddd MMMM D, YYYY")} </h2>
          {/* <Pairings /> */}
          <ProgressComponent />
        </div>
      </LocalizationProvider>
    </div>
  );
}
