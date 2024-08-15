"use client";

import { Box, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MultipleSelector from "@/components/multipleSelector";
import { useAppDispatch } from "@/redux/hooks";
import { professionalDetails } from "@/redux/registrationSlice";
import Programs from "@/components/data/programs";
import ProfessionalBackground from "@/redux/states/professionalBackground";

const ProfessionalEducationalBackground = () => {
  const professionalBackgroundState = useSelector(
    (state: RootState) => state.registration?.professionalBackground
  );

  const dispatch = useAppDispatch();
  const [professionalBackground, setProfessionalBackground] =
    useState<ProfessionalBackground>({
      jobTitle: professionalBackgroundState?.jobTitle,
      linkedInUrl: professionalBackgroundState?.linkedInUrl,
    });

  useEffect(() => {
    setProfessionalBackground({
      jobTitle: professionalBackground.jobTitle,
      linkedInUrl: professionalBackground.linkedInUrl,
    });
  }, [professionalBackground.linkedInUrl, professionalBackground.jobTitle]);

  const handleChange = (
    fieldName: keyof ProfessionalBackground,
    value: string
  ) => {
    setProfessionalBackground((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    localStorage.removeItem("educationalBackgroundState");
  }, []);

  useEffect(() => {
    dispatch(professionalDetails(professionalBackground));
  });

  return (
    <Box>
      <Container>
        <Typography sx={{ margin: "1%" }}>Job title</Typography>
        <TextField
          id="jobtitle"
          fullWidth
          required
          onChange={(e) => handleChange("jobTitle", e.target.value)}
          placeholder={professionalBackgroundState?.jobTitle || ""}
          sx={{
            "& .MuiOutlinedInput-input": {
              backgroundColor: "white",
              border: 1,
              borderRadius: 2,
              borderColor: "black",
            },
          }}
        />
        <Typography sx={{ margin: "1%" }}>Your linkedin URL</Typography>
        <TextField
          id="linkedInUrl"
          fullWidth
          required
          onChange={(e) => handleChange("linkedInUrl", e.target.value)}
          placeholder={professionalBackgroundState?.jobTitle || ""}
          sx={{
            "& .MuiOutlinedInput-input": {
              backgroundColor: "white",
              border: 1,
              borderRadius: 2,
              borderColor: "black",
            },
          }}
        />
      </Container>
    </Box>
  );
};

export default ProfessionalEducationalBackground;
