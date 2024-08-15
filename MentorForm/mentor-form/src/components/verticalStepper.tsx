"use client";

import * as React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
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
import { Backdrop, CircularProgress } from "@mui/material";
import { createMenteeContinuationSkills } from "@/redux/actions/createMenteeContinuationSkills";

export default function VerticalLinearStepper() {
  const { user, error, isLoading } = useUser();
  const [activeStep, setActiveStep] = React.useState(0);
  const [personalDetailsValid, setPersonalDetailsValid] = React.useState(false);
  const [professionalDetailsValid, setProfessionalDetailsValid] =
    React.useState(false);
  const [preferenceDetailsValid, setPreferenceDetailsValid] =
    React.useState(false);
  const [skillsValid, setSkillsValid] = React.useState(false);
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

  React.useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/api/auth/login";
    }
  }, [isLoading, user]);

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
      if (registrationState?.mentorSkillsValid) {
        setSkillsValid(true);
      } else {
        setSkillsValid(false);
      }
    }
    if (activeStep == 4) {
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
    if (activeStep == 5) {
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
    registrationState?.mentorSkillsValid,
    registrationState?.mentorProfessionalStateValid,
    registrationState?.mentorStateValid,
    registrationState?.personalityType?.personalityType,
    registrationState?.preferences?.menteeType,
    registrationState?.preferences?.preferences,
  ]);

  React.useEffect(() => {
    const createMentorDocumentAction = async () => {
      if (activeStep == 6) {
        await dispatch(createMenteeDocument());
        await dispatch(createMenteeContinuation());
        await dispatch(createMenteeContinuationSkills());
        // if (photoUrl && photoUrl?.photo) {
        //   const selectedImageName = photoUrl.photo.name;
        //   const storageRef = ref(
        //     storage,
        //     `images/mentors2024/${mentorName}/${selectedImageName}`
        //   );

        //   // Upload the selected image file to Firebase Storage
        //   uploadBytesResumable(storageRef, photoUrl.photo);
        // }
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
      return skillsValid;
    }
    if (activeStep == 4) {
      return goalsValid;
    }
    if (activeStep == 5) {
      return personalityValid;
    }
  };

  return isLoading || !user ? (
    <Backdrop
      sx={{
        color: "black",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#F4E6F2",
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Box
      sx={{
        backgroundColor: "#F4E6F2",
        padding: "5%",
        borderRadius: "1%",
        marginTop: "%",
      }}
    >
      {/* <a href="/api/auth/logout">Logout</a> */}
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
            Submission completed. Our team will soon reach out with a
            confirmation email.
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
