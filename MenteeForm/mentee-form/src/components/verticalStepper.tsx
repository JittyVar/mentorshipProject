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

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [allowNext, setAllowNext] = React.useState(false);
  const [backgroundDetailsComplete, setBackgroundDetailsComplete] =
    React.useState(false);
  const dispatch = useAppDispatch();
  const createMenteeDocumentStatus = useAppSelector(
    (state) => state.registration?.status
  );
  const photoUrl = useAppSelector((state) => state.registration?.photoUrl);
  const menteeName = useAppSelector(
    (state) => state.registration?.mentee.fullName
  );

  const menteePersonalDetails = useAppSelector(
    (state) => state.registration?.mentee
  );

  const menteeBackgroundDetails = useAppSelector(
    (state) => state.registration?.educationalBackground
  );

  React.useEffect(() => {
    if (
      menteePersonalDetails.fullName !== undefined &&
      menteePersonalDetails.fullName.trim() !== "" &&
      menteePersonalDetails.age !== undefined &&
      menteePersonalDetails.age.toString() !== "" &&
      menteePersonalDetails.currentStage !== undefined &&
      menteePersonalDetails.currentStage.trim() !== "" &&
      menteePersonalDetails.emailAddress !== undefined &&
      menteePersonalDetails.emailAddress.trim() !== "" &&
      menteePersonalDetails.phoneNumber !== undefined &&
      menteePersonalDetails.phoneNumber.trim() !== ""
    ) {
      setAllowNext(true);
    } else {
      setAllowNext(false);
    }

    if (activeStep == 1) {
      if (
        menteeBackgroundDetails?.majors != null &&
        menteeBackgroundDetails?.programs != null &&
        menteeBackgroundDetails.yearOfDegree != undefined
      ) {
        setBackgroundDetailsComplete(true);
      }
    }
  }, [
    activeStep,
    allowNext,
    menteeBackgroundDetails,
    menteePersonalDetails,
    menteePersonalDetails.age,
    menteePersonalDetails.currentStage,
    menteePersonalDetails.emailAddress,
    menteePersonalDetails.fullName,
    menteePersonalDetails.phoneNumber,
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
  };

  React.useEffect(() => {
    console.log("completeStep ", allowNext);
  }, [allowNext]);

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
