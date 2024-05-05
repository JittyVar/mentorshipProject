import database from "@/firestore/firestore";
import {
  query,
  collection,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { matchinResult } from "../../../../aut_wit_industrial_proj/matchingResult";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const id = req.nextUrl.searchParams.get("slug"); // Access the slug parameter
    //const { Parser } = require("json2csv");
    console.log("id ", id);
    // const docData: DocumentData = [];

    // // Use the slug parameter in your Firestore query
    // const q = query(
    //   collection(database, "Mentees"),
    //   where("documentOf", "==", id) // Assuming there's a "slug" field in your Firestore documents
    // );

    // const querySnapshot = await getDocs(q);
    // const documentsData = querySnapshot.docs.map((doc) => ({
    //   uniqueId: doc.id,
    //   docData: doc.data(),
    // }));

    // const personalDetails = await getDocs(
    //   collection(
    //     database,
    //     "Mentees",
    //     documentsData[0].uniqueId,
    //     "Personal Details"
    //   )
    // );

    // personalDetails.forEach((doc) => {
    //   docData.push(doc.data());
    // });

    // const backgroundDetails = await getDocs(
    //   collection(
    //     database,
    //     "Mentees",
    //     documentsData[0].uniqueId,
    //     "Background Details"
    //   )
    // );

    // backgroundDetails.forEach((doc) => {
    //   docData.push(doc.data());
    // });

    // const preferencesDetails = await getDocs(
    //   collection(database, "Mentees", documentsData[0].uniqueId, "Preferences")
    // );

    // preferencesDetails.forEach((doc) => {
    //   docData.push(doc.data());
    // });

    // const personalityType = await getDocs(
    //   collection(
    //     database,
    //     "Mentees",
    //     documentsData[0].uniqueId,
    //     "Personality Type"
    //   )
    // );

    // personalityType.forEach((doc) => {
    //   docData.push(doc.data());
    // });

    // console.log("preferencesDetails ", docData);

    // const arr = [
    //   {
    //     Timestamp: documentsData[0].docData.createdAt,
    //     Name: docData[0].fullName,
    //     "Student ID": "12345",
    //     Email: docData[0].emailAddress,
    //     "Phone number": docData[0].phoneNumber,
    //     "Program Enrolled": docData[1].programs,
    //     "Major/s Enrolled": docData[1].majors,
    //     "Year of Degree": "3rd year undergraduate",
    //     "STEM Sector Interest": docData[2].preferences.stemSector,
    //     "Expectations from Program": docData[2].preferences.expectation,
    //     "Preferred Mentor Type": docData[2].preferences.expectation.preferences,
    //     "Personality Type": docData[3].personalityType,
    //   },
    // ];

    // let fields = [
    //   "Timestamp",
    //   "Name",
    //   "Student ID",
    //   "Email",
    //   "Phone number",
    //   "Program Enrolled",
    //   "Major/s Enrolled",
    //   "Year of Degree",
    //   "STEM Sector Interest",
    //   "Expectations from Program",
    //   "Preferred Mentor Type",
    //   "Personality Type",
    // ];

    // const parser = new Parser({
    //   fields,
    //   unwind: [
    //     arr[0],
    //     arr[1],
    //     arr[2],
    //     arr[3],
    //     arr[4],
    //     arr[5],
    //     arr[6],
    //     arr[7],
    //     arr[8],
    //     arr[9],
    //     arr[10],
    //     arr[11],
    //   ],
    // });

    return Response.json(matchinResult);
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Internal server error" });
  }
}
