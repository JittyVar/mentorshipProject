"use client";

import {
  Box,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import EducationalBackground from "@/redux/states/background";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MultipleSelector from "@/components/multipleSelector";
import { useAppDispatch } from "@/redux/hooks";
import { backgroundDetails } from "@/redux/registrationSlice";
import Programs from "@/components/data/programs";
import Majors from "@/components/data/majors";

const EducationalBackgroundComponent = () => {
  const educationalBackgroundState = useSelector(
    (state: RootState) => state.registration.educationalBackground
  );

  const dispatch = useAppDispatch();
  const [educationalBackground, setEducationalBackground] =
    useState<EducationalBackground>({
      programs: educationalBackgroundState.programs,
      majors: educationalBackgroundState.majors,
      yearOfDegree: educationalBackgroundState.yearOfDegree,
    });

  const [chosenPrograms, setChosenPrograms] = React.useState<string[]>([]);
  const [chosenMajors, setChosenMajors] = React.useState<string[]>([]);

  useEffect(() => {
    setEducationalBackground({
      programs: chosenPrograms,
      majors: chosenMajors,
      yearOfDegree: educationalBackground.yearOfDegree,
    });
  }, [chosenPrograms, chosenMajors, educationalBackground.yearOfDegree]);

  const handleChange = (
    fieldName: keyof EducationalBackground,
    value: string
  ) => {
    setEducationalBackground((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

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
          data={Programs}
          chosenData={(data: string[]) => setChosenPrograms(data)}
        />
        <Typography sx={{ margin: "1%" }}>
          What major/s are you currently enrolled in?
        </Typography>
        <MultipleSelector
          data={Majors}
          chosenData={(data: string[]) => setChosenMajors(data)}
        />
        <div>
          <Typography sx={{ margin: "1%", paddingTop: "10px" }}>
            Which year of the degree are you?
          </Typography>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ margin: "1%" }}
            value={
              educationalBackgroundState.yearOfDegree !== undefined
                ? educationalBackgroundState.yearOfDegree
                : ""
            }
            onChange={(e) => handleChange("yearOfDegree", e.target.value)}
          >
            <FormControlLabel
              value="1st year undergraduate"
              control={<Radio />}
              label="1st year undergraduate"
            />
            <FormControlLabel
              value="2nd year undergraduate"
              control={<Radio />}
              label="2nd year undergraduate"
            />
            <FormControlLabel
              value="3rd year undergraduate"
              control={<Radio />}
              label="3rd year undergraduate"
            />
            <FormControlLabel
              value="4th year undergraduate"
              control={<Radio />}
              label="4th year undergraduate"
            />
          </RadioGroup>
        </div>
      </Container>
    </Box>
  );
};

export default EducationalBackgroundComponent;
