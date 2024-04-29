"use client";

import { Goals } from "@/redux/states/goals";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { goalsDetails } from "@/redux/registrationSlice";

const GoalsComponent = () => {
  const dispatch = useAppDispatch();
  const goalsState = useAppSelector((state) => state.registration.goals);
  const [preferredgoals, setPreferredGoals] = useState<Goals>({
    longTermGoal: goalsState.longTermGoal,
    firstShortTermGoal: goalsState.firstShortTermGoal,
    secondShortTermGoal: goalsState.secondShortTermGoal,
  });

  const handleInputChange = (fieldName: keyof Goals, value: string) => {
    setPreferredGoals((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

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
          helperText="e.g. To establish a successful tech startup"
          label="Long Term Goal"
          variant="outlined"
          onChange={(e) => handleInputChange("longTermGoal", e.target.value)}
        />
        <TextField
          fullWidth
          helperText="e.g.  To complete a front-end web certification course"
          label="First Short Term Goal"
          variant="outlined"
          onChange={(e) =>
            handleInputChange("firstShortTermGoal", e.target.value)
          }
        />
        <TextField
          fullWidth
          helperText="e.g.  To improve interpersonal skills by next year"
          label="Second Short Term Goal"
          variant="outlined"
          onChange={(e) =>
            handleInputChange("secondShortTermGoal", e.target.value)
          }
        />
      </Container>
    </Box>
  );
};
export default GoalsComponent;
