"use client";

import {
  Box,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { MenteeState } from "@/redux/states/mentee";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { menteePersonalDetails } from "@/redux/registrationSlice";

const PersonalDetails = () => {
  const validator = require("validator");
  const menteeState = useSelector(
    (state: RootState) => state.registration?.mentee
  );
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState(true);
  const [fullNameError, setFullNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailAddressRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const cursorPositionRef = useRef<number | null>(null);

  const [values, setValues] = useState<MenteeState>({
    fullName: menteeState?.fullName,
    age: menteeState?.age,
    phoneNumber: menteeState?.phoneNumber,
    emailAddress: menteeState?.emailAddress,
    currentStage: menteeState?.currentStage,
  });

  useEffect(() => {
    dispatch(menteePersonalDetails(values));
  }, [values, dispatch]);

  const handleChange = (fieldName: keyof MenteeState, value: string) => {
    if (fieldName === "fullName") {
      cursorPositionRef.current = fullNameRef.current?.selectionStart ?? null;
      setFullNameError(value.trim() === "");
    } else if (fieldName === "age") {
      cursorPositionRef.current = ageRef.current?.selectionStart ?? null;
      setAgeError(value.trim() === "" || !/^\d+$/.test(value));
    } else if (fieldName === "emailAddress") {
      cursorPositionRef.current =
        emailAddressRef.current?.selectionStart ?? null;
      setEmailError(value.trim() === "" || !validator.isEmail(value));
    } else if (fieldName === "phoneNumber") {
      cursorPositionRef.current =
        phoneNumberRef.current?.selectionStart ?? null;
      setPhoneError(value.trim() === "");
    }

    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    if (fullNameRef.current && cursorPositionRef.current !== null) {
      fullNameRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
    } else if (ageRef.current && cursorPositionRef.current !== null) {
      ageRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
    } else if (emailAddressRef.current && cursorPositionRef.current !== null) {
      emailAddressRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
    } else if (phoneNumberRef.current && cursorPositionRef.current !== null) {
      phoneNumberRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
    }
  }, [values]);

  useEffect(() => {
    const validateEmail = (e: string) => {
      if (validator.isEmail(e)) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };

    validateEmail(values?.emailAddress || "test@yahoo.com");
  }, [validator, values?.emailAddress]);

  return (
    <Box>
      <>
        <div>
          <Typography sx={{ m: 1, width: "16ch" }}>Full Name</Typography>
          <TextField
            id="fullName"
            fullWidth
            inputRef={fullNameRef}
            required
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder={menteeState?.fullName}
            value={values?.fullName || ""}
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
        <div style={{ paddingTop: "2%" }}>
          <Typography sx={{ m: 1, width: "15ch" }}>Age</Typography>
          <TextField
            id="age"
            inputRef={ageRef}
            value={values?.age || ""}
            onChange={(e) => handleChange("age", e.target.value)}
            error={ageError}
            helperText={ageError ? "Age is required and must be a number" : ""}
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
            inputRef={emailAddressRef}
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
            value={values?.emailAddress || ""}
            error={emailError}
            helperText={
              emailError ? "Email Address is required and must be valid" : ""
            }
          />
        </div>
        <div style={{ paddingTop: "2%" }}>
          <Typography sx={{ margin: "1%", width: "16ch" }}>
            Phone Number
          </Typography>
          <TextField
            id="phoneNumber"
            inputRef={phoneNumberRef}
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
            value={values?.phoneNumber || ""}
            error={phoneError}
            helperText={phoneError ? "Phone number is required " : ""}
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
            value={values?.currentStage || ""}
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
