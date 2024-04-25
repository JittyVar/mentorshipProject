import { HomeTableColumns } from "@/data/HomeTableColumns";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchCollection } from "./actions/fetchCollection";
import { TotalMentees } from "./actions/totalMentees";
import { TotalMentors } from "./actions/totalMentors";
import { WithMentees } from "./actions/withMentees";
import { WithMentors } from "./actions/withMentors";
import { WithNoMentees } from "./actions/withNoMentees";
import { WithNoMentors } from "./actions/withNoMentors";
import { UpdateStatus } from "./actions/updateStatus";

export enum APIStatus {
  idle = "idle",
  loading = "loading",
  success = "success",
  error = "error",
}

export interface HomeDataRows {
  rows: HomeTableColumns[];
  status: APIStatus;
  completeStatus: APIStatus;
  totalMentees: number;
  totalMentors: number;
  withMentees: number;
  withMentors: number;
  withNoMentees: number;
  withNoMentors: number;
}

const initialState: HomeDataRows = {
  rows: [],
  status: APIStatus.idle,
  completeStatus: APIStatus.idle,
  totalMentees: 0,
  totalMentors: 0,
  withMentees: 0,
  withMentors: 0,
  withNoMentees: 0,
  withNoMentors: 0,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    progressData: (state, action: PayloadAction<HomeTableColumns[]>) => {
      state.rows = action.payload.slice(); // Update rows with new data
      state.status = APIStatus.success;
    },
    restartStatus: (state, action: PayloadAction<APIStatus>) => {
      state.completeStatus = action.payload;
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
    builder.addCase(UpdateStatus.fulfilled, (state) => {
      state.completeStatus = APIStatus.success;
    });
    builder.addCase(
      TotalMentees.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.totalMentees = action.payload;
      }
    );
    builder.addCase(
      TotalMentors.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.totalMentors = action.payload;
      }
    );
    builder.addCase(
      WithMentees.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.withMentees = action.payload;
      }
    );
    builder.addCase(
      WithMentors.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.withMentors = action.payload;
      }
    );
    builder.addCase(
      WithNoMentees.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.withNoMentees = action.payload;
      }
    );
    builder.addCase(
      WithNoMentors.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.withNoMentors = action.payload;
      }
    );
  },
});

export const { progressData, restartStatus } = dashboardSlice.actions;
export default dashboardSlice.reducer;
