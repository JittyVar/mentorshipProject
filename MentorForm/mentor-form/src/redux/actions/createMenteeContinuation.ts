import { store } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const createMenteeContinuation = createAsyncThunk(
  "registration/createMenteeContinuation",
  async () => {
    try {
      const registrationSlice = store.getState().registration;
      const response = await fetch("/api/put/preferences", {
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
