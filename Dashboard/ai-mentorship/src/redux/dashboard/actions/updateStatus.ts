import { createAsyncThunk } from "@reduxjs/toolkit";
import { PairingResult } from "../dashboardSlice";

export const UpdateStatus = createAsyncThunk(
  "dashboard/UpdateStatus",
  async (
    param: {
      url: string;
      param: (string | PairingResult | undefined)[];
    }[]
  ) => {
    try {
      console.log("PARAM", param[0].param);
      const response = await fetch(param[0].url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param[0].param),
      });
      if (response.ok) console.log("done complete status collection");
      return response.json(); // Parses JSON response into native JavaScript object
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
