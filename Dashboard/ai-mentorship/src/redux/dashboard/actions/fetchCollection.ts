import { createAsyncThunk } from "@reduxjs/toolkit";
import { HomeTableColumns } from "@/data/HomeTableColumns";

export const FetchCollection = createAsyncThunk<HomeTableColumns[]>(
  "dashboard/FetchMenteeCollection",
  async () => {
    try {
      const getData = await fetch("http://localhost:3000/api/get/collections");
      if (!getData.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await getData.json();
      return jsonData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
