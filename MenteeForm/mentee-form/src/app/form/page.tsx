import React from "react";
import RegistrationEnd from "./registrationEndedComponent";
import VerticalLinearStepper from "@/components/verticalStepper";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import mentorshipApplication from "../../../public/mentorshipapplication.png";

interface FormPageProps {
  isAuthenticated: boolean;
}
const FormPage: React.FC<FormPageProps> = async ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <RegistrationEnd />;
  }
  return (
    <Box>
      <Container>
        <div>
          <Image
            src={mentorshipApplication.src}
            alt="mentorship application pic"
            width={1100}
            height={300}
          />
        </div>
        <VerticalLinearStepper />
      </Container>
    </Box>
  );
};

export default FormPage;
