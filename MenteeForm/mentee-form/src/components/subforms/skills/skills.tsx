"use client";

import { Box, Container, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Skills } from "@/redux/states/skills/skills";
import { BasicSkills } from "@/redux/states/skills/basicSkills";
import { ExpertSkills } from "@/redux/states/skills/expertSkills";
import { menteeSkillsValid, skillsDetails } from "@/redux/registrationSlice";

const SkillsComponent = () => {
  const dispatch = useAppDispatch();
  const skillState = useAppSelector((state) => state.registration?.skills);
  const cursorPositionRef = useRef<number | null>(null);
  const firstBasicSoftRef = useRef<HTMLInputElement>(null);
  const firstBasicIndustryRef = useRef<HTMLInputElement>(null);
  const secondBasicIndustryRef = useRef<HTMLInputElement>(null);
  const firstExpertSoftRef = useRef<HTMLInputElement>(null);
  const firstExpertIndustryRef = useRef<HTMLInputElement>(null);
  const secondExpertIndustryRef = useRef<HTMLInputElement>(null);

  const [basicSkills, setBasicSkills] = useState<BasicSkills>({
    firstBasicSoftSkill: skillState?.basicSkills.firstBasicSoftSkill,
    firstBasicIndustrySkill: skillState?.basicSkills.firstBasicIndustrySkill,
    secondBasicIndustrySkill: skillState?.basicSkills.secondBasicIndustrySkill,
  });

  const [expertSkills, setExpertSkills] = useState<ExpertSkills>({
    firstExpertSoftSkill: skillState?.expertSkills.firstExpertSoftSkill,
    firstExpertIndustrySkill: skillState?.expertSkills.firstExpertIndustrySkill,
    secondExpertIndustrySkill:
      skillState?.expertSkills.secondExpertIndustrySkill,
  });

  const [menteeSkills, setMenteeSkills] = useState<Skills>({
    basicSkills: basicSkills,
    expertSkills: expertSkills,
  });

  const handleSoftBasicInputChange = (
    fieldName: keyof BasicSkills,
    value: string
  ) => {
    if (fieldName === "firstBasicSoftSkill") {
      cursorPositionRef.current =
        firstBasicSoftRef?.current?.selectionStart ?? null;
    }
    if (fieldName === "firstBasicIndustrySkill") {
      cursorPositionRef.current =
        firstBasicIndustryRef?.current?.selectionStart ?? null;
    }
    if (fieldName === "secondBasicIndustrySkill") {
      cursorPositionRef.current =
        secondBasicIndustryRef?.current?.selectionStart ?? null;
    }

    setBasicSkills((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleExpertInputChange = (
    fieldName: keyof ExpertSkills,
    value: string
  ) => {
    if (fieldName === "firstExpertSoftSkill") {
      cursorPositionRef.current =
        firstExpertSoftRef?.current?.selectionStart ?? null;
    }
    if (fieldName === "firstExpertIndustrySkill") {
      cursorPositionRef.current =
        firstExpertIndustryRef?.current?.selectionStart ?? null;
    }
    if (fieldName === "secondExpertIndustrySkill") {
      cursorPositionRef.current =
        secondExpertIndustryRef?.current?.selectionStart ?? null;
    }
    setExpertSkills((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    setMenteeSkills({ basicSkills, expertSkills });
  }, [basicSkills, expertSkills]);

  useEffect(() => {
    if (firstBasicSoftRef.current && cursorPositionRef.current !== null) {
      firstBasicSoftRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
    } else if (
      firstBasicIndustryRef.current &&
      cursorPositionRef.current !== null
    ) {
      firstBasicIndustryRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
    } else if (
      secondBasicIndustryRef.current &&
      cursorPositionRef.current !== null
    ) {
      secondBasicIndustryRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
    } else if (
      firstExpertSoftRef.current &&
      cursorPositionRef.current !== null
    ) {
      firstExpertSoftRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
    } else if (
      firstExpertIndustryRef.current &&
      cursorPositionRef.current !== null
    ) {
      firstExpertIndustryRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
    } else if (
      secondExpertIndustryRef.current &&
      cursorPositionRef.current !== null
    ) {
      secondExpertIndustryRef.current.setSelectionRange(
        cursorPositionRef.current,
        cursorPositionRef.current
      );
    }
  }, [basicSkills, expertSkills]);

  useEffect(() => {
    dispatch(skillsDetails(menteeSkills));
  });

  useEffect(() => {
    if (
      skillState?.basicSkills?.firstBasicIndustrySkill !== undefined &&
      skillState?.basicSkills?.firstBasicIndustrySkill.trim() !== "" &&
      skillState?.basicSkills?.firstBasicSoftSkill !== undefined &&
      skillState?.basicSkills?.firstBasicSoftSkill.trim() !== "" &&
      skillState?.basicSkills?.secondBasicIndustrySkill !== undefined &&
      skillState?.basicSkills?.secondBasicIndustrySkill.trim() !== "" &&
      skillState?.expertSkills?.firstExpertIndustrySkill !== undefined &&
      skillState?.expertSkills?.firstExpertIndustrySkill.trim() !== "" &&
      skillState?.expertSkills?.firstExpertSoftSkill !== undefined &&
      skillState?.expertSkills?.firstExpertSoftSkill.trim() !== "" &&
      skillState?.expertSkills?.secondExpertIndustrySkill !== undefined &&
      skillState?.expertSkills?.secondExpertIndustrySkill.trim() !== ""
    ) {
      dispatch(menteeSkillsValid(true));
    } else {
      dispatch(menteeSkillsValid(false));
    }
  }, [
    dispatch,
    skillState?.basicSkills?.firstBasicIndustrySkill,
    skillState?.basicSkills?.firstBasicSoftSkill,
    skillState?.basicSkills?.secondBasicIndustrySkill,
    skillState?.expertSkills?.firstExpertIndustrySkill,
    skillState?.expertSkills?.firstExpertSoftSkill,
    skillState?.expertSkills?.secondExpertIndustrySkill,
  ]);

  return (
    <Box>
      <div>
        <Container
          sx={{ "& > div:not(:last-child)": { marginBottom: "30px" } }}
        >
          <Typography
            sx={{ margin: "1%", fontWeight: "bold", marginBottom: "5%" }}
          >
            Three (3) basic skills
          </Typography>
          <TextField
            fullWidth
            inputRef={firstBasicIndustryRef}
            required
            value={skillState?.basicSkills?.firstBasicIndustrySkill || ""}
            helperText="e.g. Communication Skill"
            onChange={(e) =>
              handleSoftBasicInputChange(
                "firstBasicIndustrySkill",
                e.target.value
              )
            }
            label="Basic Industry Skill"
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
            helperText="e.g. Active Listening"
            inputRef={firstBasicSoftRef}
            required
            value={skillState?.basicSkills?.firstBasicSoftSkill || ""}
            onChange={(e) =>
              handleSoftBasicInputChange("firstBasicSoftSkill", e.target.value)
            }
            label="Basic Soft Skill"
            sx={{
              marginBottom: "5%",
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                border: 1,
                borderRadius: 2,
                borderColor: "black",
              },
            }}
          />
          <TextField
            sx={{
              marginBottom: "5%",
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                border: 1,
                borderRadius: 2,
                borderColor: "black",
              },
            }}
            fullWidth
            inputRef={secondBasicIndustryRef}
            required
            value={skillState?.basicSkills?.secondBasicIndustrySkill || ""}
            helperText="e.g. Event Planning"
            onChange={(e) =>
              handleSoftBasicInputChange(
                "secondBasicIndustrySkill",
                e.target.value
              )
            }
            label="Basic Industy Skill"
          />
        </Container>
        <Container
          sx={{ "& > div:not(:last-child)": { marginBottom: "30px" } }}
        >
          <Typography
            sx={{ margin: "1%", fontWeight: "bold", marginBottom: "5%" }}
          >
            Three (3) expert skills
          </Typography>
          <TextField
            fullWidth
            helperText="eg. Conflict Resolution"
            onChange={(e) =>
              handleExpertInputChange(
                "firstExpertIndustrySkill",
                e.target.value
              )
            }
            label="Expert Industry Skill"
            sx={{
              marginBottom: "5%",
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
            helperText="eg. Cloud Computing"
            onChange={(e) =>
              handleExpertInputChange("firstExpertSoftSkill", e.target.value)
            }
            label="Expert Soft Skill"
            sx={{
              marginBottom: "5%",
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                border: 1,
                borderRadius: 2,
                borderColor: "black",
              },
            }}
          />
          <TextField
            sx={{
              marginBottom: "5%",
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                border: 1,
                borderRadius: 2,
                borderColor: "black",
              },
            }}
            fullWidth
            helperText="eg. Product Management"
            onChange={(e) =>
              handleExpertInputChange(
                "secondExpertIndustrySkill",
                e.target.value
              )
            }
            label="Expert Industry Skill"
          />
        </Container>
      </div>
    </Box>
  );
};

export default SkillsComponent;
