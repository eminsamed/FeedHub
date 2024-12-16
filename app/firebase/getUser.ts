import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "app/firebase/firebaseConfig";
import { User } from "firebase/auth"; // Import the User type

export function useUser() {
  const [user, setUser] = useState<User | null>(null); // Correctly typed state
  const [error, setError] = useState<string | null>(null); // Optional error handling state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (authUser) => {
        setUser(authUser); // If user is found
        setError(null); // Reset error
      },
      (err) => {
        console.error("Error in onAuthStateChanged:", err);
        setError("Failed to fetch user."); // Handle error
      }
    );

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  if (error) {
    console.warn(error); // Log the error if it occurs
  }

  return user; // Return the current user
}
