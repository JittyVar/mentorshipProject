import { database } from "@/firestore/firestore";
import { Status } from "@/redux/actions/createMenteeDocument";
import { registrationForm } from "@/redux/registrationSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request, context: any) {
  try {
    const data: registrationForm = await req.json(); // Access the value of the 'param' property
    // Query Firestore to find the document matching the name and participatingAs
    try {
      const mainDocRef = await addDoc(collection(database, "Mentees"), {
        assignedMentor: "",
        createdAt: serverTimestamp(),
        documentOf: data.mentee.fullName,
        status: Status.Incomplete,
        pairedDuring: "",
      });

      const personalDetailsCollectionRef = collection(
        mainDocRef,
        "Personal Details"
      );
      await addDoc(personalDetailsCollectionRef, {
        fullName: data.mentee.fullName,
        age: data.mentee.age ? data.mentee.age : 0,
        phoneNumber: data.mentee.phoneNumber,
        emailAddress: data.mentee.emailAddress,
        currentStage:
          data.mentee.currentStage == undefined
            ? null
            : data.mentee.currentStage,
      });

      // const backgroundDetailsCollectionRef = collection(
      //   mainDocRef,
      //   "Background Details"
      // );
      // await addDoc(backgroundDetailsCollectionRef, {
      //   programs: data.educationalBackground.programs,
      //   majors: data.educationalBackground.majors,
      //   yearOfDegree: data.educationalBackground.yearOfDegree,
      // });

      // const menteePreferencesCollectionRef = collection(
      //   mainDocRef,
      //   "Preferences"
      // );
      // await addDoc(menteePreferencesCollectionRef, {
      //   preferences: data.preferences.preferences,
      //   stemSector: data.preferences.stemSector,
      // });

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

      // const goalsCollectionRef = collection(mainDocRef, "Goals");
      // await addDoc(goalsCollectionRef, {
      //   longTermGoal: data.goals.longTermGoal ? data.goals.longTermGoal : "",
      //   firstShortTermGoal: data.goals.firstShortTermGoal
      //     ? data.goals.firstShortTermGoal
      //     : "",
      //   secondShortTermGoal: data.goals.secondShortTermGoal
      //     ? data.goals.secondShortTermGoal
      //     : "",
      //   outcome: data.goals.outcome,
      // });

      // const personalityTypeCollectionRef = collection(
      //   mainDocRef,
      //   "Personality Type"
      // );
      // await addDoc(personalityTypeCollectionRef, {
      //   personalityType: data.personalityType.personalityType,
      // });
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
