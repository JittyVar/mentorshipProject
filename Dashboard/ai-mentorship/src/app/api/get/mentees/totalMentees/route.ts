import database from "@/firestore/firestore";
import { getDocs, collection } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const collectionRef = collection(database, "Mentees");
    const totalMentees = await getDocs(collectionRef);
    return Response.json(totalMentees.size);
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
}
