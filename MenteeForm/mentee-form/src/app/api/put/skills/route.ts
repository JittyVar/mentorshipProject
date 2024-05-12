import { database } from "@/firestore/firestore";
import { Status } from "@/redux/actions/createMenteeDocument";
import { registrationForm } from "@/redux/registrationSlice";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

export async function POST(req: Request, context: any) {
  try {
    const data: registrationForm = await req.json(); // Access the value of the 'param' property
    // Query Firestore to find the document matching the name and participatingAs
    try {
      const menteeQuery = query(
        collection(database, "Mentees"),
        where("documentOf", "==", data.mentee.fullName)
      );

      // Execute the query
      const menteeQuerySnapshot = await getDocs(menteeQuery);

      // Check if there is a mentor document matching the query
      if (!menteeQuerySnapshot.empty) {
        // Assuming there's only one mentor document with documentOf="name"
        const menteeDocRef = menteeQuerySnapshot.docs[0].ref;

        const skillsCollectionRef = collection(menteeDocRef, "Skills");
        await addDoc(skillsCollectionRef, {
          basicSkills: {
            firstBasicSoftSkill: data.skills.basicSkills.firstBasicSoftSkill,
            firstBasicIndustrySkill:
              data.skills.basicSkills.firstBasicIndustrySkill,
            secondBasicIndustrySkill:
              data.skills.basicSkills.secondBasicIndustrySkill,
          },
          expertSkills: {
            firstExpertSoftSkill: data.skills.expertSkills.firstExpertSoftSkill,
            firstExpertIndustrySkill:
              data.skills.expertSkills.firstExpertIndustrySkill,
            secondExpertIndustrySkill:
              data.skills.expertSkills.secondExpertIndustrySkill,
          },
        });
      } else {
        // Handle the case where no mentor document matches the query
        console.error("No mentor document found with documentOf='name'");
      }
    } catch (error) {
      console.error("Error adding document:", error);
      throw error; // Propagate the error to stop Promise.all if any update fails
    }
    // Send a success response
    return Response.json({ message: "Successfully updated documents" });
  } catch (error) {
    throw error;
  }
}
