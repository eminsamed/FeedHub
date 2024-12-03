"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase/firebaseConfig";

/**
 * Custom hook to get the current authenticated user
 * @returns {user | null} - The authenticated user object or null if no user is signed in
 */

export function useUser() {
  const [user, setUser] = (useState < User) | (null > null); // Initial state with proper typing
  const [error, setError] = (useState < string) | (null > null); // Optional error handling state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (authUser) => {
        setUser(authUser);
        setError(null); // Reset error if user is found
      },
      (err) => {
        console.error("Error in onAuthStateChanged:", err);
        setError("Failed to fetch user.");
      }
    );

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (error) {
    console.warn(error); // Log the error for debugging
  }

  return user;
}
