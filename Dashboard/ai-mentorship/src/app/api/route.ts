// pages/api/getData.ts
import database from "@/firestore/firestore";
import { getDoc, collection, query, where, doc } from "firebase/firestore";

export async function GET(req: Request) {
  try {
    console.log("req", req);
    const docRef = doc(database, "Mentees", "CCwB794YJIfrI5Gv0lrt");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    return Response.json({ message: docSnap.data() });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Internal error" });
  }
}
