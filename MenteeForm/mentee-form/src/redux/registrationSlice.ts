import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenteeState } from "./states/mentee";
import EducationalBackground from "./states/background";
import Preferences from "./states/preferences";
import { Skills } from "./states/skills/skills";
import { BasicSkills } from "./states/skills/basicSkills";
import { ExpertSkills } from "./states/skills/expertSkills";
import { Goals } from "./states/goals";
import { PersonalityType } from "./states/personalityType";
import { store } from "./store";
import { createMenteeDocumentSkills } from "./actions/createMenteeDocumentSkills";
import { createMenteeDocumentGoals } from "./actions/createMenteeDocumentGoals";
import { createMenteeDocumentPreferences } from "./actions/createMenteeDocumentPreferences";
import ProfessionalBackground from "./states/professionalBackground";

export enum APIStatus {
  idle = "idle",
  loading = "loading",
  success = "success",
  error = "error",
}

export interface FileMetadata {
  photo: File;
}

export interface registrationForm {
  status: "idle" | "loading" | "success" | "error";
  mentee: MenteeState;
  educationalBackground: EducationalBackground;
  professionalBackground: ProfessionalBackground;
  preferences: Preferences;
  skills: Skills;
  goals: Goals;
  personalityType: PersonalityType;
  photoUrl: FileMetadata;
  menteeStateValid: boolean;
  menteeSkillsValid: boolean;
  menteeGoalsValid: boolean;
}

const initialState: registrationForm = {
  status: "idle",
  mentee: {} as MenteeState,
  educationalBackground: {} as EducationalBackground,
  professionalBackground: {} as ProfessionalBackground,
  preferences: {} as Preferences,
  skills: {
    basicSkills: {} as BasicSkills,
    expertSkills: {} as ExpertSkills,
  },
  goals: {} as Goals,
  personalityType: {} as PersonalityType,
  photoUrl: {} as FileMetadata,
  menteeStateValid: false,
  menteeSkillsValid: false,
  menteeGoalsValid: false,
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
    menteePersonalDetails: (state, action: PayloadAction<MenteeState>) => {
      state.mentee = action.payload;
    },
    backgroundDetails: (
      state,
      action: PayloadAction<EducationalBackground>
    ) => {
      state.educationalBackground = action.payload;
    },
    professionalDetails: (
      state,
      action: PayloadAction<ProfessionalBackground>
    ) => {
      state.professionalBackground = action.payload;
    },
    preferencesDetails: (state, action: PayloadAction<Preferences>) => {
      state.preferences = action.payload;
    },
    skillsDetails: (state, action: PayloadAction<Skills>) => {
      state.skills = action.payload;
    },
    goalsDetails: (state, action: PayloadAction<Goals>) => {
      state.goals.firstShortTermGoal = action.payload.firstShortTermGoal;
      state.goals.longTermGoal = action.payload.longTermGoal;
      state.goals.outcome = action.payload.outcome;
      state.goals.secondShortTermGoal = "random short term goal";
    },
    personalityTypeDetails: (state, action: PayloadAction<PersonalityType>) => {
      state.personalityType = action.payload;
    },
    photoUrl: (state, action: PayloadAction<FileMetadata>) => {
      state.photoUrl = action.payload;
    },
    menteeStateValid: (state, action: PayloadAction<boolean>) => {
      state.menteeStateValid = action.payload;
    },
    menteeSkillsValid: (state, action: PayloadAction<boolean>) => {
      state.menteeSkillsValid = action.payload;
    },
    menteeGoalsValid: (state, action: PayloadAction<boolean>) => {
      state.menteeGoalsValid = action.payload;
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
    builder
      .addCase(createMenteeDocumentSkills.pending, (state) => {
        state.status = APIStatus.loading;
        console.log("pending");
      })
      .addCase(createMenteeDocumentSkills.fulfilled, (state) => {
        state.status = APIStatus.success;
        console.log("mentee created");
      })
      .addCase(createMenteeDocumentSkills.rejected, (state) => {
        state.status = APIStatus.error;
      });
    builder
      .addCase(createMenteeDocumentGoals.pending, (state) => {
        state.status = APIStatus.loading;
        console.log("pending");
      })
      .addCase(createMenteeDocumentGoals.fulfilled, (state) => {
        state.status = APIStatus.success;
        console.log("mentee created");
      })
      .addCase(createMenteeDocumentGoals.rejected, (state) => {
        state.status = APIStatus.error;
      });
    builder
      .addCase(createMenteeDocumentPreferences.pending, (state) => {
        state.status = APIStatus.loading;
        console.log("pending");
      })
      .addCase(createMenteeDocumentPreferences.fulfilled, (state) => {
        state.status = APIStatus.success;
        console.log("mentee created");
      })
      .addCase(createMenteeDocumentPreferences.rejected, (state) => {
        state.status = APIStatus.error;
      });
  },
});

export const {
  menteePersonalDetails,
  backgroundDetails,
  professionalDetails,
  preferencesDetails,
  skillsDetails,
  goalsDetails,
  personalityTypeDetails,
  photoUrl,
  menteeStateValid,
  menteeSkillsValid,
  menteeGoalsValid,
} = registrationSlice.actions;
export default registrationSlice.reducer;
