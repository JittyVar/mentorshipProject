import { createAsyncThunk } from "@reduxjs/toolkit";
import { HomeTableColumns } from "@/data/HomeTableColumns";

export const FetchMenteeCollections = createAsyncThunk<HomeTableColumns[]>(
  "dashboard/FetchMenteeCollections",
  async () => {
    try {
      console.log("getting mentees collection");
      const getData = await fetch("/api/get/collections/menteeCollections", {
        next: { revalidate: 60 },
      });
      if (!getData.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await getData.json();
      console.log("done getting mentees collection");
      return jsonData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
