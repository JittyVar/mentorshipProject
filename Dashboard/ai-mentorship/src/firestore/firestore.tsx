import { getFirestore } from "firebase/firestore";
import app from "./appFirestore";

const database = getFirestore(app);

export default database;
