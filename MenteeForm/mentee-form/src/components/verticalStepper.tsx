"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { menteeSteps } from "./steps";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createMenteeDocument } from "@/redux/registrationSlice";
import { APIStatus } from "@/redux/registrationSlice";
import { createMenteeDocumentSkills } from "@/redux/actions/createMenteeDocumentSkills";
import { createMenteeDocumentGoals } from "@/redux/actions/createMenteeDocumentGoals";
import { createMenteeDocumentPreferences } from "@/redux/actions/createMenteeDocumentPreferences";
import { storage } from "@/firestore/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [allowNext, setAllowNext] = useState(false);
  const [backgroundDetailsComplete, setBackgroundDetailsComplete] =
    React.useState(false);
  const [preferencesDetailsComplete, setPreferencesDetailsComplete] =
    React.useState(false);
  const [skillsComplete, setSkillsComplete] = React.useState(false);
  const [goalsComplete, setGoalsComplete] = React.useState(false);
  const [personalityTypeComplete, setPersonalityTypeComplete] =
    React.useState(false);
  const dispatch = useAppDispatch();
  const createMenteeDocumentStatus = useAppSelector(
    (state) => state.registration?.status
  );
  const photoUrl = useAppSelector((state) => state.registration?.photoUrl);
  const registrationState = useAppSelector((state) => state.registration);
  const menteeName = useAppSelector(
    (state) => state.registration?.mentee?.fullName
  );

  const menteePersonalDetailsValid = useAppSelector(
    (state) => state.registration?.menteeStateValid
  );

  const menteeBackgroundDetails = useAppSelector(
    (state) => state.registration?.educationalBackground
  );

  const menteePreferenceDetails = useAppSelector(
    (state) => state.registration?.preferences
  );

  const menteeSkillsDetails = useAppSelector(
    (state) => state.registration?.menteeSkillsValid
  );

  React.useEffect(() => {
    if (activeStep == 0) {
      if (menteePersonalDetailsValid) {
        setAllowNext(true);
      } else {
        setAllowNext(false);
      }
    }

    if (activeStep == 1) {
      if (
        menteeBackgroundDetails?.majors?.length != 0 &&
        menteeBackgroundDetails?.programs?.length != 0 &&
        menteeBackgroundDetails?.yearOfDegree != undefined &&
        menteeBackgroundDetails?.yearOfDegree.trim() !== ""
      ) {
        setBackgroundDetailsComplete(true);
      } else {
        setBackgroundDetailsComplete(false);
      }
    }

    if (activeStep == 2) {
      if (
        menteePreferenceDetails?.preferences?.length != 0 &&
        menteePreferenceDetails?.stemSector?.length != 0
      ) {
        setPreferencesDetailsComplete(true);
      } else {
        setPreferencesDetailsComplete(false);
      }
    }
    if (activeStep == 3) {
      if (menteeSkillsDetails) {
        setSkillsComplete(true);
      } else {
        setSkillsComplete(false);
      }
    }

    if (activeStep == 4) {
      if (registrationState?.menteeGoalsValid) {
        setGoalsComplete(true);
      } else {
        setGoalsComplete(false);
      }
    }

    if (activeStep == 5) {
      if (
        registrationState?.personalityType?.personalityType != undefined &&
        registrationState?.personalityType?.personalityType.trim() !== ""
      ) {
        setPersonalityTypeComplete(true);
      } else {
        setPersonalityTypeComplete(false);
      }
    }
  }, [
    activeStep,
    menteeBackgroundDetails?.majors?.length,
    menteeBackgroundDetails?.programs?.length,
    menteeBackgroundDetails?.yearOfDegree,
    menteePersonalDetailsValid,
    menteePreferenceDetails?.preferences?.length,
    menteePreferenceDetails?.stemSector?.length,
    menteeSkillsDetails,
    registrationState?.menteeGoalsValid,
    registrationState?.personalityType?.personalityType,
  ]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  React.useEffect(() => {
    const createMenteeDocumentAction = async () => {
      if (activeStep == 6) {
        await dispatch(createMenteeDocument());
        await dispatch(createMenteeDocumentSkills());
        await dispatch(createMenteeDocumentPreferences());
        await dispatch(createMenteeDocumentGoals());
        if (!photoUrl) return;

        const selectedImageName = photoUrl?.photo.name;
        console.log("name", menteeName);
        const storageRef = ref(
          storage,
          `images/mentees2024/${menteeName}/${selectedImageName}`
        );

        // Upload the selected image file to Firebase Storage
        uploadBytesResumable(storageRef, photoUrl?.photo);
      }
    };

    createMenteeDocumentAction(); // Call the function
  }, [activeStep, dispatch, menteeName, photoUrl]);

  const completeStep = () => {
    if (activeStep == 0) {
      return allowNext;
    }
    if (activeStep == 1) {
      return backgroundDetailsComplete;
    }
    if (activeStep == 2) {
      return preferencesDetailsComplete;
    }
    if (activeStep == 3) {
      return skillsComplete;
    }
    if (activeStep == 4) {
      return goalsComplete;
    }
    if (activeStep == 5) {
      return personalityTypeComplete;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F4E6F2",
        padding: "5%",
        borderRadius: "1%",
        marginTop: "%",
      }}
    >
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          "& .MuiStepLabel-label": { color: "#1E1F42" },
          "& .MuiStepLabel-label.Mui-active": {
            color: "#1E1F42",
            fontWeight: "bold",
            fontSize: "20px",
          },
          "& .MuiStepLabel-label.Mui-completed": {
            color: "#1E1F42",
            fontSize: "20px",
            fontWeight: "bold",
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#8F3880",
            fontSize: "xx-large",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "#8F3880",
          },
        }}
      >
        {menteeSteps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === menteeSteps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.content}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={!completeStep()}
                  >
                    {index === menteeSteps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === menteeSteps.length &&
        createMenteeDocumentStatus == APIStatus.success && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Submission completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
    </Box>
  );
}
