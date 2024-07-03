import { createAsyncThunk } from "@reduxjs/toolkit";

export const AuthSignIn = createAsyncThunk("dashboard/AuthSignIn", async () => {
  try {
    const getData = await fetch("/api/auth", {
      method: "POST",
      next: { revalidate: 60 },
    });
    if (!getData.ok) {
      throw new Error("Failed to fetch data");
    }
    const jsonData = await getData.json();
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
  }
});
