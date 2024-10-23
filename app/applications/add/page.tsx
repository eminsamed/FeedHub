"use client";

import { Application } from "@/app/model/Application";
import { useAddApplications } from "@/app/utils/providers/addApplications";
import { useState } from "react";

export default function Page() {
  const [inputValue, setInputValue] = useState<string>("");

  const { mutate: addApplication } = useAddApplications();  // `mutate` is used to trigger the mutation

    // Handler for adding a new application
    const handleAddApplication = () => {
      const newApplication: Application = {
        name: inputValue,
        createdAt: new Date(),
        accessGroupIds: ["1"],
        description: "blabla",
        updatedAt: new Date(),

        // Add more fields as needed
      };
      addApplication(newApplication);
    };

  return (
    <div>
      <h1 className="text-5xl">Create Application Page</h1>

      <h2 className="text-3xl my-7">Simple Read & Write firestore</h2>
      <div style={{ padding: "2rem" }}>
        <h1>Firestore Write & Read Example</h1>

        {/* Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter some text"
          style={{ padding: "0.5rem", marginBottom: "1rem" }}
        />

        {/* Button to write data */}
        <button onClick={handleAddApplication} style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}>
          Write to Firestore
        </button>

      </div>
    </div>
  );
}
