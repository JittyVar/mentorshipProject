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
      const mentorQuery = query(
        collection(database, "Mentors"),
        where("documentOf", "==", data.mentor.fullName)
      );

      // Execute the query
      const mentorQuerySnapshot = await getDocs(mentorQuery);

      // Check if there is a mentor document matching the query
      if (!mentorQuerySnapshot.empty) {
        // Assuming there's only one mentor document with documentOf="name"
        const mentorDocRef = mentorQuerySnapshot.docs[0].ref;

        // Add the "Preferences" subcollection to the mentor document
        const preferencesRef = collection(mentorDocRef, "Preferences");
        await addDoc(preferencesRef, {
          preferences: data.preferences.preferences,
          menteeType: data.preferences.menteeType,
          studentType: data.preferences.studentType,
        });

        const goalsCollectionRef = collection(mentorDocRef, "Goals");
        await addDoc(goalsCollectionRef, {
          longTermGoal: data.goals.longTermGoal ? data.goals.longTermGoal : "",
          firstShortTermGoal: data.goals.firstShortTermGoal
            ? data.goals.firstShortTermGoal
            : "",
          secondShortTermGoal: data.goals.secondShortTermGoal
            ? data.goals.secondShortTermGoal
            : "",
          outcome: data.goals.outcome,
          motivation: data.goals.motivation,
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
