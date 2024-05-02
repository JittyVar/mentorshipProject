import { store } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export enum Status {
  Completed = "COMPLETED",
  Incomplete = "INCOMPLETE",
  InProgress = "IN PROGRESS",
}
export const createMenteeDocument = createAsyncThunk(
  "registration/createMenteeDocument",
  async () => {
    try {
      const registrationSlice = store.getState().registration;
      const response = await fetch("/api/put", {
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
