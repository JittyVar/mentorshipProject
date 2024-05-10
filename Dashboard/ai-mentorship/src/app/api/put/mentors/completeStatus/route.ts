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

    console.log("name[1].mentee_name ", name[1].mentee_name);
    // Query Firestore to find the document matching the name and participatingAs
    const q = query(
      collection(database, "Mentors"),
      where("documentOf", "==", name[0])
    );

    const r = query(
      collection(database, "Mentees"),
      where("documentOf", "==", name[1].mentee_name)
    );

    const querySnapshot = await getDocs(q);
    const querySnapshot2 = await getDocs(r);

    // Iterate through the documents in the query result
    querySnapshot.forEach(async (docSnapshot) => {
      try {
        // Update each document individually
        const docRef = doc(database, "Mentors", docSnapshot.id); // Get the document reference
        await updateDoc(docRef, {
          status: Status.Completed,
          assignedMentor: name[1].mentee_name,
          pairedDuring: new Date().toDateString(),
        }); // Update the document
      } catch (error) {
        console.error("Error updating document:", error);
      }
    });

    // Iterate through the documents in the query result
    querySnapshot2.forEach(async (docSnapshot) => {
      try {
        // Update each document individually
        const docRef = doc(database, "Mentees", docSnapshot.id); // Get the document reference
        await updateDoc(docRef, {
          status: Status.Completed,
          assignedMentor: name[1].mentor_name,
          pairedDuring: new Date().toDateString(),
        }); // Update the document
      } catch (error) {
        console.error("Error updating document:", error);
      }
    });

    // Send a success response
    return Response.json({ message: "Successfully updated documents" });
  } catch (error) {
    throw error;
  }
}
