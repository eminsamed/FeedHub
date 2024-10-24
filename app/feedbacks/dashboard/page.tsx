"use client";

import { useEffect, useState } from "react";
import { Typography, Button, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, Box, Pagination } from "@mui/material"; // Material UI components and Pagination
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [feedbacksPerPage] = useState(5); // Feedbacks per page

  const router = useRouter();

  // Load feedback data from Firebase Firestore
  const loadFeedbacks = async () => {
    const feedbackCollection = collection(db, "feedbacks");
    const feedbackSnapshot = await getDocs(feedbackCollection);
    const feedbackList = feedbackSnapshot.docs.map((doc) => doc.data());
    setFeedbacks(feedbackList);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  // Get current feedbacks based on pagination
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

  // Open modal for feedback details
  const handleClickOpen = (feedback) => {
    setSelectedFeedback(feedback);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeedback(null);
  };

  // Handle page change for pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Typography variant="body1" gutterBottom>
        On this page, you can view user feedback, see statistics such as total feedback count and average rating, and manage feedback.
      </Typography>

      {/* Feedback Cards */}
      {currentFeedbacks.map((fb, index) => (
        <Card key={index} variant="outlined" sx={{ marginBottom: "16px" }}>
          <CardContent>
            <Typography variant="h6">{fb.user}</Typography>
            <Typography variant="body2" color="textSecondary">
              {fb.date}
            </Typography>
            <Typography variant="body1">{fb.feedback}</Typography>
            <Typography variant="body2" color="textSecondary">
              Rating: {fb.rating}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={() => handleClickOpen(fb)}>
              View
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* Pagination for feedbacks */}
      <Pagination count={Math.ceil(feedbacks.length / feedbacksPerPage)} page={currentPage} onChange={handlePageChange} color="primary" sx={{ marginTop: 2 }} />

      {/* Modal for feedback details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Feedback Detail</DialogTitle>
        <DialogContent>
          {selectedFeedback && (
            <>
              <Typography>User: {selectedFeedback.user}</Typography>
              <Typography>Date: {selectedFeedback.date}</Typography>
              <Typography>Feedback: {selectedFeedback.feedback}</Typography>
              <Typography>Rating: {selectedFeedback.rating}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add new feedback button */}
      <Button variant="contained" color="primary" onClick={() => router.push("/feedbacks/add")} sx={{ marginTop: 2 }}>
        Add New Feedback
      </Button>
    </Box>
  );
}
