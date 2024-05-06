import { getStorage, ref } from "firebase/storage";
import adminpic from "../../../../components/greeting/adminpic.png";

export async function POST(req: Request, context: any) {
  try {
    // Create a root reference
    const storage = getStorage();

    // Create a reference to 'mountains.jpg'
    const mountainsRef = ref(storage, adminpic.src);

    // Create a reference to 'images/mountains.jpg'
    const mountainImagesRef = ref(storage, `images/${adminpic.src}`);

    // While the file names are the same, the references point to different files
    mountainsRef.name === mountainImagesRef.name; // true
    mountainsRef.fullPath === mountainImagesRef.fullPath; // false
    return Response.json({ message: "Successfully uploaded photo" });
  } catch (error) {
    throw error;
  }
}
