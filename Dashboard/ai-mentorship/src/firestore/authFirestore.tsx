import { getAuth } from "firebase/auth";
import app from "./appFirestore";

const auth = getAuth(app);
export default auth;
