import auth from "@/firestore/authFirestore";
import { onAuthStateChanged } from "firebase/auth";

export async function GET() {
  let userData;
  try {
    await onAuthStateChanged(auth, (user) => {
      userData = user;
      console.log("user ", user);
    });
    return Response.json({ message: userData });
  } catch {
    return Response.json({ message: "Error" });
  }
}
