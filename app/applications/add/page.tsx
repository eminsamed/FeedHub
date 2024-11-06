"use client";

import { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { Application } from "@/app/model/Application";
import { useAddApplications } from "@/app/utils/providers/addApplications";

export default function Page() {
  const [inputValue, setInputValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { mutate: addApplication } = useAddApplications();

  // Handler for adding a new application
  const handleAddApplication = () => {
    if (!inputValue || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const newApplication: Application = {
      name: inputValue,
      description: description,
      createdAt: new Date(),
      updatedAt: new Date(),
      accessGroupIds: ["1"], // This can be updated based on your requirements
    };

    addApplication(newApplication);
    setInputValue("");
    setDescription("");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h4" gutterBottom>
        Create Application Page
      </Typography>
      <Paper className="p-4 mb-4" elevation={3}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={3}>
          {/* Input for application name */}
          <TextField label="Application Name" variant="outlined" fullWidth value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          {/* Input for application description */}
          <TextField label="Description" variant="outlined" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
          {/* Button to add application */}
          <Button variant="contained" color="primary" onClick={handleAddApplication}>
            Save Application
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
