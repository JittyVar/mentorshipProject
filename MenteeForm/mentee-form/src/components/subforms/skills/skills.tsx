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
    setBasicSkills((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleExpertInputChange = (
    fieldName: keyof ExpertSkills,
    value: string
  ) => {
    setExpertSkills((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    setMenteeSkills({ basicSkills, expertSkills });
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
          <Typography sx={{ fontWeight: "bold", marginBottom: "3%" }}>
            Three (3) basic skills
          </Typography>
          <Typography sx={{ m: 1 }}>First Basic Industry Skill</Typography>
          <TextField
            fullWidth
            required
            placeholder={skillState?.basicSkills?.firstBasicIndustrySkill || ""}
            helperText="e.g. Communication Skill"
            onChange={(e) =>
              handleSoftBasicInputChange(
                "firstBasicIndustrySkill",
                e.target.value
              )
            }
            sx={{
              "& .MuiOutlinedInput-input": {
                backgroundColor: "white",
                border: 1,
                borderRadius: 2,
                borderColor: "black",
              },
            }}
          />
          <Typography sx={{ m: 1 }}>Basic Soft Skill</Typography>
          <TextField
            fullWidth
            helperText="e.g. Active Listening"
            required
            placeholder={skillState?.basicSkills?.firstBasicSoftSkill || ""}
            onChange={(e) =>
              handleSoftBasicInputChange("firstBasicSoftSkill", e.target.value)
            }
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
          <Typography sx={{ m: 1 }}>Second Basic Industry Skill</Typography>
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
            required
            placeholder={
              skillState?.basicSkills?.secondBasicIndustrySkill || ""
            }
            helperText="e.g. Event Planning"
            onChange={(e) =>
              handleSoftBasicInputChange(
                "secondBasicIndustrySkill",
                e.target.value
              )
            }
          />
        </Container>
        <Container
          sx={{ "& > div:not(:last-child)": { marginBottom: "30px" } }}
        >
          <Typography sx={{ fontWeight: "bold", marginBottom: "3%" }}>
            Three (3) expert skills
          </Typography>
          <Typography sx={{ m: 1 }}>First Expert Industry Skill</Typography>
          <TextField
            fullWidth
            helperText="eg. Conflict Resolution"
            placeholder={
              skillState?.expertSkills?.firstExpertIndustrySkill || ""
            }
            onChange={(e) =>
              handleExpertInputChange(
                "firstExpertIndustrySkill",
                e.target.value
              )
            }
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
          <Typography sx={{ m: 1 }}>First Expert Soft Skill</Typography>
          <TextField
            fullWidth
            helperText="eg. Cloud Computing"
            placeholder={skillState?.expertSkills?.firstExpertSoftSkill || ""}
            onChange={(e) =>
              handleExpertInputChange("firstExpertSoftSkill", e.target.value)
            }
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
          <Typography sx={{ m: 1 }}>Second Expert Industry Skill</Typography>
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
            placeholder={
              skillState?.expertSkills?.secondExpertIndustrySkill || ""
            }
            onChange={(e) =>
              handleExpertInputChange(
                "secondExpertIndustrySkill",
                e.target.value
              )
            }
          />
        </Container>
      </div>
    </Box>
  );
};

export default SkillsComponent;
