"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Hello, This is the Page for Application Overview!</h1>
      <p>Welcome to FeedHub!</p>
      <p>
        <Link href="/access-groups/login">Go to Login Page</Link>
      </p>
      <p>
        <Link href="/applications/dashboard">Go to Dashboard</Link>
      </p>
    </div>
  );
}
