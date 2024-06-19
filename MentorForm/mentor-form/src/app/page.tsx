/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  Container,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import applicationpic from "../../../mentor-form/public/mentorshipapplication.png";
import { useUser } from "@auth0/nextjs-auth0/client";
import FormPage from "./form/page";
import VerticalLinearStepper from "@/components/verticalStepper";

const Home = () => {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/api/auth/login";
    }
  }, [isLoading, user]);

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <Backdrop
          sx={{
            color: "#fff",
            backgroundColor: "#F4E6F2",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" sx={{ color: "black" }} />
        </Backdrop>
      </Box>
    );
  if (error) return <div>{error.message}</div>;

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
        {user && <VerticalLinearStepper />}
      </Container>
    </Box>
  );
};

export default Home;
