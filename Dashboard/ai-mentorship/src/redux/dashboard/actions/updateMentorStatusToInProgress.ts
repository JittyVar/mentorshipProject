import { createAsyncThunk } from "@reduxjs/toolkit";

export const UpdateMentorStatusToInProgress = createAsyncThunk(
  "dashboard/UpdateMentorStatusToInProgress",
  async (param: { url: string; param: string | null }[]) => {
    try {
      console.log("updating collection");
      const response = await fetch(param[0].url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param[0].param),
      });
      return response.json(); // Parses JSON response into native JavaScript object
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
