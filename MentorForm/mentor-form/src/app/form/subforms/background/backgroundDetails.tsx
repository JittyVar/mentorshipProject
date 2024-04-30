"use client";

import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import ProfessionalDetails from "@/redux/states/professionalDetails";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { backgroundDetails } from "@/redux/registrationSlice";

export const data = ["Test", "Test 2"];
export const major = ["Major", "Major 2"];

const ProfessionalBackgroundComponent = () => {
  const professionalDetailsState = useSelector(
    (state: RootState) => state.registration.professionalDetails
  );
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<ProfessionalDetails>({
    jobTitle: professionalDetailsState.jobTitle,
    organisation: professionalDetailsState.organisation,
    specialisation: professionalDetailsState.specialisation,
  });

  const handleChange = (
    fieldName: keyof ProfessionalDetails,
    value: string
  ) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };
  useEffect(() => {
    dispatch(backgroundDetails(values));
  });

  return (
    <Box>
      <div style={{ display: "flex" }}>
        <Typography sx={{ m: 1, width: "17ch" }}>Job title</Typography>
        <TextField
          id="fullName"
          fullWidth
          onChange={(e) => handleChange("jobTitle", e.target.value)}
          value={professionalDetailsState.jobTitle}
        />
      </div>
      <div style={{ display: "flex", paddingTop: "2%" }}>
        <Typography sx={{ margin: "1%", width: "16ch" }}>
          Current Organisation
        </Typography>
        <TextField
          id="gender"
          sx={{ m: 1 }}
          onChange={(e) => handleChange("organisation", e.target.value)}
          fullWidth
          value={professionalDetailsState.organisation}
        />
      </div>
      <div style={{ display: "flex", paddingTop: "2%" }}>
        <Typography sx={{ margin: "1%", width: "16ch" }}>
          Specialisation
        </Typography>
        <TextField
          id="gender"
          sx={{ m: 1 }}
          onChange={(e) => handleChange("specialisation", e.target.value)}
          fullWidth
          value={professionalDetailsState.specialisation}
        />
      </div>
    </Box>
  );
};

export default ProfessionalBackgroundComponent;
