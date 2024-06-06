"use client";

import { Goals } from "@/redux/states/goals";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { goalsDetails, menteeGoalsValid } from "@/redux/registrationSlice";

const GoalsComponent = () => {
  const dispatch = useAppDispatch();
  const goalsState = useAppSelector((state) => state.registration?.goals);

  const [preferredgoals, setPreferredGoals] = useState<Goals>({
    longTermGoal: goalsState?.longTermGoal,
    firstShortTermGoal: goalsState?.firstShortTermGoal,
    secondShortTermGoal: goalsState?.secondShortTermGoal,
    outcome: goalsState?.outcome,
  });

  const handleInputChange = (fieldName: keyof Goals, value: string) => {
    setPreferredGoals((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    if (
      goalsState?.firstShortTermGoal != undefined &&
      goalsState?.firstShortTermGoal.trim() != "" &&
      goalsState?.longTermGoal != undefined &&
      goalsState?.longTermGoal.trim() != "" &&
      goalsState?.outcome != undefined &&
      goalsState?.outcome.trim() != "" &&
      goalsState?.secondShortTermGoal != undefined &&
      goalsState?.secondShortTermGoal.trim() != ""
    ) {
      dispatch(menteeGoalsValid(true));
    } else {
      dispatch(menteeGoalsValid(false));
    }
  });

  useEffect(() => {
    dispatch(goalsDetails(preferredgoals));
  }, [dispatch, preferredgoals]);

  return (
    <Box>
      <Container sx={{ "& > div:not(:last-child)": { marginBottom: "20px" } }}>
        <Typography sx={{ margin: "1%" }}>
          What is one long-term goal you have?
        </Typography>
        <TextField
          fullWidth
          placeholder={goalsState?.longTermGoal || ""}
          helperText="e.g. To establish a successful tech startup"
          variant="outlined"
          onChange={(e) => handleInputChange("longTermGoal", e.target.value)}
          sx={{
            "& .MuiOutlinedInput-input": {
              backgroundColor: "white",
              border: 1,
              borderRadius: 2,
              borderColor: "black",
            },
          }}
        />
        <TextField
          fullWidth
          helperText="e.g.  To complete a front-end web certification course"
          placeholder={goalsState?.firstShortTermGoal || ""}
          variant="outlined"
          onChange={(e) =>
            handleInputChange("firstShortTermGoal", e.target.value)
          }
          sx={{
            "& .MuiOutlinedInput-input": {
              backgroundColor: "white",
              border: 1,
              borderRadius: 2,
              borderColor: "black",
            },
          }}
        />
        <TextField
          fullWidth
          helperText="e.g.  To improve interpersonal skills by next year"
          placeholder={goalsState?.secondShortTermGoal || ""}
          variant="outlined"
          onChange={(e) =>
            handleInputChange("secondShortTermGoal", e.target.value)
          }
          sx={{
            "& .MuiOutlinedInput-input": {
              backgroundColor: "white",
              border: 1,
              borderRadius: 2,
              borderColor: "black",
            },
          }}
        />
        <div style={{ paddingBottom: "2%" }}>
          <Typography sx={{ margin: "1%" }}>
            What would you hope to get from this program?
          </Typography>
          <TextField
            id="expectation"
            multiline
            placeholder={goalsState?.outcome || ""}
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
            onChange={(e) => handleInputChange("outcome", e.target.value)}
          />
        </div>
      </Container>
    </Box>
  );
};
export default GoalsComponent;
