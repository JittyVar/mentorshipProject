/* eslint-disable @next/next/no-img-element */
"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect } from "react";
import VerticalLinearStepper from "@/components/verticalStepper";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  ImageList,
  ImageListItem,
} from "@mui/material";
import applicationpic from "../../../public/mentorshipapplication.png";

const FormPage = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading || !user) {
    return (
      <Backdrop
        sx={{
          color: "black",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#F4E6F2",
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Box>
      <Container>
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>
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
