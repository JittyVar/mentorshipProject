/* eslint-disable @next/next/no-img-element */
import React from "react";
//import RegistrationEnd from "./registrationEndedComponent";
import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";
import applicationpic from "../../../public/mentorshipapplication.png";
import Link from "next/link";
import VerticalLinearStepper from "@/components/verticalStepper";

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
        {/* <Paper
          square
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: "#1E1F42",
            borderRadius: "5px",
            margin: "3%",
          }}
        >
          <Typography fontFamily={"Arial"} color={"white"} fontWeight={"bold"}>
            Submissions for the 2nd cohort are now closed.
          </Typography>
          <Typography
            fontFamily={"Arial"}
            color={"white"}
            fontWeight={"bold"}
            marginBottom={"10px"}
          >
            Click the link below to RSVP for next year&apos;s program
          </Typography>
          <Link
            href={
              " https://docs.google.com/forms/d/e/1FAIpQLSeiNe0btTXNLsJeIsMape05630fK1SLdldO9Ty3x8QbLd6B6w/viewform"
            }
            style={{ color: "white" }}
          >
            MENTORSHIP PROGRAM 2025
          </Link>
        </Paper> */}
        <VerticalLinearStepper />
      </Container>
    </Box>
  );
};

export default FormPage;
