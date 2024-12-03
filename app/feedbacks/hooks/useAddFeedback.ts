import { useMutation, useQueryClient } from "@tanstack/react-query"; // Import necessary hooks from React Query
import { addDoc, collection } from "firebase/firestore";
import { db } from "app/firebase/firebaseConfig"; // Import Firebase configuration
import { useAuth } from "app/context/auth-context"; // Import the useAuth hook to access the authenticated user

// Define the type of feedback
interface Feedback {
  feedback: string;
  rating: number;
  createdAt: any;
  user: string; // User's email address will be included in the feedback object
}

// Function to add feedback to Firestore
const addFeedback = async (feedback: Feedback) => {
  const docRef = await addDoc(collection(db, "feedbacks"), feedback); // Add new feedback to Firestore
  return docRef.id; // Return the ID of the newly added document
};

// Custom hook to handle feedback submission
export const useAddFeedback = () => {
  const queryClient = useQueryClient(); // Access the query client to invalidate queries after mutation
  const { user } = useAuth(); // Get the current authenticated user

  // useMutation: React Query hook used for data insertion
  return useMutation({
    mutationFn: async (feedback: Feedback) => {
      // Add the user's email to the feedback before submitting to Firestore
      const feedbackWithUser = {
        ...feedback,
        user: user?.email || "Anonymous", // If the user is authenticated, use their email, otherwise mark as "Anonymous"
      };
      return await addFeedback(feedbackWithUser); // Call addFeedback to insert the feedback
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]); // Invalidate 'feedbacks' query after successfully adding data
    },
  });
};
