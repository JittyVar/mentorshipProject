import React from "react";
import RegistrationEnd from "./registrationEndedComponent";
import VerticalLinearStepper from "@/components/verticalStepper";
import { Box, Container } from "@mui/material";

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
        <h1>Form Page Image</h1>
        <VerticalLinearStepper />
      </Container>
    </Box>
  );
};

export default FormPage;
