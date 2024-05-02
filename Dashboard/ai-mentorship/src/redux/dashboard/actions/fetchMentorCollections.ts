import { createAsyncThunk } from "@reduxjs/toolkit";
import { HomeTableColumns } from "@/data/HomeTableColumns";

export const FetchMentorCollections = createAsyncThunk<HomeTableColumns[]>(
  "dashboard/FetchMentorCollections",
  async () => {
    try {
      console.log("getting mentors collection");
      const getData = await fetch("/api/get/collections/mentorCollections", {
        next: { revalidate: 60 },
      });
      if (!getData.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await getData.json();
      console.log("done getting mentors collection");
      return jsonData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
