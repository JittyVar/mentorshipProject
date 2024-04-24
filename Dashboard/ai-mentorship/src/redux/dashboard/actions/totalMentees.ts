import { createAsyncThunk } from "@reduxjs/toolkit";
import { HomeTableColumns } from "@/data/HomeTableColumns";

export const TotalMentees = createAsyncThunk<number>(
  "dashboard/TotalMentees",
  async () => {
    try {
      console.log("getting TotalMentees");
      const getData = await fetch("/api/get/mentees/totalMentees");
      if (!getData.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await getData.json();
      console.log("done getting TotalMentees");
      return jsonData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
