"use client"; // Client component

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
  TextField,
  MenuItem, // For filter and sort options
  Select, // Material UI Select component
} from "@mui/material";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context"; // Import AuthContext

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newFeedbackText, setNewFeedbackText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbacksPerPage] = useState(5);
  const [filterBy, setFilterBy] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const router = useRouter();
  const { logout } = useAuth(); // Use the logout function from AuthContext

  // Load feedback data from Firebase Firestore
  // Load feedback data from Firebase Firestore
  const loadFeedbacks = async () => {
    const feedbackCollection = collection(db, "feedbacks");
    const feedbackSnapshot = await getDocs(feedbackCollection);
    const feedbackList = feedbackSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        date: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : "N/A", // Format the date if available
      };
    });
    setFeedbacks(feedbackList);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  // Apply filter and sorting
  const getFilteredSortedFeedbacks = () => {
    let filteredFeedbacks = [...feedbacks];

    // Filter feedbacks
    if (filterBy === "highRating") {
      filteredFeedbacks = filteredFeedbacks.filter((fb) => fb.rating >= 4);
    } else if (filterBy === "lowRating") {
      filteredFeedbacks = filteredFeedbacks.filter((fb) => fb.rating < 4);
    }

    // Sort feedbacks
    if (sortOrder === "asc") {
      filteredFeedbacks.sort((a, b) => a.rating - b.rating);
    } else {
      filteredFeedbacks.sort((a, b) => b.rating - a.rating);
    }

    return filteredFeedbacks;
  };

  // Get current feedbacks based on pagination
  const currentFeedbacks = getFilteredSortedFeedbacks().slice((currentPage - 1) * feedbacksPerPage, currentPage * feedbacksPerPage);

  // Open modal for feedback details or editing
  const handleClickOpen = (feedback, isEditMode = false) => {
    setSelectedFeedback(feedback);
    setEditMode(isEditMode);
    setNewFeedbackText(feedback.feedback);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeedback(null);
    setEditMode(false);
  };

  // Delete feedback with confirmation
  const handleDelete = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this feedback?");
    if (userConfirmed) {
      try {
        await deleteDoc(doc(db, "feedbacks", id));
        loadFeedbacks();
        alert("Feedback deleted successfully.");
      } catch (error) {
        console.error("Error deleting feedback: ", error);
        alert("An error occurred while deleting the feedback.");
      }
    }
  };

  // Update feedback
  const handleUpdate = async () => {
    if (selectedFeedback) {
      try {
        const feedbackDocRef = doc(db, "feedbacks", selectedFeedback.id);
        await updateDoc(feedbackDocRef, { feedback: newFeedbackText });
        loadFeedbacks();
        handleClose();
      } catch (error) {
        console.error("Error updating feedback: ", error);
      }
    }
  };

  // Handle page change for pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        {/* Logout Button */}
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </Box>

      <Typography variant="body1" gutterBottom>
        On this page, you can view, edit, and delete feedback.
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
      <Pagination count={Math.ceil(getFilteredSortedFeedbacks().length / feedbacksPerPage)} page={currentPage} onChange={handlePageChange} color="primary" sx={{ marginTop: 2 }} />

      {/* Modal for viewing/editing feedback */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Feedback" : "Feedback Detail"}</DialogTitle>
        <DialogContent>
          {selectedFeedback && (
            <>
              <Typography>User: {selectedFeedback.user}</Typography>
              <Typography>Date: {selectedFeedback.date}</Typography> {/* Displaying the formatted date */}
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
