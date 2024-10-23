"use client";

import { useState } from "react";

export default function Page() {
  const [rating, setRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (rating === 0 || feedbackText === "") {
      alert("Please provide a rating and feedback.");
    } else {
      alert(`Feedback submitted successfully!\nRating: ${rating}\nFeedback: ${feedbackText}`);
    }
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="feedback-container">
      <h2>Send Feedback</h2>
      <form id="feedbackForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rating">Rating (1-5 stars)</label>
          <div id="starRating" className="stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`star ${rating >= value ? "selected" : ""}`}
                onClick={() => handleStarClick(value)}
              >
                ★
              </span>
            ))}
          </div>
          <input type="hidden" id="rating" name="rating" value={rating} />
        </div>
        <div className="form-group">
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            rows={5}
            placeholder="Enter your feedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
