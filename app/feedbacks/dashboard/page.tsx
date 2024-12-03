"use client"; // Client-side component

import { useEffect, useState } from "react";
import { Typography, Button, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, Box, Pagination, TextField, MenuItem, Select, Rating } from "@mui/material";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { useAuth } from "app/context/auth-context"; // Import AuthContext for managing user authentication

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newFeedbackText, setNewFeedbackText] = useState("");
  const [newRating, setNewRating] = useState(0); // New state for rating
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbacksPerPage] = useState(5);
  const [filterBy, setFilterBy] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const router = useRouter();
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext

  // Check if user is logged in and redirect to login if not
  useEffect(() => {
    if (!user) {
      router.push("/login"); // If no user is logged in, redirect to login page
    }
  }, [user, router]);

  // Fetch feedbacks from Firebase Firestore
  const loadFeedbacks = async () => {
    try {
      const feedbackCollection = collection(db, "feedbacks"); // Reference to 'feedbacks' collection
      const feedbackSnapshot = await getDocs(feedbackCollection); // Fetch feedback documents
      const feedbackList = feedbackSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        date: doc.data().createdAt ? new Date(doc.data().createdAt.seconds * 1000).toLocaleDateString() : "N/A", // Format date if exists
      }));
      setFeedbacks(feedbackList);
    } catch (error) {
      console.error("Error loading feedbacks:", error); // Log error if fetching fails
    }
  };

  useEffect(() => {
    loadFeedbacks(); // Load feedbacks when the component mounts
  }, []);

  // Filter and sort the feedbacks based on selected criteria
  const getFilteredSortedFeedbacks = () => {
    let filteredFeedbacks = [...feedbacks];

    if (filterBy === "highRating") {
      filteredFeedbacks = filteredFeedbacks.filter((fb) => fb.rating >= 4); // Filter high ratings
    } else if (filterBy === "lowRating") {
      filteredFeedbacks = filteredFeedbacks.filter((fb) => fb.rating < 4); // Filter low ratings
    }

    if (sortOrder === "asc") {
      filteredFeedbacks.sort((a, b) => a.rating - b.rating); // Sort by ascending rating
    } else {
      filteredFeedbacks.sort((a, b) => b.rating - a.rating); // Sort by descending rating
    }

    return filteredFeedbacks;
  };

  // Pagination: Get the feedbacks to display on the current page
  const currentFeedbacks = getFilteredSortedFeedbacks().slice((currentPage - 1) * feedbacksPerPage, currentPage * feedbacksPerPage);

  // Open dialog to view or edit feedback
  const handleClickOpen = (feedback, isEditMode = false) => {
    setSelectedFeedback(feedback);
    setEditMode(isEditMode);
    setNewFeedbackText(feedback.feedback);
    setNewRating(feedback.rating); // Set the selected rating
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeedback(null);
    setEditMode(false);
  };

  // Handle feedback deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      // Confirm before deleting
      try {
        await deleteDoc(doc(db, "feedbacks", id)); // Delete feedback document from Firestore
        loadFeedbacks(); // Reload feedbacks after deletion
        alert("Feedback deleted successfully."); // Notify user on success
      } catch (error) {
        console.error("Error deleting feedback:", error); // Log error if deletion fails
      }
    }
  };

  // Handle feedback update
  const handleUpdate = async () => {
    if (!selectedFeedback) return; // Return if no feedback is selected

    try {
      const feedbackDocRef = doc(db, "feedbacks", selectedFeedback.id); // Reference the selected feedback document
      await updateDoc(feedbackDocRef, {
        feedback: newFeedbackText, // Update feedback text
        rating: newRating, // Update rating
      });
      loadFeedbacks(); // Reload feedbacks after update
      handleClose(); // Close the dialog
    } catch (error) {
      console.error("Error updating feedback:", error); // Log error if update fails
    }
  };

  // Handle page change in pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout(); // Log out the user using the AuthContext
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error); // Log error if logout fails
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Dashboard header with logout button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </Box>

      <Typography variant="body1" gutterBottom>
        On this page, you can view and manage feedback.
      </Typography>

      {/* Filter and Sort options */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <Box>
          <Typography variant="subtitle1">Filter By</Typography>
          <Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)} fullWidth>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="highRating">High Rating (4+)</MenuItem>
            <MenuItem value="lowRating">Low Rating (Below 4)</MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography variant="subtitle1">Sort Order</Typography>
          <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} fullWidth>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Render feedback cards */}
      {currentFeedbacks.map((fb) => (
        <Card key={fb.id} variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="body2" sx={{ fontSize: "1rem" }}>
              {fb.user} {/* Here, the font size of the user's email is smaller */}
            </Typography>
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
            <Button size="small" sx={{ color: "red" }} onClick={() => handleDelete(fb.id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* Pagination */}
      <Pagination count={Math.ceil(getFilteredSortedFeedbacks().length / feedbacksPerPage)} page={currentPage} onChange={handlePageChange} color="primary" sx={{ marginTop: 2 }} />

      {/* Feedback detail dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Feedback" : "Feedback Details"}</DialogTitle>
        <DialogContent>
          {selectedFeedback && (
            <>
              <Typography>User: {selectedFeedback.user}</Typography>
              <Typography>Date: {selectedFeedback.date}</Typography>
              {editMode ? (
                <>
                  <TextField fullWidth value={newFeedbackText} onChange={(e) => setNewFeedbackText(e.target.value)} label="Edit Feedback" margin="normal" />
                  {/* Rating control */}
                  <Box sx={{ marginTop: 2 }}>
                    <Typography>Rating:</Typography>
                    <Rating value={newRating} onChange={(e, newValue) => setNewRating(newValue)} /> {/* Rating selector */}
                  </Box>
                </>
              ) : (
                <Typography>Feedback: {selectedFeedback.feedback}</Typography>
              )}
              <Typography>Rating: {selectedFeedback.rating}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {editMode && <Button onClick={handleUpdate}>Save</Button>}
        </DialogActions>
      </Dialog>

      {/* Add new feedback button */}
      <Button variant="contained" onClick={() => router.push("/feedbacks/add")} sx={{ marginTop: 2 }}>
        Add New Feedback
      </Button>
    </Box>
  );
}
