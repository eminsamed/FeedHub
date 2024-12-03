import { useQuery } from "@tanstack/react-query"; // Import useQuery from React Query to fetch data
import { collection, getDocs } from "firebase/firestore"; // Firebase Firestore functions
import { db } from "app/firebase/firebaseConfig"; // Firebase configüration

// Define the type for a feedback object
interface Feedback {
  id: string; // Unique identifier for each feedback
  feedback: string; // The content of the feedback
  rating: number; // Rating for the feedback (e.g., 1 to 5 stars)
  createdAt: any; // Date when the feedback was created (use any for now as Firestore stores it as a timestamp)
  user: string; // User who gave the feedback
}

// Function to fetch feedbacks
const fetchFeedbacks = async (): Promise<Feedback[]> => {
  const feedbackCollection = collection(db, "feedbacks"); // Reference the 'feedbacks' collection in Firestore
  const feedbackSnapshot = await getDocs(feedbackCollection); // Fetch documents from the collection
  return feedbackSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id, // Add document ID
  })) as Feedback[]; // Return the feedback data with proper types
};

// Custom hook to fetch feedbacks using React Query
export const useFeedbacks = () => {
  return useQuery<Feedback[], Error>(["feedbacks"], fetchFeedbacks); // Use React Query's useQuery hook to fetch the data with types
};
