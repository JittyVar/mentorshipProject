"use client";
import Preferences from "@/redux/states/preferences";
import {
  Box,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import MultipleSelector from "@/components/multipleSelector";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { preferencesDetails } from "@/redux/registrationSlice";

const MentorTypesData = ["Male mentor", "Female mentor", "No Preferences"];
const MenteePreferencesComponent = () => {
  const dispatch = useAppDispatch();
  const menteePreferencesState = useAppSelector(
    (state) => state.registration.preferences
  );
  const [mentorPreferences, setMentorPreferences] = useState<Preferences>({
    preferences: menteePreferencesState.preferences,
    menteeType: menteePreferencesState.menteeType,
    studentType: menteePreferencesState.studentType,
  });

  const [chosenPreferences, setChosenPreferences] = React.useState<string[]>(
    []
  );

  //Mentee extends user state
  const handleChange = (fieldName: keyof Preferences, value: string) => {
    setMentorPreferences((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const [studentType, setStudentType] = React.useState<string[]>([]);

  useEffect(() => {
    setMentorPreferences({
      preferences: chosenPreferences,
      menteeType: mentorPreferences.menteeType,
      studentType: studentType,
    });
  }, [chosenPreferences, mentorPreferences.menteeType, studentType]);

  useEffect(() => {
    dispatch(preferencesDetails(mentorPreferences));
  });

  return (
    <Box>
      <Container>
        <div style={{ alignItems: "center", gap: "3%" }}>
          {/* <Typography sx={{ margin: "1%" }}>
            What type/s of mentor would you prefer?
          </Typography>
          <MultipleSelector
            data={MentorTypesData}
            chosenData={(data: string[]) => setChosenPreferences(data)}
          ></MultipleSelector> */}
          <Typography sx={{ margin: "1%", paddingTop: "10px" }}>
            What type/s of mentee would you prefer?
          </Typography>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ margin: "1%" }}
            value={
              mentorPreferences.menteeType !== undefined
                ? mentorPreferences.menteeType
                : ""
            }
            onChange={(e) => handleChange("menteeType", e.target.value)}
          >
            <FormControlLabel
              value="Undergraduate/Graduate"
              control={<Radio />}
              label="Undergraduate/Graduate"
            />
            <FormControlLabel
              value="Postgraduate"
              control={<Radio />}
              label="Post Graduate"
            />
            <FormControlLabel
              value="Professional"
              control={<Radio />}
              label="Professional"
            />
          </RadioGroup>
        </div>
        <div style={{ marginTop: "4%", marginBottom: "4%" }}>
          <Typography sx={{ margin: "1%" }}>
            Which subjects are best aligned with your expertise??
          </Typography>
          <MultipleSelector
            data={[
              "Analytics",
              "Digital Services",
              "Mathematical Modelling and Computation",
              "Software Development",
              "Software Engineering",
            ]}
            chosenData={(data: string[]) => setStudentType(data)}
          ></MultipleSelector>
        </div>
      </Container>
    </Box>
  );
};

export default MenteePreferencesComponent;
