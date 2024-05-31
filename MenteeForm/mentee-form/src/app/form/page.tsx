import React from "react";
//import RegistrationEnd from "./registrationEndedComponent";
import VerticalLinearStepper from "@/components/verticalStepper";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import applicationpic from "../../../public/mentorshipapplication.png";
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
        {/* <Image src={applicationpic.src} alt="pic" width={835} height={200} /> */}
        <VerticalLinearStepper />
      </Container>
    </Box>
  );
};

export default FormPage;
