"use client";
import { GetPairMentorResult } from "@/redux/dashboard/actions/getPairMentorResults";
import { PairingResult } from "@/redux/dashboard/dashboardSlice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";

const Bio = () => {
  const dispatch = useAppDispatch();
  // const uploadphoto = async () => {
  //   try {
  //     dispatch(GetPairMentorResult("Mentor Name 4")); //rename

  //     // console.log("getting R");
  //     // const rResponse = await fetch("/api/pair", {
  //     //   next: { revalidate: 60 },
  //     // });
  //     // let getPairedResult;
  //     // if (rResponse.ok) {
  //     //   responseR = await rResponse.json();
  //     //   getPairedResult = responseR.filter((e: PairingResult) => {
  //     //     return e.mentee_name == "Alyssa Pausanos";
  //     //   });

  //     //   console.log("getPairedResult ", getPairedResult);
  //     // } else {
  //     //   console.log("Failed to fetch R data");
  //     // }

  //     // return { menteeData, mentorData, getPairedResult };
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await uploadphoto();
  //     console.log("All data fetched:", data);
  //   };
  //   fetchData();
  // }, []);

  return <div>Bio</div>;
};

export default Bio;
