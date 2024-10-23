"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Function required for Firebase authentication
import { auth } from "@/app/firebase/firebaseConfig"; // Firebase auth configuration
import { useRouter } from "next/navigation"; // Router for page navigation
import CustomButton from "../components/CustomButton"; // Importing CustomButton

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Hook to handle routing

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // User login process in Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to Dashboard after successful login
      router.push("/feedbacks/dashboard"); // Redirecting to Dashboard
    } catch (error: any) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div id="loginPage">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {/* CustomButton component */}
        <CustomButton onClick={handleSubmit} label="Log In" />
      </form>
    </div>
  );
}
