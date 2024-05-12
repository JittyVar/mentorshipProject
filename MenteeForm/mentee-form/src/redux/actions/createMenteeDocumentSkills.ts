import { store } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createMenteeDocumentSkills = createAsyncThunk(
  "registration/createMenteeDocumentSkills",
  async () => {
    try {
      const registrationSlice = store.getState().registration;
      const response = await fetch("/api/put/skills", {
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
