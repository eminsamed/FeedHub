"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore"; // Importing necessary Firebase functions
import { db } from "@/app/firebase/firebaseConfig"; // Importing Firebase config

export default function Page() {
  // State to store the selected star rating
  const [rating, setRating] = useState<number>(0);
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
          createdAt: new Date(), // Add timestamp
        });
        alert(`Feedback submitted successfully!\nRating: ${rating}\nFeedback: ${feedbackText}`);
        // Clear form after submission
        setRating(0);
        setFeedbackText("");
      } catch (error) {
        console.error("Error adding feedback: ", error);
        alert("Error submitting feedback.");
      }
    }
  };

  // Function to handle star rating click
  const handleStarClick = (value: number) => {
    setRating(value); // Set the selected star rating
  };

  return (
    <div className="feedback-container">
      <h2>Send Feedback</h2>
      {/* Feedback form */}
      <form id="feedbackForm" onSubmit={handleSubmit}>
        {/* Star rating input */}
        <div className="form-group">
          <label htmlFor="rating">Rating (1-5 stars)</label>
          <div id="starRating" className="stars">
            {/* Display stars dynamically and handle clicks */}
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`star ${rating >= value ? "selected" : ""}`}
                onClick={() => handleStarClick(value)} // Update rating on click
              >
                ★
              </span>
            ))}
          </div>
          {/* Hidden input to store the selected rating value */}
          <input type="hidden" id="rating" name="rating" value={rating} />
        </div>

        {/* Feedback text input */}
        <div className="form-group">
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            rows={5}
            placeholder="Enter your feedback"
            value={feedbackText} // Bind input value to feedbackText state
            onChange={(e) => setFeedbackText(e.target.value)} // Update feedbackText on change
          />
        </div>

        {/* Submit button */}
        <div className="form-group">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
