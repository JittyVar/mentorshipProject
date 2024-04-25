import database from "@/firestore/firestore";
import { getDocs, collection } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const collectionRef = collection(database, "Mentors");
    const totalMentors = await getDocs(collectionRef);

    // Return
    return Response.json(totalMentors.size);
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
}
