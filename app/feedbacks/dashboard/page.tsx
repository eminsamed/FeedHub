"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Importing Firebase config
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material"; // Importing Material UI components

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

    // Calculate total feedback count and average rating
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
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {/* Feedback table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render feedbacks dynamically */}
            {feedbacks.map((fb, index) => (
              <TableRow key={index}>
                <TableCell>{fb.date}</TableCell>
                <TableCell>{fb.user}</TableCell>
                <TableCell>{fb.feedback}</TableCell>
                <TableCell>{fb.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Display statistics */}
      <Typography variant="body1" gutterBottom>
        Total Feedbacks: {totalFeedbacks}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Average Rating: {averageRating}
      </Typography>

      {/* Button to add new feedback */}
      <Button variant="contained" color="primary" onClick={() => router.push("/feedbacks/add")}>
        Add New Feedback
      </Button>
    </div>
  );
}
