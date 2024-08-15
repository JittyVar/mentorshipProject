import EducationalBackgroundComponent from "@/components/subforms/background/backgroundDetails";
import GoalsComponent from "@/components/subforms/goals/goals";
import ProfilePhotoComponent from "@/components/subforms/page";
import PersonalityTypeComponent from "@/components/subforms/personalityType/personalityType";
import MenteePreferencesComponent from "@/components/subforms/preferences/preferences";
import SkillsComponent from "@/components/subforms/skills/skills";
import ProfessionalEducationalBackground from "./subforms/background/professionalBackgroundDetails";

export const menteeSteps = [
  {
    label: "Personal Details",
    content: <ProfilePhotoComponent />,
  },
  {
    label: "Background",
    content: <EducationalBackgroundComponent />,
    content2: <ProfessionalEducationalBackground />,
  },
  {
    label: "Preferences",
    content: <MenteePreferencesComponent />,
  },
  {
    label: "Skills",
    content: <SkillsComponent />,
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
