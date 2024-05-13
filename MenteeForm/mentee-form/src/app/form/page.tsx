import React from "react";
//import RegistrationEnd from "./registrationEndedComponent";
import VerticalLinearStepper from "@/components/verticalStepper";
import { Box, Container } from "@mui/material";

// interface FormPageProps {
//   isAuthenticated: boolean;
// }
const FormPage = () => {
  // if (!isAuthenticated) {
  //   return <RegistrationEnd />;
  // }
  return (
    <Box>
      <Container>
        <VerticalLinearStepper />
      </Container>
    </Box>
  );
};

export default FormPage;
