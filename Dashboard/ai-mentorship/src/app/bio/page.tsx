"use client";
import { useEffect } from "react";

const Bio = () => {
  const uploadphoto = async () => {
    try {
      console.log("getting mentee");
      const response = await fetch("/api/get/mentees/pair?slug=testing", {
        next: { revalidate: 60 },
      });
      let menteeData, mentorData;
      if (response.ok) {
        menteeData = await response.json();
        console.log("mentee ", menteeData);
      } else {
        console.log("Failed to fetch mentee data");
      }

      console.log("getting mentor");
      const mentorResponse = await fetch("/api/get/mentors/pair?slug=testing", {
        next: { revalidate: 60 },
      });
      if (mentorResponse.ok) {
        mentorData = await mentorResponse.json();
        console.log("mentor ", mentorData);
      } else {
        console.log("Failed to fetch mentor data");
      }

      console.log("getting R");
      const rResponse = await fetch("/api/pair", {
        next: { revalidate: 60 },
      });
      if (mentorResponse.ok) {
        mentorData = await rResponse.json();
        console.log("mentor ", rResponse);
      } else {
        console.log("Failed to fetch mentor data");
      }

      return { menteeData, mentorData, rResponse };
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    uploadphoto();
  }, []);
  return <div>Bio</div>;
};

export default Bio;
