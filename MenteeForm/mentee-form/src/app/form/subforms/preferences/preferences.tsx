"use client";
import Preferences from "@/redux/states/preferences";
import { Box, Container, TextField, Typography } from "@mui/material";
import MultipleSelector from "@/components/multipleSelector";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { preferencesDetails } from "@/redux/registrationSlice";

import * as fs from "fs";

const MentorTypesData = ["Male mentor", "Female mentor", "No Preferences"];
const StemSectorData = ["Engineering", "Math", "No Preferences"];
const MenteePreferencesComponent = () => {
  const dispatch = useAppDispatch();
  const menteePreferencesState = useAppSelector(
    (state) => state.registration.preferences
  );
  const [menteePreferences, setMenteePreferences] = useState<Preferences>({
    preferences: menteePreferencesState.preferences,
    stemSector: menteePreferencesState.stemSector,
    expectation: menteePreferencesState.expectation,
  });

  const [chosenPreferences, setChosenPreferences] = React.useState<string[]>(
    []
  );

  const [chosenStemSector, setStemSector] = React.useState<string[]>([]);

  //Mentee extends user state
  const handleChange = (fieldName: keyof Preferences, value: string) => {
    setMenteePreferences((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    setMenteePreferences({
      preferences: chosenPreferences,
      stemSector: chosenStemSector,
      expectation: menteePreferences.expectation,
    });
  }, [chosenPreferences, menteePreferences.expectation, chosenStemSector]);

  useEffect(() => {
    dispatch(preferencesDetails(menteePreferences));
  });

  return (
    <Box>
      <Container>
        <div style={{ alignItems: "center", gap: "3%" }}>
          <Typography sx={{ margin: "1%" }}>
            What type/s of mentor would you prefer?
          </Typography>
          <MultipleSelector
            data={MentorTypesData}
            chosenData={(data: string[]) => setChosenPreferences(data)}
          ></MultipleSelector>
        </div>
        <div style={{ alignItems: "center", gap: "3%" }}>
          <Typography sx={{ margin: "1%" }}>STEM Sector interest</Typography>
          <MultipleSelector
            data={StemSectorData}
            chosenData={(data: string[]) => setStemSector(data)}
          ></MultipleSelector>
        </div>
        <div style={{ paddingTop: "2%" }}>
          <Typography sx={{ margin: "1%", width: "46ch" }}>
            Expectation from this mentorship program
          </Typography>
          <TextField
            id="expectation"
            multiline
            sx={{
              m: 1,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                border: 1,
                borderRadius: 2,
                borderColor: "black",
              },
            }}
            fullWidth
            onChange={(e) => handleChange("expectation", e.target.value)}
            value={
              menteePreferencesState.expectation !== undefined
                ? menteePreferencesState.expectation
                : ""
            }
          />
        </div>
      </Container>
    </Box>
  );
};

export default MenteePreferencesComponent;
