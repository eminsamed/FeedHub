"use client";

import { useState } from "react";
import { useAuth } from "../context/auth-context"; // Import useAuth from AuthContext
import { useRouter } from "next/navigation"; // Router for page navigation
import Button from "@mui/material/Button"; // Material UI Button component
import TextField from "@mui/material/TextField"; // Material UI TextField component
import Box from "@mui/material/Box"; // Material UI Box component

export default function LoginPage() {
  const [email, setEmail] = useState(""); // State to store email input
  const [password, setPassword] = useState(""); // State to store password input
  const { login, loading } = useAuth(); // Get login and loading state from useAuth
  const router = useRouter(); // Hook to handle routing

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Using login function from useAuth to log in the user
      await login(email, password);
      // Redirect to dashboard after successful login
      router.push("/feedbacks/dashboard");
    } catch (error: any) {
      alert("Login failed: " + error.message); // Error handling for login failure
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <h2>Login Page</h2>
      {/* Form with email and password fields */}
      <form onSubmit={handleSubmit}>
        {/* Material UI input for email */}
        <TextField
          label="Email"
          variant="outlined" // Outlined style for the input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
          fullWidth
        />
        {/* Material UI input for password */}
        <TextField
          label="Password"
          type="password"
          variant="outlined" // Outlined style for the input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
          fullWidth
        />
        {/* Button for login action */}
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </Button>
      </form>
    </Box>
  );
}
