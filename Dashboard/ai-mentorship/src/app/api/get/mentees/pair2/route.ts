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

        const skills = await getDocs(
          collection(database, "Mentees", uniqueId, "Skills")
        );

        skills.forEach((doc) => {
          innerDocData.push(doc.data());
        });

        docData.push(innerDocData);
      })
    );

    // Assuming you have data in the format of an array of arrays
    //phoneNumber,fullName,emailAddress,age,currentStage,majors,yearOfDegree,programs,outcome,
    //firstShortTermGoal,secondShortTermGoal,longTermGoal,preferences,stemSector,personalityType,firstBasicIndustrySkill,
    //firstBasicSoftSkill,secondBasicIndustrySkill,firstExpertIndustrySkill,secondExpertIndustrySkill,firstExpertSoftSkill
    const data = [
      [
        "Phone number",
        "Full name",
        "Email",
        "Age",
        "Current stage",
        "Which major/s are you currently enrolled in?",
        "Which year of the degree are you?",
        "What programme are you currently enrolled in?",
        "What would you hope to get from this program?",
        "First Short term goal",
        "Second Short term goal",
        "Long Term goal",
        "I prefer",
        "What STEM sector are you interested in?",
        "Personality Type",
        "First basic industry skill",
        "First basic soft skill",
        "Second basic industry skill",
        "First expert industry skill",
        "Second expert industry skill",
        "First expert soft skill",
      ],
      //phoneNumber,fullName,emailAddress,age,currentStage,majors,yearOfDegree,programs,outcome,
      //firstShortTermGoal,secondShortTermGoal,longTermGoal,preferences,stemSector,personalityType,firstBasicIndustrySkill,
      //firstBasicSoftSkill,secondBasicIndustrySkill,firstExpertIndustrySkill,secondExpertIndustrySkill,firstExpertSoftSkill
      [
        docData[0][0].phoneNumber,
        docData[0][0].fullName,
        docData[0][0].emailAddress,
        docData[0][0].age,
        docData[0][0].currentStage,
        docData[0][1].majors[0],
        docData[0][1].yearOfDegree,
        docData[0][1].programs[0],
        docData[0][2].outcome,
        docData[0][2].firstShortTermGoal,
        docData[0][2].secondShortTermGoal,
        docData[0][2].longTermGoal,
        `${docData[0][3].preferences.join(", ")}`,
        `${docData[0][3].stemSector.join(", ")}`,
        docData[0][4].personalityType,
        docData[0][5].basicSkills.firstBasicIndustrySkill,
        docData[0][5].basicSkills.firstBasicSoftSkill,
        docData[0][5].basicSkills.secondBasicIndustrySkill,
        docData[0][5].expertSkills.firstExpertIndustrySkill,
        docData[0][5].expertSkills.firstExpertSoftSkill,
        docData[0][5].expertSkills.secondExpertIndustrySkill,
      ],
    ];

    // Convert the array of arrays to JSON
    const jsonData = data.slice(1).map((row) => ({
      phoneNumber: row[0],
      fullName: row[1],
      emailAddress: row[2],
      age: row[3],
      currentStage: row[4],
      majors: row[5],
      yearOfDegree: row[6],
      programs: row[7],
      outcome: row[8],
      firstShortTermGoal: row[9],
      secondShortTermGoal: row[10],
      longTermGoal: row[11],
      preferences: row[12],
      stemSector: row[13],
      personalityType: row[14],
      firstBasicIndustrySkill: row[15],
      firstBasicSoftSkill: row[16],
      secondBasicIndustrySkill: row[17],
      firstExpertIndustrySkill: row[18],
      secondExpertIndustrySkill: row[19],
      firstExpertSoftSkill: row[20],
    }));

    const csv = await converter.json2csv(jsonData);

    // Specify the file path where you want to save the CSV
    const filePath =
      "src/app/api/backend/tests/dummy-data-test/mentee_eoi_data2.csv";

    fs.writeFileSync(filePath, csv, "utf8");

    console.log("MenteeCSV2  file has been saved.");

    // Fetch all documents in the "Mentees" collection
    const r = query(
      collection(database, "Mentors"),
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

        const skills = await getDocs(
          collection(database, "Mentors", uniqueId, "Skills")
        );

        skills.forEach((doc) => {
          innerDocData.push(doc.data());
        });

        docData2.push(innerDocData);
      })
    );

    if (docData2.length != 0) {
      // Assuming you have data in the format of an array of arrays
      //gender,fullName,emailAddress,phoneNumber,specialisation,organisation,jobTitle,student subject Type,
      //menteeType,outcome,secondShortTermGoal,firstShortTermGoal,motivation,longTermGoal,personalityType,
      //firstBasicIndustrySkill,firstBasicSoftSkill,secondBasicIndustrySkill,firstExpertIndustrySkill,secondExpertIndustrySkill,firstExpertSoftSkill
      const data2 = [
        [
          "Gender",
          "Full Name",
          "Email",
          "Phone number",
          "Specialisation",
          "Organisation",
          "Job title",
          "Student subject type",
          "What type/s of mentee would you prefer?",
          "What would you hope to get from this program?",
          "Second Short term goal",
          "First Short term goal",
          "Why I chose to offer myself as a mentor",
          "Long Term goal",
          "Personality Type",
          "First basic industry skill",
          "First basic soft skill",
          "Second basic industry skill",
          "First expert industry skill",
          "Second expert industry skill",
          "First expert soft skill",
        ],
      ];
      for (let i = 0; i < uniqueIds2.length; i++) {
        data2.push([
          docData2[i][0].gender,
          docData2[i][0].fullName,
          docData2[i][0].emailAddress,
          docData2[i][0].phoneNumber,
          docData2[i][1].specialisation,
          docData2[i][1].organisation,
          docData2[i][1].jobTitle,
          `${docData2[i][2].studentType.join(", ")}`,
          docData2[i][2].menteeType,
          docData2[i][3].outcome,
          docData2[i][3].firstShortTermGoal,
          docData2[i][3].secondShortTermGoal,
          docData2[i][3].motivation,
          docData2[i][3].longTermGoal,
          docData2[i][4].personalityType,
          docData2[i][5].basicSkills.firstBasicIndustrySkill,
          docData2[i][5].basicSkills.firstBasicSoftSkill,
          docData2[i][5].basicSkills.secondBasicIndustrySkill,
          docData2[i][5].expertSkills.firstExpertIndustrySkill,
          docData2[i][5].expertSkills.firstExpertSoftSkill,
          docData2[i][5].expertSkills.secondExpertIndustrySkill,
        ]);
      }

      //   Convert the array of arrays to JSON
      //   gender,fullName,emailAddress,phoneNumber,specialisation,organisation,jobTitle,student subject Type,
      //   menteeType,outcome,secondShortTermGoal,firstShortTermGoal,motivation,longTermGoal,personalityType,
      //   firstBasicIndustrySkill,firstBasicSoftSkill,secondBasicIndustrySkill,firstExpertIndustrySkill,secondExpertIndustrySkill,firstExpertSoftSkill
      const jsonData = data2.slice(1).map((row) => ({
        gender: row[0],
        fullName: row[1],
        emailAddress: row[2],
        phoneNumber: row[3],
        specialisation: row[4],
        organisation: row[5],
        jobTitle: row[6],
        "student subject Type": row[7],
        menteeType: row[8],
        outcome: row[9],
        secondShortTermGoal: row[10],
        firstShortTermGoal: row[11],
        motivation: row[12],
        longTermGoal: row[13],
        personalityType: row[14],
        firstBasicIndustrySkill: row[15],
        firstBasicSoftSkill: row[16],
        secondBasicIndustrySkill: row[17],
        firstExpertIndustrySkill: row[18],
        secondExpertIndustrySkill: row[19],
        firstExpertSoftSkill: row[20],
      }));

      const csv = await converter.json2csv(jsonData);

      // Specify the file path where you want to save the CSV
      const filePath =
        "src/app/api/backend/tests/dummy-data-test/mentor_eoi_data2.csv";

      fs.writeFileSync(filePath, csv, "utf8");
    }

    console.log("Mentor2 CSV file has been saved.");

    return Response.json({ message: "mentee paired done" });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Internal server error" });
  }
}
