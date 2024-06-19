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
import { createMenteeDocument } from "@/redux/actions/createMenteeDocument";
import { createMenteeContinuation } from "@/redux/actions/createMenteeContinuation";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firestore/firestore";
import { CircularProgress } from "@mui/material";

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [personalDetailsValid, setPersonalDetailsValid] = React.useState(false);
  const [professionalDetailsValid, setProfessionalDetailsValid] =
    React.useState(false);
  const [preferenceDetailsValid, setPreferenceDetailsValid] =
    React.useState(false);
  const [goalsValid, setgoalsValid] = React.useState(false);
  const [personalityValid, setPersonalityValid] = React.useState(false);
  const dispatch = useAppDispatch();
  const createMenteeDocumentStatus = useAppSelector(
    (state) => state?.registration?.status
  );
  const registrationState = useAppSelector((state) => state?.registration);
  const photoUrl = useAppSelector((state) => state.registration?.photoUrl);
  const mentorName = useAppSelector(
    (state) => state.registration?.mentor?.fullName
  );

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
    if (activeStep == 0) {
      if (registrationState?.mentorStateValid) {
        setPersonalDetailsValid(true);
      } else {
        setPersonalDetailsValid(false);
      }
    }
    if (activeStep == 1) {
      if (registrationState?.mentorProfessionalStateValid) {
        setProfessionalDetailsValid(true);
      } else {
        setProfessionalDetailsValid(false);
      }
    }
    if (activeStep == 2) {
      if (
        registrationState?.preferences?.menteeType !== undefined &&
        registrationState?.preferences?.menteeType.trim() !== "" &&
        registrationState?.preferences?.preferences !== undefined &&
        registrationState?.preferences?.preferences.length !== 0
      ) {
        setPreferenceDetailsValid(true);
      } else {
        setPreferenceDetailsValid(false);
      }
    }
    if (activeStep == 3) {
      if (
        registrationState?.goals?.motivation !== undefined &&
        registrationState?.goals?.motivation.trim() !== "" &&
        registrationState?.goals?.outcome !== undefined &&
        registrationState?.goals?.outcome.trim() !== ""
      ) {
        setgoalsValid(true);
      } else {
        setgoalsValid(false);
      }
    }
    if (activeStep == 4) {
      if (
        registrationState?.personalityType?.personalityType !== undefined &&
        registrationState?.personalityType?.personalityType.trim() !== ""
      ) {
        setPersonalityValid(true);
      } else {
        setPersonalityValid(false);
      }
    }
  }, [
    activeStep,
    registrationState?.goals?.motivation,
    registrationState?.goals?.outcome,
    registrationState?.mentorProfessionalStateValid,
    registrationState?.mentorStateValid,
    registrationState?.personalityType?.personalityType,
    registrationState?.preferences?.menteeType,
    registrationState?.preferences?.preferences,
  ]);

  React.useEffect(() => {
    const createMentorDocumentAction = async () => {
      if (activeStep == 5) {
        await dispatch(createMenteeDocument());
        await dispatch(createMenteeContinuation());
        if (photoUrl && photoUrl?.photo) {
          const selectedImageName = photoUrl.photo.name;
          const storageRef = ref(
            storage,
            `images/mentors2024/${mentorName}/${selectedImageName}`
          );

          // Upload the selected image file to Firebase Storage
          uploadBytesResumable(storageRef, photoUrl.photo);
        }
      }
    };

    createMentorDocumentAction(); // Call the function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  const completeStep = () => {
    if (activeStep == 0) {
      return personalDetailsValid;
    }
    if (activeStep == 1) {
      return professionalDetailsValid;
    }
    if (activeStep == 2) {
      return preferenceDetailsValid;
    }
    if (activeStep == 3) {
      return goalsValid;
    }
    if (activeStep == 4) {
      return personalityValid;
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
                    sx={{ mt: 1, mr: 1, backgroundColor: "#1E1F42" }}
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
      createMenteeDocumentStatus == "success" ? (
        <Paper
          square
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: "#1E1F42",
            borderRadius: "5px",
            margin: "3%",
          }}
        >
          <Typography fontFamily={"Arial"} color={"white"} fontWeight={"bold"}>
            Submission completed. You will soon receive a confirmation email.
          </Typography>
        </Paper>
      ) : (
        activeStep === menteeSteps.length &&
        createMenteeDocumentStatus != "success" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={50} />
          </Box>
        )
      )}
    </Box>
  );
}
