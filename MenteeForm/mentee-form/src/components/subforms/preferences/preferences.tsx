"use client";
import Preferences from "@/redux/states/preferences";
import { Box, Container, TextField, Typography } from "@mui/material";
import MultipleSelector from "@/components/multipleSelector";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { preferencesDetails } from "@/redux/registrationSlice";
import STEMSector from "@/components/data/stemSector";

const MentorTypesData = ["Male", "Female", "No Preference"];
const MenteePreferencesComponent = () => {
  const dispatch = useAppDispatch();
  const menteePreferencesState = useAppSelector(
    (state) => state.registration?.preferences
  );
  const [menteePreferences, setMenteePreferences] = useState<Preferences>({
    preferences: menteePreferencesState?.preferences,
    stemSector: menteePreferencesState?.stemSector,
  });

  const [chosenPreferences, setChosenPreferences] = React.useState<string[]>(
    []
  );

  const [chosenStemSector, setStemSector] = React.useState<string[]>([]);

  useEffect(() => {
    setMenteePreferences({
      preferences: chosenPreferences,
      stemSector: chosenStemSector,
    });
  }, [chosenPreferences, chosenStemSector]);

  useEffect(() => {
    dispatch(preferencesDetails(menteePreferences));
  });

  return (
    <Box>
      <Container>
        <div style={{ alignItems: "center", gap: "3%" }}>
          <Typography sx={{ margin: "1%" }}>I prefer</Typography>
          <MultipleSelector
            data={MentorTypesData}
            chosenData={(data: string[]) => setChosenPreferences(data)}
          ></MultipleSelector>
        </div>
        <div style={{ alignItems: "center", gap: "3%" }}>
          <Typography sx={{ margin: "1%" }}>STEM Sector interest</Typography>
          <MultipleSelector
            data={STEMSector}
            chosenData={(data: string[]) => setStemSector(data)}
          ></MultipleSelector>
        </div>
      </Container>
    </Box>
  );
};

export default MenteePreferencesComponent;
