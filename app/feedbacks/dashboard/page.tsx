"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Importing Firebase config
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Box, Typography, Button, Card, CardContent, CardActions } from "@mui/material"; // Import Flexbox and Material UI components

export default function Dashboard() {
  // State to store feedbacks
  const [feedbacks, setFeedbacks] = useState([]);
  // State to store total feedback count
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  // State to store average rating
  const [averageRating, setAverageRating] = useState(0);
  // Initialize useRouter for navigation
  const router = useRouter();

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

    // Update states for total feedback and average rating
    setTotalFeedbacks(total);
    setAverageRating(avgRating.toFixed(1));
  };

  // Load feedbacks when the component mounts
  useEffect(() => {
    loadFeedbacks();
  }, []);

  return (
    <Box>
      {/* Title for the dashboard */}
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {/* Flexbox container to display feedback cards */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {/* Mapping through the feedbacks and displaying them in cards */}
        {feedbacks.map((fb, index) => (
          <Box key={index} flex="1 1 calc(33.333% - 16px)" minWidth="300px">
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {fb.user} {/* Displaying the user's name */}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {fb.date} {/* Displaying the feedback date */}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {fb.feedback} {/* Displaying the feedback content */}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Rating: {fb.rating} {/* Displaying the feedback rating */}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Display statistics */}
      <Typography variant="body1" gutterBottom>
        Total Feedbacks: {totalFeedbacks} {/* Total number of feedbacks */}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Average Rating: {averageRating} {/* Average feedback rating */}
      </Typography>

      {/* Button to add new feedback */}
      <Button variant="contained" color="primary" onClick={() => router.push("/feedbacks/add")}>
        Add New Feedback {/* Button to navigate to the feedback add page */}
      </Button>
    </Box>
  );
}
