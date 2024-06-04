"use client";
import React, { useState, ChangeEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonalDetails from "./personalDetails/personalDetails";
import Image from "next/image";
import { ref, uploadBytesResumable } from "firebase/storage"; // Import Firebase Storage functions
import { storage } from "@/firestore/firestore";
import CheckIcon from "@mui/icons-material/Check";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { photoUrl } from "@/redux/registrationSlice";
import { PhotoUrl } from "@/redux/states/photoUrl";

const ProfilePhotoComponent = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const dispatch = useAppDispatch();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedImage(event.target.files[0]);
    console.log("works");
    dispatch(
      photoUrl({
        photo: event.target.files[0],
      })
    );
  };

  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Container
        sx={{
          padding: "5%",
          gap: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography>Please upload a recent photo of yourself</Typography>

        {selectedImage && (
          <div>
            <Image
              alt="not found"
              width={250}
              height={300}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
          </div>
        )}

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            component="span"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Select file
          </Button>
        </label>

        {/* <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!selectedImage || uploading}
        >
          Upload
        </Button>
        {uploaded && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            variant="filled"
          >
            Image uploaded successfully
          </Alert>
        )} */}
        <PersonalDetails />
      </Container>
    </Box>
  );
};

export default ProfilePhotoComponent;
