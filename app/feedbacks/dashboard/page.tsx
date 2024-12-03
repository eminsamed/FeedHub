"use client"; // Client component

import { useEffect, useState } from "react";
import { Typography, Button, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, Box, Pagination, TextField, MenuItem, Select } from "@mui/material";
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
  const { logout } = useAuth();

  const loadFeedbacks = async () => {
    try {
      const feedbackCollection = collection(db, "feedbacks");
      const feedbackSnapshot = await getDocs(feedbackCollection);
      const feedbackList = feedbackSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        date: doc.data().createdAt ? new Date(doc.data().createdAt.seconds * 1000).toLocaleDateString() : "N/A",
      }));
      setFeedbacks(feedbackList);
    } catch (error) {
      console.error("Error loading feedbacks:", error);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const getFilteredSortedFeedbacks = () => {
    let filteredFeedbacks = [...feedbacks];

    if (filterBy === "highRating") {
      filteredFeedbacks = filteredFeedbacks.filter((fb) => fb.rating >= 4);
    } else if (filterBy === "lowRating") {
      filteredFeedbacks = filteredFeedbacks.filter((fb) => fb.rating < 4);
    }

    if (sortOrder === "asc") {
      filteredFeedbacks.sort((a, b) => a.rating - b.rating);
    } else {
      filteredFeedbacks.sort((a, b) => b.rating - a.rating);
    }

    return filteredFeedbacks;
  };

  const currentFeedbacks = getFilteredSortedFeedbacks().slice((currentPage - 1) * feedbacksPerPage, currentPage * feedbacksPerPage);

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await deleteDoc(doc(db, "feedbacks", id));
        loadFeedbacks();
        alert("Feedback deleted successfully.");
      } catch (error) {
        console.error("Error deleting feedback:", error);
      }
    }
  };

  const handleUpdate = async () => {
    if (!selectedFeedback) return;

    try {
      const feedbackDocRef = doc(db, "feedbacks", selectedFeedback.id);
      await updateDoc(feedbackDocRef, { feedback: newFeedbackText });
      loadFeedbacks();
      handleClose();
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </Box>

      <Typography variant="body1" gutterBottom>
        On this page, you can view and manage feedback.
      </Typography>

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

      {currentFeedbacks.map((fb) => (
        <Card key={fb.id} variant="outlined" sx={{ marginBottom: 2 }}>
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
            <Button size="small" onClick={() => handleClickOpen(fb)}>
              View
            </Button>
            <Button size="small" onClick={() => handleClickOpen(fb, true)}>
              Edit
            </Button>
            <Button size="small" onClick={() => handleDelete(fb.id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}

      <Pagination count={Math.ceil(getFilteredSortedFeedbacks().length / feedbacksPerPage)} page={currentPage} onChange={handlePageChange} color="primary" sx={{ marginTop: 2 }} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Feedback" : "Feedback Details"}</DialogTitle>
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
          <Button onClick={handleClose}>Cancel</Button>
          {editMode && <Button onClick={handleUpdate}>Save</Button>}
        </DialogActions>
      </Dialog>

      <Button variant="contained" onClick={() => router.push("/feedbacks/add")} sx={{ marginTop: 2 }}>
        Add New Feedback
      </Button>
    </Box>
  );
}
