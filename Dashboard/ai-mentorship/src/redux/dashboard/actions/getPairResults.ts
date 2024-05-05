import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetPairResult = createAsyncThunk(
  "dashboard/GetPairResult",
  async (id: string) => {
    try {
      const encodedId = encodeURIComponent(id);
      console.log("getting GetPairResult collection");
      const getData = await fetch(`/api/get?slug=${encodedId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });
      if (!getData.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await getData.json();
      console.log("done getting GetPairResult collection", jsonData);
      return jsonData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
