"use client";
import { GetPairMentorResult } from "@/redux/dashboard/actions/getPairMentorResults";
import { PairingResult } from "@/redux/dashboard/dashboardSlice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";

const Bio = () => {
  const dispatch = useAppDispatch();
  const uploadphoto = async () => {
    try {
      const rResponse = await fetch("/api/backend/test-pair", {
        next: { revalidate: 60 },
      });
      if (rResponse.ok) {
        const responseR = await rResponse.json();
        console.log(responseR);
      } else {
        console.log("Failed to fetch R data");
      }
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
