import { database } from "@/firestore/firestore";
import { Status } from "@/redux/actions/createMenteeDocument";
import { registrationForm } from "@/redux/registrationSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request, context: any) {
  try {
    const data: registrationForm = await req.json(); // Access the value of the 'param' property
    // Query Firestore to find the document matching the name and participatingAs
    try {
      const mainDocRef = await addDoc(collection(database, "Mentors"), {
        assignedMentor: "",
        createdAt: serverTimestamp(),
        documentOf: data.mentor.fullName,
        status: Status.Incomplete,
        pairedDuring: "",
      });

      const personalDetailsCollectionRef = collection(
        mainDocRef,
        "Personal Details"
      );
      await addDoc(personalDetailsCollectionRef, {
        fullName: data.mentor.fullName,
        phoneNumber: data.mentor.phoneNumber,
        emailAddress: data.mentor.emailAddress,
        gender: data.mentor.gender,
      });

      const backgroundDetailsCollectionRef = collection(
        mainDocRef,
        "Background Details"
      );
      await addDoc(backgroundDetailsCollectionRef, {
        jobTitle: data.professionalDetails.jobTitle,
        organisation: data.professionalDetails.organisation,
        specialisation: data.professionalDetails.specialisation,
      });

      // const skillsCollectionRef = collection(mainDocRef, "Skills");
      // await addDoc(skillsCollectionRef, {
      //   basicSkills: {
      //     firstBasicSoftSkill: data.skills.basicSkills.firstBasicSoftSkill,
      //     firstBasicIndustrySkill:
      //       data.skills.basicSkills.firstBasicIndustrySkill,
      //     secondBasicIndustrySkill:
      //       data.skills.basicSkills.secondBasicIndustrySkill,
      //   },
      //   expertSkills: {
      //     firstExpertSoftSkill: data.skills.expertSkills.firstExpertSoftSkill,
      //     firstExpertIndustrySkill:
      //       data.skills.expertSkills.firstExpertIndustrySkill,
      //     secondExpertIndustrySkill:
      //       data.skills.expertSkills.secondExpertIndustrySkill,
      //   },
      // });

      const preferencesRef = collection(mainDocRef, "Preferences");
      await addDoc(preferencesRef, {
        preferences: data.preferences.preferences,
        menteeType: data.preferences.menteeType,
        studentType: data.preferences.studentType,
      });

      const goalsCollectionRef = collection(mainDocRef, "Goals");
      await addDoc(goalsCollectionRef, {
        longTermGoal: data.goals.longTermGoal ? data.goals.longTermGoal : "",
        firstShortTermGoal: data.goals.firstShortTermGoal
          ? data.goals.firstShortTermGoal
          : "",
        secondShortTermGoal: data.goals.secondShortTermGoal
          ? data.goals.secondShortTermGoal
          : "",
        outcome: data.goals.outcome,
        motivation: data.goals.motivation,
      });

      const personalityTypeCollectionRef = collection(
        mainDocRef,
        "Personality Type"
      );
      await addDoc(personalityTypeCollectionRef, {
        personalityType: data.personalityType.personalityType,
      });
    } catch (error) {
      console.error("Error adding document:", error);
      throw error; // Propagate the error to stop Promise.all if any update fails
    }
    // Send a success response
    return Response.json({ message: "Successfully updated documents" });
  } catch (error) {
    throw error;
  }
}
