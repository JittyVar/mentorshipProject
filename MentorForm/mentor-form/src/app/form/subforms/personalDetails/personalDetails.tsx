"use client";

import {
  Box,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MentorState } from "@/redux/states/mentor";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { menteePersonalDetails } from "@/redux/registrationSlice";
import validator from "validator";

const PersonalDetails = () => {
  const gender = ["Male", "Female", "No preference"];
  const mentorState = useSelector(
    (state: RootState) => state.registration.mentor
  );
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState(true);

  const [values, setValues] = useState<MentorState>({
    fullName: mentorState.fullName,
    phoneNumber: mentorState.phoneNumber,
    emailAddress: mentorState.emailAddress,
    gender: mentorState.gender,
  });

  useEffect(() => {
    dispatch(menteePersonalDetails(values));
  }, [values, dispatch]);

  //Mentee extends user state
  const handleChange = (fieldName: keyof MentorState, value: string) => {
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
  }, [values.emailAddress]);

  return (
    <Box>
      <>
        <div style={{ display: "flex" }}>
          <Typography sx={{ m: 1, width: "17ch" }}>Full Name</Typography>
          <TextField
            id="fullName"
            fullWidth
            onChange={(e) => handleChange("fullName", e.target.value)}
            value={mentorState.fullName}
          />
        </div>
        <div style={{ display: "flex", paddingTop: "2%" }}>
          <Typography sx={{ margin: "1%", width: "16ch" }}>
            Email Address
          </Typography>
          <TextField
            id="gender"
            sx={{ m: 1 }}
            onChange={(e) => handleChange("emailAddress", e.target.value)}
            fullWidth
            value={mentorState.emailAddress}
            error={!isValid}
          />
        </div>
        <div style={{ display: "flex", paddingTop: "2%" }}>
          <Typography sx={{ margin: "1%", width: "16ch" }}>Gender</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mentorState.gender}
              label="Age"
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              {gender.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ display: "flex", paddingTop: "2%" }}>
          <Typography sx={{ margin: "1%", width: "16ch" }}>
            Phone Number
          </Typography>
          <TextField
            id="phoneNumber"
            sx={{ m: 1 }}
            fullWidth
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            value={
              mentorState.phoneNumber !== undefined
                ? mentorState.phoneNumber
                : ""
            }
          />
        </div>
      </>
    </Box>
  );
};

export default PersonalDetails;
