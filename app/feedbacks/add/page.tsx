"use client";

import { useState } from "react";

export default function Page() {
  // State to store the selected star rating
  const [rating, setRating] = useState<number>(0);
  // State to store the feedback text
  const [feedbackText, setFeedbackText] = useState<string>("");

  // Form submission handler
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Validation: Ensure both rating and feedback are provided
    if (rating === 0 || feedbackText === "") {
      alert("Please provide a rating and feedback.");
    } else {
      // Feedback successfully submitted
      alert(`Feedback submitted successfully!\nRating: ${rating}\nFeedback: ${feedbackText}`);
      // This is where we could add logic to send feedback to Firebase
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
