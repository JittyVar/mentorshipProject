"use client";

import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import ProfessionalDetails from "@/redux/states/professionalDetails";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import {
  backgroundDetails,
  mentorProfessionalStateValid,
} from "@/redux/registrationSlice";

export const data = ["Test", "Test 2"];
export const major = ["Major", "Major 2"];

const ProfessionalBackgroundComponent = () => {
  const professionalDetailsState = useSelector(
    (state: RootState) => state.registration.professionalDetails
  );
  const dispatch = useAppDispatch();
  const [jobTitleError, setJobTitleError] = useState(false);
  const [organisationError, setOrganisationError] = useState(false);
  const [specialisationError, setSpecialisationError] = useState(false);
  const [values, setValues] = useState<ProfessionalDetails>({
    jobTitle: professionalDetailsState?.jobTitle,
    organisation: professionalDetailsState?.organisation,
    specialisation: professionalDetailsState?.specialisation,
  });

  useEffect(() => {
    localStorage.removeItem("professionalDetailsState");
  }, []);

  useEffect(() => {
    if (
      !jobTitleError &&
      !organisationError &&
      !specialisationError &&
      values?.jobTitle !== undefined &&
      values?.jobTitle.trim() !== "" &&
      values?.organisation !== undefined &&
      values?.organisation.trim() !== "" &&
      values?.specialisation !== undefined &&
      values?.specialisation.trim() !== ""
    ) {
      dispatch(mentorProfessionalStateValid(true));
    } else {
      dispatch(mentorProfessionalStateValid(false));
    }
  }, [
    dispatch,
    jobTitleError,
    organisationError,
    specialisationError,
    values?.jobTitle,
    values?.organisation,
    values?.specialisation,
  ]);

  const handleChange = (
    fieldName: keyof ProfessionalDetails,
    value: string
  ) => {
    if (fieldName === "organisation") {
      setOrganisationError(value.trim() === "");
    } else if (fieldName === "jobTitle") {
      setJobTitleError(value.trim() === "");
    } else if (fieldName === "specialisation") {
      setSpecialisationError(value.trim() === "");
    }

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
      <div style={{ paddingTop: "2%" }}>
        <Typography sx={{ m: 1 }}>Job title</Typography>
        <TextField
          id="fullName"
          fullWidth
          onChange={(e) => handleChange("jobTitle", e.target.value)}
          placeholder={professionalDetailsState?.jobTitle || ""}
          sx={{
            backgroundColor: "white",
            border: 1,
            borderRadius: 2,
            borderColor: "black",
          }}
        />
      </div>
      <div style={{ paddingTop: "2%" }}>
        <Typography sx={{ margin: "1%" }}>Current Organisation</Typography>
        <TextField
          id="gender"
          onChange={(e) => handleChange("organisation", e.target.value)}
          fullWidth
          placeholder={professionalDetailsState?.organisation || ""}
          sx={{
            m: 1,
            backgroundColor: "white",
            border: 1,
            borderRadius: 2,
            borderColor: "black",
          }}
        />
      </div>
      <div style={{ paddingTop: "2%" }}>
        <Typography sx={{ margin: "1%" }}>Your LinkedIn URL</Typography>
        <TextField
          id="gender"
          sx={{
            m: 1,
            backgroundColor: "white",
            border: 1,
            borderRadius: 2,
            borderColor: "black",
          }}
          onChange={(e) => handleChange("specialisation", e.target.value)}
          fullWidth
          placeholder={professionalDetailsState?.specialisation || ""}
        />
      </div>
    </Box>
  );
};

export default ProfessionalBackgroundComponent;
