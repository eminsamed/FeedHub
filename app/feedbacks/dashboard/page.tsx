"use client"; // Mark as client component

import { useEffect, useState } from "react";
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
  Box,
  Pagination,
  TextField, // For editing feedback
} from "@mui/material"; // Material UI components and Pagination
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"; // Firestore functions
import { db } from "../../firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [newFeedbackText, setNewFeedbackText] = useState(""); // State to store the new feedback text
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [feedbacksPerPage] = useState(5); // Feedbacks per page

  const router = useRouter();

  // Load feedback data from Firebase Firestore
  const loadFeedbacks = async () => {
    const feedbackCollection = collection(db, "feedbacks");
    const feedbackSnapshot = await getDocs(feedbackCollection);
    const feedbackList = feedbackSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id, // Add id for deletion and editing
    }));
    setFeedbacks(feedbackList);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  // Get current feedbacks based on pagination
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

  // Open modal for feedback details or editing
  const handleClickOpen = (feedback, isEditMode = false) => {
    setSelectedFeedback(feedback);
    setEditMode(isEditMode);
    setNewFeedbackText(feedback.feedback); // Set the current feedback text for editing
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeedback(null);
    setEditMode(false);
  };

  // Delete feedback
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "feedbacks", id)); // Delete feedback from Firestore
      loadFeedbacks(); // Reload feedbacks after deletion
    } catch (error) {
      console.error("Error deleting feedback: ", error);
    }
  };

  // Update feedback
  const handleUpdate = async () => {
    if (selectedFeedback) {
      try {
        const feedbackDocRef = doc(db, "feedbacks", selectedFeedback.id);
        await updateDoc(feedbackDocRef, { feedback: newFeedbackText }); // Update feedback in Firestore
        loadFeedbacks(); // Reload feedbacks after update
        handleClose(); // Close modal after update
      } catch (error) {
        console.error("Error updating feedback: ", error);
      }
    }
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
        On this page, you can view, edit, and delete feedback.
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
            <Button size="small" color="secondary" onClick={() => handleClickOpen(fb, true)}>
              Edit
            </Button>
            <Button size="small" color="error" onClick={() => handleDelete(fb.id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* Pagination for feedbacks */}
      <Pagination count={Math.ceil(feedbacks.length / feedbacksPerPage)} page={currentPage} onChange={handlePageChange} color="primary" sx={{ marginTop: 2 }} />

      {/* Modal for viewing/editing feedback */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Feedback" : "Feedback Detail"}</DialogTitle>
        <DialogContent>
          {selectedFeedback && (
            <>
              <Typography>User: {selectedFeedback.user}</Typography>
              <Typography>Date: {selectedFeedback.date}</Typography>
              {editMode ? <TextField fullWidth value={newFeedbackText} onChange={(e) => setNewFeedbackText(e.target.value)} label="Edit Feedback" margin="normal" /> : <Typography>Feedback: {selectedFeedback.feedback}</Typography>}
              <Typography>Rating: {selectedFeedback.rating}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {editMode ? (
            <Button onClick={handleUpdate} color="primary">
              Save
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>

      {/* Add new feedback button */}
      <Button variant="contained" color="primary" onClick={() => router.push("/feedbacks/add")} sx={{ marginTop: 2 }}>
        Add New Feedback
      </Button>
    </Box>
  );
}
