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
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MentorState } from "@/redux/states/mentor";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import {
  menteePersonalDetails,
  mentorStateValid,
} from "@/redux/registrationSlice";

const PersonalDetails = () => {
  const gender = ["Male", "Female", "No preference"];
  const [fullNameError, setFullNameError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const validator = require("validator");
  const mentorState = useSelector(
    (state: RootState) => state.registration.mentor
  );
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState(true);

  const [values, setValues] = useState<MentorState>({
    fullName: mentorState?.fullName,
    phoneNumber: mentorState?.phoneNumber,
    emailAddress: mentorState?.emailAddress,
    gender: mentorState?.gender,
  });

  useEffect(() => {
    localStorage.removeItem("menteeState");
  }, []);

  useEffect(() => {
    if (
      !fullNameError &&
      !genderError &&
      !emailError &&
      !phoneError &&
      values?.fullName !== undefined &&
      values?.fullName.trim() !== "" &&
      values?.emailAddress !== undefined &&
      values?.emailAddress.trim() !== "" &&
      values?.phoneNumber !== undefined &&
      values?.phoneNumber.trim() !== "" &&
      values?.gender !== undefined &&
      values?.gender.trim() !== ""
    ) {
      dispatch(mentorStateValid(true));
    } else {
      dispatch(mentorStateValid(false));
    }
  }, [
    dispatch,
    emailError,
    fullNameError,
    genderError,
    phoneError,
    values?.emailAddress,
    values?.fullName,
    values?.gender,
    values?.phoneNumber,
  ]);

  useEffect(() => {
    dispatch(menteePersonalDetails(values));
  }, [values, dispatch]);

  //Mentee extends user state
  const handleChange = (fieldName: keyof MentorState, value: string) => {
    if (fieldName === "fullName") {
      setFullNameError(value.trim() === "");
    } else if (fieldName === "gender") {
      setGenderError(value.trim() === "");
    } else if (fieldName === "emailAddress") {
      setEmailError(value.trim() === "" || !validator.isEmail(value));
    } else if (fieldName === "phoneNumber") {
      setPhoneError(value.trim() === "");
    }
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleGenderChange = (event: SelectChangeEvent) => {
    handleChange("gender", event.target.value);
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
        <div style={{ display: "flex" }}>
          <Typography sx={{ m: 1, width: "17ch" }}>Full Name</Typography>
          <TextField
            id="fullName"
            fullWidth
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder={values?.fullName || ""}
            error={fullNameError}
            helperText={fullNameError ? "Full Name is required" : ""}
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
        <div style={{ display: "flex", paddingTop: "2%" }}>
          <Typography sx={{ margin: "1%", width: "16ch" }}>
            Email Address
          </Typography>
          <TextField
            id="gender"
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
            placeholder={values?.emailAddress || ""}
            error={emailError}
            helperText={
              emailError ? "Email Address is required and must be valid" : ""
            }
          />
        </div>
        <div style={{ display: "flex", paddingTop: "2%" }}>
          <Typography sx={{ margin: "1%", width: "16ch" }}>Gender</Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mentorState?.gender}
              onChange={handleGenderChange}
              sx={{
                backgroundColor: "white",
                border: 1,
                borderRadius: 2,
                borderColor: "black",
              }}
              error={genderError}
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
            placeholder={values?.phoneNumber || ""}
            error={phoneError}
            helperText={phoneError ? "Phone Number is required" : ""}
          />
        </div>
      </>
    </Box>
  );
};

export default PersonalDetails;
