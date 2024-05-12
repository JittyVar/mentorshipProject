import React from "react";
import VerticalLinearStepper from "@/components/verticalStepper";
import { Box, Container } from "@mui/material";

const FormPage = () => {
  return (
    <Box>
      <Container>
        <a href="/api/auth/logout">Logout</a>
        <VerticalLinearStepper />
      </Container>
    </Box>
  );
};

export default FormPage;
