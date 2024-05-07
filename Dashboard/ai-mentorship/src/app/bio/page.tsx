"use client";
import { useEffect } from "react";

const Bio = () => {
  const uploadphoto = async () => {
    try {
      console.log("getting mentee");
      const response = await fetch("/api/get/mentees/pair?slug=Mentee Name 2", {
        next: { revalidate: 60 },
      });
      let menteeData, mentorData, responseR;
      if (response.ok) {
        menteeData = await response.json();
        console.log("mentee ", menteeData);
      } else {
        console.log("Failed to fetch mentee data");
      }

      console.log("getting mentor");
      const mentorResponse = await fetch("/api/get/mentors/pair", {
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
      if (rResponse.ok) {
        responseR = await rResponse.json();
        console.log("rResponse ", responseR);
      } else {
        console.log("Failed to fetch R data");
      }

      return { menteeData, mentorData, responseR };
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await uploadphoto();
      console.log("All data fetched:", data);
    };
    fetchData();
  }, []);

  return <div>Bio</div>;
};

export default Bio;
