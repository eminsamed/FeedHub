"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Importing Firebase config
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const router = useRouter(); // Initialize useRouter

  // Function to load feedback data from Firebase (Firestore)
  const loadFeedbacks = async () => {
    const feedbackCollection = collection(db, "feedbacks"); // Collection name from Firestore
    const feedbackSnapshot = await getDocs(feedbackCollection);
    const feedbackList = feedbackSnapshot.docs.map((doc) => doc.data());

    // Set the feedback data into the state
    setFeedbacks(feedbackList);

    // Calculate the total number of feedbacks and the average rating
    const total = feedbackList.length;
    const avgRating = feedbackList.reduce((sum, fb) => sum + Number(fb.rating), 0) / total;

    setTotalFeedbacks(total);
    setAverageRating(avgRating.toFixed(1));
  };

  // Run this function when the component is first rendered
  useEffect(() => {
    loadFeedbacks();
  }, []);

  return (
    <div>
      <h1 className="text-5xl mb-5">Dashboard</h1>

      {/* Table to display feedbacks */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Feedback</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody id="feedbackTableBody">
          {/* Render feedbacks dynamically */}
          {feedbacks.map((fb, index) => (
            <tr key={index}>
              <td>{fb.date}</td>
              <td>{fb.user}</td>
              <td>{fb.feedback}</td>
              <td>{fb.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display statistics */}
      <div>
        <p>Total Feedbacks: {totalFeedbacks}</p>
        <p>Average Rating: {averageRating}</p>
      </div>

      {/* Button to add a new feedback */}
      <button
        id="addFeedbackBtn"
        onClick={() => router.push("/feedbacks/add")} // Use router.push to navigate to the feedback form page
      >
        Add New Feedback
      </button>
    </div>
  );
}
