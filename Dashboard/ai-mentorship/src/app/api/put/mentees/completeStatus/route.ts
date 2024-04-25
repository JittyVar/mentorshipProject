import database from "@/firestore/firestore";
import { Status } from "@/data/Status";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export async function POST(req: Request, context: any) {
  try {
    const name = await req.json(); // Access the value of the 'param' property
    // Query Firestore to find the document matching the name and participatingAs
    const q = query(
      collection(database, "Mentees"),
      where("documentOf", "==", name)
    );
    const querySnapshot = await getDocs(q);

    // Use Promise.all to wait for all update operations to complete
    const updatePromises = querySnapshot.docs.map(async (docSnapshot) => {
      try {
        // Update each document individually
        const docRef = doc(database, "Mentees", docSnapshot.id); // Get the document reference
        await updateDoc(docRef, {
          status: Status.Completed,
          assignedMentor: "Mentor name",
          pairedDuring: new Date().toDateString(),
        }); // Update the document
      } catch (error) {
        console.error("Error updating document:", error);
        throw error; // Propagate the error to stop Promise.all if any update fails
      }
    });

    // Wait for all update operations to complete
    await Promise.all(updatePromises);

    // Send a success response
    return Response.json({ message: "Successfully updated documents" });
  } catch (error) {
    throw error;
  }
}
