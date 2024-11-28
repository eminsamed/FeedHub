import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Import Firestore db connection

const checkUserAccess = async (appId: string, userId: string) => {
  try {
    // Reference to the application document
    const appRef = doc(db, "applications", appId);
    const appDoc = await getDoc(appRef);

    if (appDoc.exists()) {
      const appData = appDoc.data();
      // Check if the user has access to the application
      if ((appData.users && appData.users[userId]) || (appData.owners && appData.owners[userId])) {
        console.log("User has access permission.");
        // Optional: Redirect to the allowed page
        // router.push("/allowed-page");
      } else {
        console.warn("User does not have access permission.");
        // Optional: Redirect to an error page
        // router.push("/access-denied");
      }
    } else {
      console.error("Application not found.");
      // Optional: Redirect to an error page
      // router.push("/application-not-found");
    }
  } catch (error) {
    console.error("Error during access check:", error);
  }
};

export { checkUserAccess };
