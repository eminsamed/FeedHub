import type { Metadata } from "next";
import "./globals.css"; // Import global styles
import ReactQueryProvider from "./utils/providers/ReactQueryProvider"; // Import React Query provider to manage server state globally
import Header from "./header"; // Import Header component for the top section
import Sidebar from "./sidebar"; // Import Sidebar component for navigation
import { AuthProvider } from "./context/auth-context"; // Import AuthProvider to manage user authentication state

// Define metadata for the HTML document
export const metadata: Metadata = {
  title: "FeedHub", // Title for the app
  description: "Feedback management system", // Description for the app
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Type definition for children, which are the nested components
}>) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the entire application in AuthProvider to manage authentication globally */}
        <AuthProvider>
          {/* Wrap the app in ReactQueryProvider to manage server-side queries globally */}
          <ReactQueryProvider>
            <div className="flex flex-col h-screen">
              {/* The Header component will be displayed at the top of the screen */}
              <Header />

              {/* The main content area */}
              <div className="flex flex-grow">
                {/* The Sidebar component is for navigation on the left side */}
                <Sidebar />

                {/* Main content area where child components will be rendered */}
                <main className="flex-grow p-8">{children}</main>
              </div>
            </div>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
