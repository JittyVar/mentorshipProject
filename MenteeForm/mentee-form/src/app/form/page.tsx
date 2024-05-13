import React from "react";
//import RegistrationEnd from "./registrationEndedComponent";
import VerticalLinearStepper from "@/components/verticalStepper";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import application from "../../../public/mentorshipapplication.png";

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
        <Image src={application.src} alt="pic" width={850} height={250}></Image>
        <VerticalLinearStepper />
      </Container>
    </Box>
  );
};

export default FormPage;
