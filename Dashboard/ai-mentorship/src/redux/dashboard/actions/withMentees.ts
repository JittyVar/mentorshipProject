import { createAsyncThunk } from "@reduxjs/toolkit";

export const WithMentees = createAsyncThunk<number>(
  "dashboard/WithMentees",
  async () => {
    try {
      const getData = await fetch("/api/get/mentors/withMentees");
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
