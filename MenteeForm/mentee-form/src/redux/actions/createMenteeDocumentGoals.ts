import { store } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createMenteeDocumentGoals = createAsyncThunk(
  "registration/createMenteeDocumentGoals",
  async () => {
    try {
      const registrationSlice = store.getState().registration;
      const response = await fetch("/api/put/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationSlice),
      });
      return response.json(); // Parses JSON response into native JavaScript object
    } catch (error) {
      throw error;
    }
  }
);
