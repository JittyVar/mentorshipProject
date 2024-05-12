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
        <div>
          {/* <Image
            src={mentorshipApplication.src}
            alt="mentorship application pic"
            width={100}
            height={300}
          /> */}
        </div>
        <VerticalLinearStepper />
      </Container>
    </Box>
  );
};

export default FormPage;
