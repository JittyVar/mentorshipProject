"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { personalityTypeDetails } from "@/redux/registrationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { PersonalityType } from "@/redux/states/personalityType";
import { PersonalityTypeData } from "@/components/data/personalityTypes";

const PersonalityTypeComponent = () => {
  const dispatch = useAppDispatch();
  const personalityTypeState = useAppSelector(
    (state) => state.registration?.personalityType
  );
  const [personalityType, setPersonalityType] = React.useState(
    personalityTypeState?.personalityType
  );
  const [value, setValue] = useState<PersonalityType>({
    personalityType: personalityTypeState?.personalityType,
  });

  const handleInputChange = (
    fieldName: keyof PersonalityType,
    value: string
  ) => {
    setValue((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    handleInputChange("personalityType", personalityType);
  }, [personalityType]);

  const handleChange = (event: SelectChangeEvent) => {
    setPersonalityType(event.target.value as string);
  };

  useEffect(() => {
    dispatch(personalityTypeDetails(value));
  }, [value, dispatch]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography fontWeight={"bold"}>
          Please complete the following test:
        </Typography>
        <Link> https://www.16personalities.com/free-personality-test</Link>
      </div>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Personality Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={personalityTypeState?.personalityType}
          label="personality type"
          onChange={handleChange}
        >
          {PersonalityTypeData.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PersonalityTypeComponent;
