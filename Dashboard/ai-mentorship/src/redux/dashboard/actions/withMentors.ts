import { createAsyncThunk } from "@reduxjs/toolkit";

export const WithMentors = createAsyncThunk<number>(
  "dashboard/WithMentors",
  async () => {
    try {
      const getData = await fetch("/api/get/mentees/withMentors");
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
