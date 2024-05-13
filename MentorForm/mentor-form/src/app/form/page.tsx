import React from "react";
import VerticalLinearStepper from "@/components/verticalStepper";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import applicationpic from "../../../public/mentorshipapplication.png";

const FormPage = () => {
  return (
    <Box>
      <Container>
        <Image src={applicationpic.src} alt="pic" width={835} height={200} />
        <VerticalLinearStepper />
      </Container>
    </Box>
  );
};

export default FormPage;
