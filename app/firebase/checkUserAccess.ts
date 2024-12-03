import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Import Firestore db connection

/**
 * Checks if a user has access to a specific application.
 * @param appId - The ID of the application.
 * @param userId - The ID of the user.
 * @returns {Promise<boolean>} - Returns true if the user has access, otherwise false.
 */
const checkUserAccess = async (appId: string, userId: string): Promise<boolean> => {
  try {
    // Reference to the application document
    const appRef = doc(db, "applications", appId);
    const appDoc = await getDoc(appRef);

    if (!appDoc.exists()) {
      console.error("Application not found.");
      return false; // Application not found
    }

    const appData = appDoc.data();

    // Check if the user has access
    const hasAccess = (appData?.users && appData.users[userId]) || (appData?.owners && appData.owners[userId]);

    if (hasAccess) {
      console.log("User has access permission.");
      return true; // User has access
    } else {
      console.warn("User does not have access permission.");
      return false; // User does not have access
    }
  } catch (error) {
    console.error("Error during access check:", error);
    return false; // Default to no access on error
  }
};

export { checkUserAccess };
