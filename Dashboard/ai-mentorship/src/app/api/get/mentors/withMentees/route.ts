import database from "@/firestore/firestore";
import { Status } from "@/data/Status";
import { query, collection, where, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const q = query(
      collection(database, "Mentors"),
      where("status", "==", Status.Completed)
    );

    const querySnapshot = await getDocs(q);

    return Response.json(querySnapshot.size);
  } catch (error) {
    throw error;
  }
}
