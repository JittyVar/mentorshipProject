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
import {
  menteePersonalDetails,
  menteeStateValid,
} from "@/redux/registrationSlice";

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

  const [values, setValues] = useState<MenteeState>({
    fullName: menteeState?.fullName,
    age: menteeState?.age,
    phoneNumber: menteeState?.phoneNumber,
    emailAddress: menteeState?.emailAddress,
    currentStage: menteeState?.currentStage,
  });

  useEffect(() => {
    const savedState = localStorage.getItem("menteeState");
    if (savedState) {
      setValues(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("menteeState", JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    dispatch(menteePersonalDetails(values));
  }, [values, dispatch]);

  // useEffect(() => {
  //   if (
  //     !fullNameError &&
  //     !ageError &&
  //     !emailError &&
  //     !phoneError &&
  //     values?.fullName !== undefined &&
  //     values?.fullName.trim() !== "" &&
  //     values?.age !== undefined &&
  //     values?.age.toString().trim() !== "" &&
  //     values?.currentStage !== undefined &&
  //     values?.currentStage.trim() !== "" &&
  //     values?.emailAddress !== undefined &&
  //     values?.emailAddress.trim() !== "" &&
  //     values?.phoneNumber !== undefined &&
  //     values?.phoneNumber.trim() !== ""
  //   ) {
  //     dispatch(menteeStateValid(true));
  //   } else {
  //     dispatch(menteeStateValid(false));
  //   }
  // }, [
  //   ageError,
  //   dispatch,
  //   emailError,
  //   fullNameError,
  //   phoneError,
  //   values?.age,
  //   values?.currentStage,
  //   values?.emailAddress,
  //   values?.fullName,
  //   values?.phoneNumber,
  // ]);

  const handleChange = (fieldName: keyof MenteeState, value: string) => {
    if (fieldName === "fullName") {
      setFullNameError(value.trim() === "");
    } else if (fieldName === "age") {
      setAgeError(value.trim() === "" || !/^\d+$/.test(value));
    } else if (fieldName === "emailAddress") {
      setEmailError(value.trim() === "" || !validator.isEmail(value));
    } else if (fieldName === "phoneNumber") {
      setPhoneError(value.trim() === "" || !/^\d{9,10}$/.test(value));
    }

    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

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
            required
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder={menteeState?.fullName || ""}
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
            placeholder={values?.age?.toString() || ""}
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
            placeholder={values?.emailAddress || ""}
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
