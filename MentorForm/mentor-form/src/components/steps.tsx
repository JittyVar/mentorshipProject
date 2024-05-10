import ProfessionalBackgroundComponent from "@/app/form/subforms/background/backgroundDetails";
import GoalsComponent from "@/app/form/subforms/goals/goals";
import ProfilePhotoComponent from "@/app/form/subforms/page";
import PersonalityTypeComponent from "@/app/form/subforms/personalityType/personalityType";
import MenteePreferencesComponent from "@/app/form/subforms/preferences/preferences";
import SkillsComponent from "@/app/form/subforms/skills/skills";

export const menteeSteps = [
  {
    label: "Personal Details",
    content: <ProfilePhotoComponent />,
  },
  {
    label: "Professional Background",
    content: <ProfessionalBackgroundComponent />,
  },
  {
    label: "Preferences",
    content: <MenteePreferencesComponent />,
  },
  {
    label: "Goals",
    content: <GoalsComponent />,
  },
  {
    label: "Personality Type",
    content: <PersonalityTypeComponent />,
  },
];
