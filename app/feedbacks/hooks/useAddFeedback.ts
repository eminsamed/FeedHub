import { useMutation, useQueryClient } from "@tanstack/react-query"; // Import necessary hooks from React Query
import { addDoc, collection } from "firebase/firestore";
import { db } from "app/firebase/firebaseConfig"; // Import Firebase configuration

// Define the type of feedback
interface Feedback {
  feedback: string;
  rating: number;
  createdAt: any;
  user: string;
}

// Function to add feedback to Firestore
const addFeedback = async (feedback: Feedback) => {
  const docRef = await addDoc(collection(db, "feedbacks"), feedback); // Add new feedback to Firestore
  return docRef.id; // Return the ID of the newly added document
};

export const useAddFeedback = () => {
  const queryClient = useQueryClient(); // Access the query client to invalidate queries

  // useMutation: React Query hook used for data insertion
  return useMutation({
    mutationFn: addFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]); // Invalidate 'feedbacks' query after successfully adding data
    },
  });
};
