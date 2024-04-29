"use client";
import Preferences from "@/redux/states/preferences";
import { Box, Container, Typography } from "@mui/material";
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
  const [menteePreferences, setMenteePreferences] = useState<Preferences>({
    preferences: menteePreferencesState.preferences,
  });

  const [chosenPreferences, setChosenPreferences] = React.useState<string[]>(
    []
  );

  useEffect(() => {
    setMenteePreferences({
      preferences: chosenPreferences,
    });
  }, [chosenPreferences]);

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
      </Container>
    </Box>
  );
};

export default MenteePreferencesComponent;
