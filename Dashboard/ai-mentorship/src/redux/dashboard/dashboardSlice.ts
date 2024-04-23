import { HomeTableColumns } from "@/data/HomeTableColumns";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchCollection } from "./actions/fetchCollection";

export enum APIStatus {
  idle = "idle",
  loading = "loading",
  success = "success",
  error = "error",
}

export interface HomeDataRows {
  rows: HomeTableColumns[];
  status: APIStatus;
}

const initialState: HomeDataRows = {
  rows: [],
  status: APIStatus.idle,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    progressData: (state, action: PayloadAction<HomeTableColumns[]>) => {
      state.rows = action.payload.slice(); // Update rows with new data
      state.status = APIStatus.success;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchCollection.pending, (state) => {
        state.status = APIStatus.idle;
      })
      .addCase(
        FetchCollection.fulfilled,
        (state, action: PayloadAction<HomeTableColumns[]>) => {
          state.rows = action.payload;
          state.status = APIStatus.success;
        }
      )
      .addCase(FetchCollection.rejected, (state) => {
        state.status = APIStatus.error;
      });
  },
});

export const { progressData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
