import { HomeTableColumns } from "@/data/HomeTableColumns";
import { Status } from "@/data/Status";
import database from "@/firestore/firestore";
import { getDocs, collection, query, where } from "firebase/firestore";

export async function GET() {
  try {
    const newRows: HomeTableColumns[] = [];
    const nonNullMenteesQuery = query(
      collection(database, "Mentees"),
      where("documentOf", "!=", null)
    );
    const nonNullMentorsQuery = query(
      collection(database, "Mentors"),
      where("documentOf", "!=", null)
    );

    const querySnapshot = await getDocs(nonNullMenteesQuery);
    querySnapshot.forEach((doc) => {
      // Construct new data object
      const newData: HomeTableColumns = {
        id: doc.data()["documentOf"],
        avatar: "G",
        fullName: doc.data()["documentOf"],
        registeredOn: new Date(doc.data()["createdAt"].toDate()).toDateString(),
        status: doc.data()["status"],
        assignedMentor:
          doc.data()["status"] === "INCOMPLETE"
            ? "Assign a mentor"
            : doc.data()["status"] === Status.InProgress
            ? "In progress"
            : doc.data()["assignedMentor"],
        participatingAs: "Mentee",
        action:
          doc.data()["status"] === "INCOMPLETE"
            ? "Assign a mentor"
            : doc.data()["assignedMentor"],
        pairedDuring: doc.data()["pairedDuring"],
      };
      newRows.push(newData);
    });

    const querySnapshotMentor = await getDocs(nonNullMentorsQuery);
    querySnapshotMentor.forEach((doc) => {
      // Construct new data object
      const newData: HomeTableColumns = {
        id: doc.data()["documentOf"],
        avatar: "G",
        fullName: doc.data()["documentOf"],
        registeredOn: new Date(doc.data()["createdAt"].toDate()).toDateString(),
        status: doc.data()["status"],
        assignedMentor:
          doc.data()["status"] === "INCOMPLETE"
            ? "Assign a mentee"
            : doc.data()["status"] === Status.InProgress
            ? "In progress"
            : doc.data()["assignedMentor"],
        participatingAs: "Mentor",
        action:
          doc.data()["status"] === "INCOMPLETE"
            ? "Assign a mentee"
            : doc.data()["assignedMentor"],
        pairedDuring: doc.data()["pairedDuring"],
      };
      newRows.push(newData);
    });

    return Response.json(newRows);
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
}
