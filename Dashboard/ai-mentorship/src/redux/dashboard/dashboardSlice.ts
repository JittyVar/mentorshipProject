import { HomeTableColumns } from "@/data/HomeTableColumns";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchMenteeCollections } from "./actions/fetchMenteeCollection";
import { TotalMentees } from "./actions/totalMentees";
import { TotalMentors } from "./actions/totalMentors";
import { WithMentees } from "./actions/withMentees";
import { WithMentors } from "./actions/withMentors";
import { WithNoMentees } from "./actions/withNoMentees";
import { WithNoMentors } from "./actions/withNoMentors";
import { UpdateStatus } from "./actions/updateStatus";
import { UpdateStatusToInProgress } from "./actions/updateMenteeStatusToInProgress";
import { FetchMentorCollections } from "./actions/fetchMentorCollections";
import { FetchCollections } from "./actions/fetchCollection";
import { GetPairResult } from "./actions/getPairResults";

export enum APIStatus {
  idle = "idle",
  loading = "loading",
  success = "success",
  error = "error",
}

export interface HomeDataRows {
  mentorRows: HomeTableColumns[];
  mentorRowsStatus: APIStatus;
  menteeRows: HomeTableColumns[];
  menteeRowsStatus: APIStatus;
  rows: HomeTableColumns[];
  status: APIStatus;
  inProgressStatus: APIStatus;
  completeStatus: APIStatus;
  totalMentees: number;
  totalMentors: number;
  withMentees: number;
  withMentors: number;
  withNoMentees: number;
  withNoMentors: number;
  pairingResults: [];
  pairingResultsStatus: APIStatus;
}

const initialState: HomeDataRows = {
  mentorRows: [],
  menteeRows: [],
  rows: [],
  mentorRowsStatus: APIStatus.idle,
  menteeRowsStatus: APIStatus.idle,
  status: APIStatus.idle,
  inProgressStatus: APIStatus.idle,
  completeStatus: APIStatus.idle,
  totalMentees: 0,
  totalMentors: 0,
  withMentees: 0,
  withMentors: 0,
  withNoMentees: 0,
  withNoMentors: 0,
  pairingResults: [],
  pairingResultsStatus: APIStatus.idle,
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
      .addCase(FetchCollections.pending, (state) => {
        state.status = APIStatus.loading;
      })
      .addCase(
        FetchCollections.fulfilled,
        (state, action: PayloadAction<HomeTableColumns[]>) => {
          state.rows = action.payload;
          state.status = APIStatus.success;
        }
      )
      .addCase(FetchCollections.rejected, (state) => {
        state.status = APIStatus.error;
      });
    builder
      .addCase(FetchMenteeCollections.pending, (state) => {
        state.menteeRowsStatus = APIStatus.loading;
      })
      .addCase(
        FetchMenteeCollections.fulfilled,
        (state, action: PayloadAction<HomeTableColumns[]>) => {
          state.menteeRows = action.payload;
          state.menteeRowsStatus = APIStatus.success;
        }
      )
      .addCase(FetchMenteeCollections.rejected, (state) => {
        state.menteeRowsStatus = APIStatus.error;
      });
    builder
      .addCase(FetchMentorCollections.pending, (state) => {
        state.mentorRowsStatus = APIStatus.loading;
      })
      .addCase(
        FetchMentorCollections.fulfilled,
        (state, action: PayloadAction<HomeTableColumns[]>) => {
          state.mentorRows = action.payload;
          state.mentorRowsStatus = APIStatus.success;
        }
      )
      .addCase(FetchMentorCollections.rejected, (state) => {
        state.mentorRowsStatus = APIStatus.error;
      });
    builder
      .addCase(UpdateStatusToInProgress.pending, (state) => {
        state.inProgressStatus = APIStatus.loading;
      })
      .addCase(UpdateStatusToInProgress.fulfilled, (state) => {
        state.inProgressStatus = APIStatus.success;
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
    builder
      .addCase(GetPairResult.pending, (state) => {
        state.pairingResultsStatus = APIStatus.loading;
      })
      .addCase(GetPairResult.fulfilled, (state, action) => {
        state.pairingResults = action.payload;
        state.pairingResultsStatus = APIStatus.success;
      })
      .addCase(GetPairResult.rejected, (state) => {
        state.pairingResultsStatus = APIStatus.error;
      });
  },
});

export const { progressData, restartStatus } = dashboardSlice.actions;
export default dashboardSlice.reducer;
