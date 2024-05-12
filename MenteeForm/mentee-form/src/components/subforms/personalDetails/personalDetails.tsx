"use client";

import {
  Box,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MenteeState } from "@/redux/states/mentee";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { menteePersonalDetails } from "@/redux/registrationSlice";

const PersonalDetails = () => {
  const validator = require("validator");
  const menteeState = useSelector(
    (state: RootState) => state.registration.mentee
  );
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState(true);

  const [values, setValues] = useState<MenteeState>({
    fullName: menteeState.fullName,
    age: menteeState.age,
    phoneNumber: menteeState.phoneNumber,
    emailAddress: menteeState.emailAddress,
    currentStage: menteeState.currentStage,
  });

  useEffect(() => {
    dispatch(menteePersonalDetails(values));
  }, [values, dispatch]);

  //Mentee extends user state
  const handleChange = (fieldName: keyof MenteeState, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    const validateEmail = (e: string) => {
      var email = e || "test@yahoo.com";

      if (validator.isEmail(email)) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };

    validateEmail(values.emailAddress);
  }, [validator, values.emailAddress]);

  return (
    <Box>
      <>
        <div>
          <Typography sx={{ m: 1, width: "16ch" }}>Full Name</Typography>
          <TextField
            id="fullName"
            fullWidth
            onChange={(e) => handleChange("fullName", e.target.value)}
            value={menteeState.fullName}
            sx={{
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                border: 1,
                borderRadius: 2,
                borderColor: "black",
              },
            }}
          />
        </div>
        <div style={{ paddingTop: "2%" }}>
          <Typography sx={{ m: 1, width: "15ch" }}>Age</Typography>
          <TextField
            id="age"
            onChange={(e) => handleChange("age", e.target.value)}
            value={menteeState.age}
            sx={{
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                border: 1,
                borderRadius: 2,
                borderColor: "black",
              },
            }}
          />
        </div>
        <div style={{ paddingTop: "2%" }}>
          <Typography sx={{ margin: "1%", width: "16ch" }}>
            Email Address
          </Typography>
          <TextField
            id="emailAddress"
            sx={{
              m: 1,
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                border: 1,
                borderRadius: 2,
                borderColor: "black",
              },
            }}
            onChange={(e) => handleChange("emailAddress", e.target.value)}
            fullWidth
            value={menteeState.emailAddress}
            error={!isValid}
          />
        </div>
        <div style={{ paddingTop: "2%" }}>
          <Typography sx={{ margin: "1%", width: "16ch" }}>
            Phone Number
          </Typography>
          <TextField
            id="phoneNumber"
            sx={{
              m: 1,
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                border: 1,
                borderRadius: 2,
                borderColor: "black",
              },
            }}
            fullWidth
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            value={
              menteeState.phoneNumber !== undefined
                ? menteeState.phoneNumber
                : ""
            }
          />
        </div>
        <div>
          <Typography sx={{ margin: "1%", paddingTop: "10px" }}>
            What is your current education/career stage?
          </Typography>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ margin: "1%" }}
            value={
              menteeState.currentStage !== undefined
                ? menteeState.currentStage
                : ""
            }
            onChange={(e) => handleChange("currentStage", e.target.value)}
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
      </>
    </Box>
  );
};

export default PersonalDetails;
