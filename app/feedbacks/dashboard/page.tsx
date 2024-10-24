"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"; // Material UI components
import { collection, getDocs } from "firebase/firestore"; // Firestore to retrieve feedback data
import { db } from "../../firebase/firebaseConfig"; // Firebase configuration

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]); // State to hold feedback data
  const [open, setOpen] = useState(false); // State to control modal open/close
  const [selectedFeedback, setSelectedFeedback] = useState(null); // State to hold the selected feedback

  // Function to load feedback data from Firebase Firestore
  const loadFeedbacks = async () => {
    const feedbackCollection = collection(db, "feedbacks"); // Accessing the "feedbacks" collection in Firestore
    const feedbackSnapshot = await getDocs(feedbackCollection); // Fetching all documents in the collection
    const feedbackList = feedbackSnapshot.docs.map((doc) => doc.data()); // Mapping each document to its data
    setFeedbacks(feedbackList); // Setting the fetched feedback data into the state
  };

  // Run the loadFeedbacks function once the component is mounted
  useEffect(() => {
    loadFeedbacks();
  }, []); // The empty array ensures this runs only once on mount

  // Function to open the modal and set the selected feedback
  const handleClickOpen = (feedback) => {
    setSelectedFeedback(feedback); // Setting the feedback that was clicked
    setOpen(true); // Opening the modal dialog
  };

  // Function to close the modal and reset the selected feedback
  const handleClose = () => {
    setOpen(false); // Closing the modal dialog
    setSelectedFeedback(null); // Resetting the selected feedback
  };

  return (
    <div>
      {/* Dashboard title */}
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {/* Displaying feedbacks as cards */}
      {feedbacks.map((fb, index) => (
        <Card key={index} variant="outlined" style={{ marginBottom: "16px" }}>
          <CardContent>
            {/* Display user information */}
            <Typography variant="h6">{fb.user}</Typography>
            <Typography variant="body2" color="textSecondary">
              {fb.date}
            </Typography>
            {/* Display the feedback content */}
            <Typography variant="body1">{fb.feedback}</Typography>
            {/* Display the rating */}
            <Typography variant="body2" color="textSecondary">
              Rating: {fb.rating}
            </Typography>
          </CardContent>
          <CardActions>
            {/* View button to open the modal and show feedback details */}
            <Button size="small" color="primary" onClick={() => handleClickOpen(fb)}>
              View
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* Modal (Dialog) to show the selected feedback details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Feedback Detail</DialogTitle>
        <DialogContent>
          {selectedFeedback && (
            <>
              {/* Display the selected feedback details inside the modal */}
              <Typography>User: {selectedFeedback.user}</Typography>
              <Typography>Date: {selectedFeedback.date}</Typography>
              <Typography>Feedback: {selectedFeedback.feedback}</Typography>
              <Typography>Rating: {selectedFeedback.rating}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {/* Button to close the modal */}
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
