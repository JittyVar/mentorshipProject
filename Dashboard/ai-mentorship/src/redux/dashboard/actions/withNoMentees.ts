import { createAsyncThunk } from "@reduxjs/toolkit";

export const WithNoMentees = createAsyncThunk<number>(
  "dashboard/WithNoMentees",
  async () => {
    try {
      const getData = await fetch("/api/get/mentors/withNoMentees");
      if (!getData.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await getData.json();
      return jsonData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
