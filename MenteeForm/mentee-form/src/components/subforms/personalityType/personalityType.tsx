"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
      <FormControl fullWidth sx={{ backgroundColor: "white" }}>
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
