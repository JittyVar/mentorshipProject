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
    console.log("id ", id);

    // Fetch all documents in the "Mentees" collection
    const q = query(
      collection(database, "Mentors"),
      where("documentOf", "==", id)
    );
    const docData: DocumentData = [];

    const querySnapshot = await getDocs(q);
    const uniqueIds: string[] = [];
    querySnapshot.forEach((doc) => {
      uniqueIds.push(doc.id);
    });

    await Promise.all(
      uniqueIds.map(async (uniqueId) => {
        const innerDocData: DocumentData = [];
        const personalDetails = await getDocs(
          collection(database, "Mentors", uniqueId, "Personal Details")
        );

        personalDetails.forEach((doc) => {
          innerDocData.push(doc.data());
        });

        const backgroundDetails = await getDocs(
          collection(database, "Mentors", uniqueId, "Background Details")
        );

        backgroundDetails.forEach((doc) => {
          innerDocData.push(doc.data());
        });

        const preferencesDetails = await getDocs(
          collection(database, "Mentors", uniqueId, "Preferences")
        );

        preferencesDetails.forEach((doc) => {
          innerDocData.push(doc.data());
        });

        const goals = await getDocs(
          collection(database, "Mentors", uniqueId, "Goals")
        );

        goals.forEach((doc) => {
          innerDocData.push(doc.data());
        });

        const personalityType = await getDocs(
          collection(database, "Mentors", uniqueId, "Personality Type")
        );

        personalityType.forEach((doc) => {
          innerDocData.push(doc.data());
        });

        docData.push(innerDocData);
      })
    );

    if (docData.length != 0) {
      // Assuming you have data in the format of an array of arrays
      const data = [
        [
          "Timestamp",
          "Name",
          "Organisation",
          "Job title",
          "Gender",
          "Email",
          "Phone number",
          "Short description of your role",
          "Why I chose to offer myself as a mentor",
          "What would you hope to get from this program?",
          "What type/s of mentee would you prefer?",
          "What type of students are best aligned with your expertise?",
          "Which subjects are best aligned with your expertise?",
          "Personality Type",
          "Please attach a photo of yourself",
          "Short Bio",
        ],
        [
          "19/04/2023 12:55",
          docData[0][0].fullName,
          docData[0][1].organisation,
          docData[0][1].jobTitle,
          docData[0][0].gender,
          docData[0][0].emailAddress,
          docData[0][0].phoneNumber,
          docData[0][1].specialisation,
          docData[0][3].motivation,
          docData[0][3].outcome,
          docData[0][2].menteeType,
          "Engineering",
          docData[0][2].studentType.join(", "),
          docData[0][4].personalityType,
          "",
          "Here is a bio",
        ],
      ];

      // Convert the array of arrays to JSON
      const jsonData = data.slice(1).map((row) => ({
        Timestamp: row[0],
        Name: row[1],
        Organisation: row[2],
        "Job title": row[3],
        Gender: row[4],
        Email: row[5],
        "Phone number": row[6],
        "Short description of your role": row[7],
        "Why I chose to offer myself as a mentor": row[8],
        "What would you hope to get from this program?": row[9],
        "What type/s of mentee would you prefer?": row[10],
        "What type of students are best aligned with your expertise?": row[11],
        "Which subjects are best aligned with your expertise?": row[12],
        "Personality Type": row[13],
        "Please attach a photo of yourself": row[14],
        "Short Bio": row[15],
      }));

      const csv = await converter.json2csv(jsonData);

      // Specify the file path where you want to save the CSV
      const filePath = "src/app/api/pair/data/mentor_eoi_data.csv";

      fs.writeFileSync(filePath, csv, "utf8");
    }

    console.log("CSV file has been saved.");

    const r = query(
      collection(database, "Mentees"),
      where("status", "==", Status.Incomplete)
    );
    const docData2: DocumentData = [];

    const querySnapshot2 = await getDocs(r);
    const uniqueIds2: string[] = [];
    querySnapshot2.forEach((doc) => {
      uniqueIds2.push(doc.id);
    });

    await Promise.all(
      uniqueIds2.map(async (uniqueId) => {
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

        const goalsDetails = await getDocs(
          collection(database, "Mentees", uniqueId, "Goals")
        );

        goalsDetails.forEach((doc) => {
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

        docData2.push(innerDocData);
      })
    );

    //Assuming you have data in the format of an array of arrays
    const data2 = [
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
    ];

    if (uniqueIds2.length != 0) {
      for (let i = 0; i < uniqueIds2.length; i++) {
        let index = i;
        data2.push([
          "19/04/2023 12:55",
          docData2[index][0].fullName,
          "18021379",
          docData2[index][0].emailAddress,
          docData2[index][0].phoneNumber,
          `${docData2[index][1].programs}`,
          `${docData2[index][1].majors.join(", ")}`,
          "2nd year undergraduate",
          `${docData2[index][3].stemSector.join(", ")}`,
          `${docData2[index][2].outcome}`,
          "Industry",
          `${docData2[index][3].preferences}`,
          `${docData2[index][4].personalityType}`,
        ]);
      }
    }

    // Convert the array of arrays to JSON
    const jsonData = data2.slice(1).map((row) => ({
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
    const filePath = "src/app/api/pair/data/mentee_eoi_data.csv";

    fs.writeFileSync(filePath, csv, "utf8");

    console.log("MenteeCSV file has been saved.");

    return Response.json({ message: "success " });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Internal server error" });
  }
}
