import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetMatchingAlgorithm = createAsyncThunk(
  "dashboard/GetMatchingAlgorithm",
  async () => {
    try {
      const matchingResponse = await fetch("/api/pair", {
        next: { revalidate: 60 },
      });

      if (!matchingResponse.ok) {
        throw new Error("failed to fetch data");
      }

      const matchingResults = await matchingResponse.json();
      console.log("matchingResults ", matchingResults);
      return matchingResults;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
