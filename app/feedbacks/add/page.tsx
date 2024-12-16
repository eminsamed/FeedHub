"use client"; // Client-side component

import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, TextField, Button, Rating } from "@mui/material";
import { useAddFeedback } from "../hooks/useAddFeedback"; // Import the custom hook for adding feedback
import { useAuth } from "app/context/auth-context"; // Import AuthContext for managing user authentication
import { useRouter } from "next/navigation"; // Import Next.js router for navigation
import { ToastContainer, toast } from "react-toastify"; // Importing Toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Importing Toastify styles

export default function Page() {
  const { user } = useAuth(); // Get user from AuthContext
  const router = useRouter(); // Hook to handle routing

  // If no user is logged in, redirect to login page
  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login page if user is not logged in
    }
  }, [user, router]);

  const [rating, setRating] = useState<number | null>(0);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state for form submission

  const { mutate } = useAddFeedback(); // Using the custom hook to add feedback

  // Success notification function
  const notifySuccess = () => {
    toast.success("Feedback submitted successfully!", {
      position: "top-center", // Use string instead of the object
      autoClose: 5000, // Auto close after 5 seconds
      hideProgressBar: true, // Hide progress bar
      theme: "colored", // Use a colored theme
      style: {
        backgroundColor: "#4caf50", // Green color for success
        color: "white",
        borderRadius: "8px",
        padding: "10px",
        fontWeight: "bold",
      },
    });
  };

  // Error notification function
  const notifyError = () => {
    toast.error("Error submitting feedback. Please try again.", {
      position: "top-center", // Use string instead of the object
      autoClose: 5000,
      hideProgressBar: true,
      theme: "colored",
      style: {
        backgroundColor: "#f44336", // Red color for error
        color: "white",
        borderRadius: "8px",
        padding: "10px",
        fontWeight: "bold",
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation: Ensure both rating and feedback are provided
    if (!rating || feedbackText.trim() === "") {
      alert("Please provide a rating and feedback.");
      return;
    }

    setLoading(true); // Set loading state to true

    // Prepare feedback data
    const feedback = {
      rating,
      feedback: feedbackText,
      createdAt: new Date(),
    };

    try {
      await mutate(feedback); // Use the hook to add feedback
      notifySuccess(); // Show success notification
      // Clear form after submission
      setRating(0);
      setFeedbackText("");
    } catch (error: any) {
      console.error("Error adding feedback:", error.message);
      notifyError(); // Show error notification
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 600, width: "100%", padding: 4 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                color: "primary.main", // Primary color for heading
                fontWeight: "bold", // Bold font for heading
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)", // Subtle text shadow
              }}
            >
              Send Feedback
            </Typography>
            <Typography variant="body1" gutterBottom textAlign="center">
              Share your feedback and rate your experience.
            </Typography>
          </Box>

          {/* Form container */}
          <Box component="form" onSubmit={handleSubmit} mt={3} display="flex" flexDirection="column" alignItems="center">
            {/* Star Rating */}
            <Box mb={3} display="flex" flexDirection="column" alignItems="center">
              <Typography component="legend">Rating (1-5 stars)</Typography>
              <Rating name="feedback-rating" value={rating} size="large" onChange={(event, newValue) => setRating(newValue)} />
            </Box>

            {/* Feedback Input */}
            <TextField label="Your Feedback" multiline rows={4} fullWidth variant="outlined" value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Enter your feedback" sx={{ mb: 3 }} />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Toast Notifications container */}
      <ToastContainer />
    </Box>
  );
}
