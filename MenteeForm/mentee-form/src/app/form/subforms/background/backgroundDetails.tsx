"use client";

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import EducationalBackground from "@/redux/states/background";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MultipleSelector from "@/components/multipleSelector";
import { useAppDispatch } from "@/redux/hooks";
import { backgroundDetails } from "@/redux/registrationSlice";

export const data = ["Test", "Test 2"];
export const major = ["Major", "Major 2"];

const EducationalBackgroundComponent = () => {
  const educationalBackgroundState = useSelector(
    (state: RootState) => state.registration.educationalBackground
  );
  const dispatch = useAppDispatch();
  const [educationalBackground, setEducationalBackground] =
    useState<EducationalBackground>({
      programs: educationalBackgroundState.programs,
      majors: educationalBackgroundState.majors,
    });

  const [chosenPrograms, setChosenPrograms] = React.useState<string[]>([]);
  const [chosenMajors, setChosenMajors] = React.useState<string[]>([]);

  useEffect(() => {
    setEducationalBackground({
      programs: chosenPrograms,
      majors: chosenMajors,
    });
  }, [chosenPrograms, chosenMajors]);

  useEffect(() => {
    dispatch(backgroundDetails(educationalBackground));
  });

  return (
    <Box>
      <Container>
        <Typography sx={{ margin: "1%" }}>
          What program are you currently enrolled in?
        </Typography>
        <MultipleSelector
          data={data}
          chosenData={(data: string[]) => setChosenPrograms(data)}
        />
        <Typography sx={{ margin: "1%" }}>
          What major/s are you currently enrolled in?
        </Typography>
        <MultipleSelector
          data={major}
          chosenData={(data: string[]) => setChosenMajors(data)}
        />
      </Container>
    </Box>
  );
};

export default EducationalBackgroundComponent;
