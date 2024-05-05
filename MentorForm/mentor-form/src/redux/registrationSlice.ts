import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MentorState } from "./states/mentor";
import ProfessionalDetails from "./states/professionalDetails";
import Preferences from "./states/preferences";
import { Skills } from "./states/skills/skills";
import { BasicSkills } from "./states/skills/basicSkills";
import { ExpertSkills } from "./states/skills/expertSkills";
import { Goals } from "./states/goals";
import { PersonalityType } from "./states/personalityType";
import { store } from "./store";

export enum APIStatus {
  idle = "idle",
  loading = "loading",
  success = "success",
  error = "error",
}

export interface registrationForm {
  status: "idle" | "loading" | "success" | "error";
  mentor: MentorState;
  professionalDetails: ProfessionalDetails;
  preferences: Preferences;
  skills: Skills;
  goals: Goals;
  personalityType: PersonalityType;
}

const initialState: registrationForm = {
  status: "idle",
  mentor: {} as MentorState,
  professionalDetails: {} as ProfessionalDetails,
  preferences: {} as Preferences,
  skills: {
    basicSkills: {} as BasicSkills,
    expertSkills: {} as ExpertSkills,
  },
  goals: {} as Goals,
  personalityType: {} as PersonalityType,
};

export const createMenteeDocument = createAsyncThunk(
  "registration/createMenteeDocument",
  async () => {
    try {
      const registrationSlice = store.getState().registration;
      const response = await fetch("/api/put", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationSlice),
      });
      return response.json(); // Parses JSON response into native JavaScript object
    } catch (error) {
      throw error;
    }
  }
);

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    menteePersonalDetails: (state, action: PayloadAction<MentorState>) => {
      state.mentor = action.payload;
    },
    backgroundDetails: (state, action: PayloadAction<ProfessionalDetails>) => {
      state.professionalDetails = action.payload;
    },
    preferencesDetails: (state, action: PayloadAction<Preferences>) => {
      state.preferences = action.payload;
    },
    skillsDetails: (state, action: PayloadAction<Skills>) => {
      state.skills = action.payload;
    },
    goalsDetails: (state, action: PayloadAction<Goals>) => {
      state.goals = action.payload;
    },
    personalityTypeDetails: (state, action: PayloadAction<PersonalityType>) => {
      state.personalityType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenteeDocument.pending, (state) => {
        state.status = APIStatus.loading;
        console.log("pending");
      })
      .addCase(createMenteeDocument.fulfilled, (state) => {
        state.status = APIStatus.success;
        console.log("mentee created");
      })
      .addCase(createMenteeDocument.rejected, (state) => {
        state.status = APIStatus.error;
      });
  },
});

export const {
  menteePersonalDetails,
  backgroundDetails,
  preferencesDetails,
  skillsDetails,
  goalsDetails,
  personalityTypeDetails,
} = registrationSlice.actions;
export default registrationSlice.reducer;