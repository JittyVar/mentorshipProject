import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetPairMentorResult = createAsyncThunk(
  "dashboard/GetPairMentorResult",
  async (id: string) => {
    try {
      const encodedId = encodeURIComponent(id);
      const response = await fetch(`/api/get/mentors/pair?slug=${encodedId}`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error("failed to fetch data");
      }
      const pairedMentorData = response.json();
      // console.log("done getting GetPairMentorResult result", pairedMentorData);
      return pairedMentorData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
