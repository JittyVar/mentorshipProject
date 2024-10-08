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

        if (data?.mentee?.currentStage != "Professional") {
          const backgroundDetailsCollectionRef = collection(
            menteeDocRef,
            "Background Details"
          );
          await addDoc(backgroundDetailsCollectionRef, {
            programs: data?.educationalBackground?.programs,
            majors: data?.educationalBackground?.majors,
            yearOfDegree: data?.educationalBackground?.yearOfDegree,
          });
        } else {
          const professionalDetailsCollectionRef = collection(
            menteeDocRef,
            "Professional Details"
          );
          await addDoc(professionalDetailsCollectionRef, {
            jobTitle: data?.professionalBackground?.jobTitle,
            linkedInURL: data?.professionalBackground?.linkedInUrl,
          });
        }

        const menteePreferencesCollectionRef = collection(
          menteeDocRef,
          "Preferences"
        );
        await addDoc(menteePreferencesCollectionRef, {
          preferences: data.preferences.preferences,
          stemSector: data.preferences.stemSector,
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
