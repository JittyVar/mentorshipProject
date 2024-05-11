import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firestore/firestore";
import Image from "next/image";

const DisplayImageComponent = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Reference to the image file
    const imageRef = ref(
      storage,
      "images/A9B87B1C-5260-488F-89A4-1C33E14DDA7C.jpg"
    );

    // Get the download URL of the image
    getDownloadURL(imageRef)
      .then((url) => {
        // Set the image URL
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error getting download URL: ", error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <Box>
      <Container sx={{ padding: "5%", gap: "30px" }}>
        <Typography>Profile Photo</Typography>
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="Profile" width={200} height={300} />
        )}
      </Container>
    </Box>
  );
};

export default DisplayImageComponent;
