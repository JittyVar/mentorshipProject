"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonalDetails from "./personalDetails/personalDetails";
import { useState } from "react";
import { storage } from "@/firestore/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";

const ProfilePhotoComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: {
    target: { files: React.SetStateAction<null>[] };
  }) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    // Create a storage reference with a unique name for the file
    const storageRef = ref(storage, `images/${selectedImage.name}`);
    setUploading(true);

    // Upload the selected image file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    // Monitor the upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file: ", error);
      },
      () => {
        // Upload completed successfully
        setUploading(false);
        setSelectedImage(null);
        setUploadProgress(0);
        console.log("File uploaded successfully");
      }
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

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!selectedImage || uploading}
        >
          Upload
        </Button>
        <PersonalDetails />
      </Container>
    </Box>
  );
};

export default ProfilePhotoComponent;
