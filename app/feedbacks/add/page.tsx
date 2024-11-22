"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import { Box, Typography, Card, CardContent, TextField, Button, Rating } from "@mui/material";

export default function Page() {
  // State to store the selected star rating
  const [rating, setRating] = useState<number | null>(0);
  // State to store the feedback text
  const [feedbackText, setFeedbackText] = useState<string>("");

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Validation: Ensure both rating and feedback are provided
    if (rating === 0 || feedbackText === "") {
      alert("Please provide a rating and feedback.");
    } else {
      // Add feedback to Firebase Firestore
      try {
        await addDoc(collection(db, "feedbacks"), {
          rating: rating,
          feedback: feedbackText,
          createdAt: new Date(),
        });
        alert(`Feedback submitted successfully!`);
        // Clear form after submission
        setRating(0);
        setFeedbackText("");
      } catch (error) {
        console.error("Error adding feedback: ", error);
        alert("Error submitting feedback.");
      }
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
                color: "primary.main", // Renk düzeni
                fontWeight: "bold", // Kalın yazı stili
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)", // Yazı gölgesi azaltıldı
              }}
            >
              Send Feedback
            </Typography>
            <Typography variant="body1" gutterBottom textAlign="center">
              On this page, you can submit your feedback, rate your experience, and provide detailed comments.
            </Typography>
          </Box>

          {/* Form container with flex */}
          <Box component="form" onSubmit={handleSubmit} mt={3} display="flex" flexDirection="column" alignItems="center">
            {/* Star Rating */}
            <Box mb={3} display="flex" flexDirection="column" alignItems="center">
              <Typography component="legend">Rating (1-5 stars)</Typography>
              <Rating name="simple-controlled" value={rating} size="large" onChange={(event, newValue) => setRating(newValue)} />
            </Box>

            {/* Feedback Input */}
            <TextField label="Your Feedback" multiline rows={4} fullWidth variant="outlined" value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Enter your feedback" sx={{ mb: 3 }} />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
