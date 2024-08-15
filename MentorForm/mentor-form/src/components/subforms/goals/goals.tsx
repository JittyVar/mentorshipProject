"use client";

import { Goals } from "@/redux/states/goals";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { goalsDetails } from "@/redux/registrationSlice";

const GoalsComponent = () => {
  const dispatch = useAppDispatch();
  const goalsState = useAppSelector((state) => state?.registration?.goals);
  const [preferredgoals, setPreferredGoals] = useState<Goals>({
    longTermGoal: goalsState?.longTermGoal,
    firstShortTermGoal: goalsState?.firstShortTermGoal,
    secondShortTermGoal: goalsState?.secondShortTermGoal,
    outcome: goalsState?.outcome,
    motivation: goalsState?.motivation,
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
          placeholder={goalsState?.longTermGoal || ""}
          multiline
          rows={2}
          sx={{
            m: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              border: 1,
              borderRadius: 2,
              borderColor: "black",
            },
          }}
          onChange={(e) => handleInputChange("longTermGoal", e.target.value)}
        />
        <Typography sx={{ margin: "1%" }}>
          What is one short-term goal you have?
        </Typography>
        <TextField
          fullWidth
          helperText="e.g.  To complete a front-end web certification course"
          placeholder={goalsState?.firstShortTermGoal || ""}
          multiline
          rows={2}
          sx={{
            m: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              border: 1,
              borderRadius: 2,
              borderColor: "black",
            },
          }}
          onChange={(e) =>
            handleInputChange("firstShortTermGoal", e.target.value)
          }
        />
        {/* <Typography sx={{ margin: "1%" }}>
          What is another short-term goal you have?
        </Typography>
        <TextField
          fullWidth
          helperText="e.g.  To improve interpersonal skills by next year"
          placeholder={goalsState?.secondShortTermGoal || ""}
          multiline
          rows={2}
          sx={{
            m: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              border: 1,
              borderRadius: 2,
              borderColor: "black",
            },
          }}
          onChange={(e) =>
            handleInputChange("secondShortTermGoal", e.target.value)
          }
        /> */}
        <div style={{ paddingBottom: "2%" }}>
          <Typography sx={{ margin: "1%" }}>
            What would you hope to get from this program?
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
            placeholder={goalsState?.outcome || ""}
            onChange={(e) => handleInputChange("outcome", e.target.value)}
          />
        </div>
        {/* <div style={{ paddingBottom: "2%" }}>
          <Typography sx={{ margin: "1%" }}>
            Why I chose to offer myself as a mentor?
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
            placeholder={goalsState?.motivation || ""}
            onChange={(e) => handleInputChange("motivation", e.target.value)}
          />
        </div> */}
      </Container>
    </Box>
  );
};
export default GoalsComponent;
