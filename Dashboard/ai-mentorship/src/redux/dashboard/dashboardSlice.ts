import { HomeTableColumns } from "@/data/HomeTableColumns";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchCollection } from "./actions/fetchCollection";
import { TotalMentees } from "./actions/totalMentees";

export enum APIStatus {
  idle = "idle",
  loading = "loading",
  success = "success",
  error = "error",
}

export interface HomeDataRows {
  rows: HomeTableColumns[];
  status: APIStatus;
  totalMentees: number;
}

const initialState: HomeDataRows = {
  rows: [],
  status: APIStatus.idle,
  totalMentees: 0,
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
        state.status = APIStatus.loading;
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
    builder.addCase(
      TotalMentees.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.totalMentees = action.payload;
      }
    );
  },
});

export const { progressData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
