import { createAsyncThunk } from "@reduxjs/toolkit";
import { HomeTableColumns } from "@/data/HomeTableColumns";

export const FetchCollection = createAsyncThunk<HomeTableColumns[]>(
  "dashboard/FetchMenteeCollection",
  async () => {
    try {
      console.log("getting collection");
      const getData = await fetch("/api/get/collections", {
        next: { revalidate: 3600 },
      });
      if (!getData.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await getData.json();
      console.log("done getting collection");
      return jsonData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
