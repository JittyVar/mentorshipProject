import auth from "@/firestore/authFirestore";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export async function POST(req: Request, context: any) {
  const email = "dashboard-ai@example.com";
  const password = "testing1234";
  let user;
  try {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user.email;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    return Response.json(user);
  } catch {
    return Response.json({ message: "Error" });
  }
}
