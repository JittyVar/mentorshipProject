/* eslint-disable @next/next/no-img-element */
import React from "react";
//import RegistrationEnd from "./registrationEndedComponent";
import VerticalLinearStepper from "@/components/verticalStepper";
import { Box, Container, ImageList, ImageListItem } from "@mui/material";
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
        <ImageList variant="masonry" cols={1}>
          <ImageListItem key={"applicationpic"}>
            <img
              srcSet={`${applicationpic.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${applicationpic.src}?w=248&fit=crop&auto=format`}
              alt={"applicationpic"}
              loading="lazy"
            />
          </ImageListItem>
        </ImageList>
        {/* <Image src={applicationpic.src} alt="pic" width={835} height={200} /> */}
        <VerticalLinearStepper />
      </Container>
    </Box>
  );
};

export default FormPage;
