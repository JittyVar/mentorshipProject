import React from "react";
import VerticalLinearStepper from "@/components/verticalStepper";
import { Box, Container } from "@mui/material";
import application from "../../../public/mentorshipapplication.png";
import Image from "next/image";

const FormPage = () => {
  return (
    <Box>
      <Container>
        <Image src={application.src} alt="pic" width={850} height={250}></Image>
        <VerticalLinearStepper />
      </Container>
    </Box>
  );
};

export default FormPage;
