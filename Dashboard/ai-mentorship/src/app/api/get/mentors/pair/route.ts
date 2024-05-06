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
    // const id = req.nextUrl.searchParams.get("slug"); // Access the slug parameter
    //const { Parser } = require("json2csv");

    // Fetch all documents in the "Mentees" collection
    const q = query(
      collection(database, "Mentors"),
      where("status", "==", Status.Incomplete)
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

        // const preferencesDetails = await getDocs(
        //   collection(database, "Mentees", uniqueId, "Preferences")
        // );

        // preferencesDetails.forEach((doc) => {
        //   innerDocData.push(doc.data());
        // });

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

    //Assuming you have data in the format of an array of arrays
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
        "19/04/2023 11:49",
        "AB CD",
        "A Company",
        "Director",
        "Female",
        "ab.cd@company.come",
        "123435",
        "Client Director, Strategic Digital Advisory",
        "I am passionate about supporting young talent in the industry",
        "Meet talented young females who want to join the tech industry",
        "3rd year undergraduate, 4th year undergraduate",
        "Engineering",
        "Analytics, Digital Services, Mathematical Modelling and Computation, Software Development, Software Engineering",
        "ESFJ",
        "",
        "Here is a bio",
      ],
      [
        "19/04/2023 12:55",
        docData[0][0].fullName,
        docData[0][1].organisation,
        docData[0][1].jobTitle,
        docData[0][0].gender,
        docData[0][0].emailAddress,
        docData[0][0].phoneNumber,
        docData[0][0].specialisation,
        "I am passionate about supporting young talent in the industry",
        "Meet talented young females who want to join the tech industry",
        "3rd year undergraduate, 4th year undergraduate",
        "Engineering",
        "Analytics, Digital Services, Mathematical Modelling and Computation, Software Development, Software Engineering",
        docData[0][3].personalityType,
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
    const filePath = "aut_wit_industrial_proj/data/mentor_eoi_data.csv";

    fs.writeFileSync(filePath, csv, "utf8");

    console.log("CSV file has been saved.");

    return Response.json(docData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Internal server error" });
  }
}
