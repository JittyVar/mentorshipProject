import database from "@/firestore/firestore";
import {
  query,
  collection,
  getDocs,
  DocumentData,
  where,
} from "firebase/firestore";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import fs from "fs";
import { matchingResults } from "../../../../../../aut_wit_industrial_proj/output";
import { Status } from "@/data/Status";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    let converter = require("json-2-csv");
    const id = req.nextUrl.searchParams.get("slug"); // Access the slug parameter
    //const { Parser } = require("json2csv");
    console.log("id ", id);

    // Fetch all documents in the "Mentees" collection
    const q = query(
      collection(database, "Mentees"),
      where("documentOf", "==", id)
    );
    const docData: DocumentData = [];

    const querySnapshot = await getDocs(q);
    const uniqueIds: string[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      uniqueIds.push(doc.id);
    });

    await Promise.all(
      uniqueIds.map(async (uniqueId) => {
        const innerDocData: DocumentData = [];
        const personalDetails = await getDocs(
          collection(database, "Mentees", uniqueId, "Personal Details")
        );

        personalDetails.forEach((doc) => {
          innerDocData.push(doc.data());
        });

        const backgroundDetails = await getDocs(
          collection(database, "Mentees", uniqueId, "Background Details")
        );

        backgroundDetails.forEach((doc) => {
          innerDocData.push(doc.data());
        });

        const preferencesDetails = await getDocs(
          collection(database, "Mentees", uniqueId, "Preferences")
        );

        preferencesDetails.forEach((doc) => {
          innerDocData.push(doc.data());
        });

        const personalityType = await getDocs(
          collection(database, "Mentees", uniqueId, "Personality Type")
        );

        personalityType.forEach((doc) => {
          innerDocData.push(doc.data());
        });

        docData.push(innerDocData);
      })
    );

    // Assuming you have data in the format of an array of arrays
    const data = [
      [
        "Timestamp",
        "Name",
        "Student ID",
        "Email",
        "Phone number",
        "What programme are you currently enrolled in?",
        "Which major/s are you currently enrolled in?",
        "Which year of the degree are you?",
        "Which STEM sector are you interested in and why?",
        "What would you hope to get from this program?",
        "What type of mentor would you prefer?",
        "I prefer",
        "Personality Type",
      ],
      [
        "19/04/2023 12:55",
        "XY Student",
        "12345",
        "xy@student.ac.nz",
        "12345",
        "Bachelor of Computer and Information Sciences (BCIS)",
        "Networks and Cybersecurity, Software Development",
        "3rd year undergraduate",
        "here is some text",
        "here is some text",
        "Industry",
        "No preference",
        "INTJ",
      ],
      [
        "19/04/2023 12:55",
        docData[0][0].fullName,
        "18021379",
        docData[0][0].emailAddress,
        docData[0][0].phoneNumber,
        `${docData[0][1].programs.join(", ")}`,
        `${docData[0][1].majors.join(", ")}`,
        "2nd year undergraduate",
        `${docData[0][2].preferences.stemSector.join(", ")}`,
        `${docData[0][2].preferences.expectation}`,
        "Industry",
        `${docData[0][2].preferences.preferences.join(", ")}`,
        `${docData[0][3].personalityType}`,
      ],
    ];

    // Convert the array of arrays to JSON
    const jsonData = data.slice(1).map((row) => ({
      Timestamp: row[0],
      Name: row[1],
      "Student ID": row[2],
      Email: row[3],
      "Phone number": row[4],
      "What programme are you currently enrolled in?": row[5],
      "Which major/s are you currently enrolled in?": row[6],
      "Which year of the degree are you?": row[7],
      "Which STEM sector are you interested in and why?": row[8],
      "What would you hope to get from this program?": row[9],
      "What type of mentor would you prefer?": row[10],
      "I prefer": row[11],
      "Personality Type": row[12],
    }));

    const csv = await converter.json2csv(jsonData);

    // Specify the file path where you want to save the CSV
    const filePath = "aut_wit_industrial_proj/data/mentee_eoi_data.csv";

    fs.writeFileSync(filePath, csv, "utf8");

    console.log("CSV file has been saved.");

    return Response.json(matchingResults);
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Internal server error" });
  }
}
