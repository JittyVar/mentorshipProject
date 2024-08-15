"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonalDetails from "./personalDetails/personalDetails";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { photoUrl } from "@/redux/registrationSlice";

const ProfilePhotoComponent = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedImage(event.target.files[0]);
    dispatch(
      photoUrl({
        photo: event.target.files[0],
      })
    );
  };

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
        {/* <Typography>Please upload a recent photo of yourself</Typography>

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
        </label> */}
        <PersonalDetails />
      </Container>
    </Box>
  );
};

export default ProfilePhotoComponent;
