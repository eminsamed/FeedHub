"use client"; // Client-side component

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "app/firebase/firebaseConfig";
import { Box, Typography, Card, CardContent, TextField, Button, Rating } from "@mui/material";
import { useAddFeedback } from "../hooks/useAddFeedback"; // Import the custom hook for adding feedback

export default function Page() {
  const [rating, setRating] = useState<number | null>(0);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state for form submission

  const { mutate } = useAddFeedback(); // Using the custom hook to add feedback

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
      alert("Feedback submitted successfully!");
      // Clear form after submission
      setRating(0);
      setFeedbackText("");
    } catch (error: any) {
      console.error("Error adding feedback:", error.message);
      alert("Error submitting feedback. Please try again.");
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
    </Box>
  );
}
