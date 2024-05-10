import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetPairMenteeResult = createAsyncThunk(
  "dashboard/GetPairMenteeResult",
  async (id: string) => {
    try {
      const encodedId = encodeURIComponent(id);
      console.log("getting GetPairResult collection");

      console.log("getting mentee");
      const response = await fetch(`/api/get/mentees/pair?slug=${encodedId}`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error("failed to fetch data");
      }
      const pairedMenteeData = response.json();
      console.log("done getting GetPairResult collection", pairedMenteeData);
      return pairedMenteeData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
