import { createAsyncThunk } from "@reduxjs/toolkit";

export const WithNoMentors = createAsyncThunk<number>(
  "dashboard/WithNoMentors",
  async () => {
    try {
      const getData = await fetch("/api/get/mentees/withNoMentors");
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
