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

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useAppDispatch();
  const createMenteeDocumentStatus = useAppSelector(
    (state) => state.registration.status
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
    const createMenteeDocumentAction = async () => {
      if (activeStep == 5) {
        await dispatch(createMenteeDocument());
      }
    };

    createMenteeDocumentAction(); // Call the function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
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
        createMenteeDocumentStatus == "success" && (
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