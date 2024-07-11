"use client";
import { GetPairMentorResult } from "@/redux/dashboard/actions/getPairMentorResults";
import { PairingResult } from "@/redux/dashboard/dashboardSlice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect, useState } from "react";

const Bio = () => {
  const dispatch = useAppDispatch();
  interface data {
    unique_id: string;
    fullName: string;
    mentor_fullName: string;
    predicted_cosine_similarity: string;
  }

  const [results, setResults] = useState<data[]>([]);

  const uploadphoto = async () => {
    try {
      const rResponse1 = await fetch("/api/get/mentors/pair2", {
        next: { revalidate: 60 },
      });
      if (rResponse1.ok) {
        const responseR = await rResponse1.json();
        console.log(responseR);
      } else {
        console.log("Failed to fetch R data");
      }
      const rResponse2 = await fetch("/api/test-pair", {
        next: { revalidate: 60 },
      });
      if (rResponse2.ok) {
        const responseR = await rResponse2.json();
        setResults(responseR);
      } else {
        console.log("Failed to fetch R data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    uploadphoto();
  }, []);

  useEffect(() => {
    console.log("results ", results);
  }, [results]);

  return (
    <div>
      {results.map((doc, id) => (
        <>
          Mentee Name= {doc.fullName} Mentor Name = {doc.mentor_fullName}
          <br />
        </>
      ))}
    </div>
  );
};

export default Bio;
