"use client"; // Client-side component

import { useState } from "react";
import { useAuth } from "../context/auth-context"; // Import useAuth from AuthContext
import { useRouter } from "next/navigation"; // Router for page navigation
import Button from "@mui/material/Button"; // Material UI Button component
import TextField from "@mui/material/TextField"; // Material UI TextField component
import Box from "@mui/material/Box"; // Material UI Box component
import InputAdornment from "@mui/material/InputAdornment"; // Input adornment for the password field
import IconButton from "@mui/material/IconButton"; // Icon button for the eye icon
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons for eye visibility
import { checkUserAccess } from "../firebase/checkUserAccess"; // Import the function that controls the user's access
import { auth } from "../firebase/firebaseConfig"; // Firebase Authentication reference

export default function LoginPage() {
  const [email, setEmail] = useState(""); // State to store email input
  const [password, setPassword] = useState(""); // State to store password input
  const [error, setError] = useState<string | null>(null); // State to store error message
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { login, loading } = useAuth(); // Get login and loading state from useAuth
  const router = useRouter(); // Hook to handle routing

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Reset error state before attempting login

    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    try {
      // Log in the user using useAuth's login function
      await login(email, password);
      const userId = auth.currentUser?.uid;

      if (userId) {
        // Check if the user has access to the application
        const hasAccess = await checkUserAccess("myApp1", userId);
        if (!hasAccess) {
          setError("You do not have access to this application.");
          return;
        }
      }

      // Redirect to dashboard after successful login
      router.push("/feedbacks/dashboard");
    } catch (error: any) {
      setError("Login failed: " + error.message); // Handle login failure
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" p={2}>
      <h2>Login Page</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if exists */}
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} required margin="normal" fullWidth />

        {/* Password input with eye icon to toggle visibility */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Submit button */}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
          {loading ? "Logging In..." : "Log In"}
        </Button>
      </form>
    </Box>
  );
}
