import database from "@/firestore/firestore";
import { getDocs, collection } from "firebase/firestore";

export async function GET() {
  try {
    const collectionRef = collection(database, "Mentees");
    const totalMentees = await getDocs(collectionRef);

    // Return
    return Response.json(totalMentees.size);
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
}
