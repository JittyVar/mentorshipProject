/* eslint-disable @next/next/no-img-element */
import React from "react";
import VerticalLinearStepper from "@/components/verticalStepper";
import { Box, Container, ImageList, ImageListItem } from "@mui/material";
import applicationpic from "../../../public/mentorshipapplication.png";

const FormPage = () => {
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
        <VerticalLinearStepper />
      </Container>
    </Box>
  );
};

export default FormPage;
