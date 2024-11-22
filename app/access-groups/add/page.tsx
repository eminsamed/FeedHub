"use client";

import { useState } from "react";
import { TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AccessGroup } from "@/app/model/AccessGroup";
import { AccessGroupUser, UserPrivilege } from "@/app/model/AccessGroupUser";
import { addAccessGroup, useAddAccessGroup } from "@/app/utils/providers/addAccessGroup";

export default function Page() {
  const [accessGroup, setAccessGroup] = useState<AccessGroup>({
    name: "",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    accessGroupUsers: [],
  });

  const handleAddUser = () => {
    setAccessGroup((prev) => ({
      ...prev,
      accessGroupUsers: [...prev.accessGroupUsers, { email: "", userPrivilege: UserPrivilege.Viewer }],
    }));
  };

  const handleUserChange = (index: number, field: string, value: any) => {
    const updatedUsers = accessGroup.accessGroupUsers.map((user, i) => (i === index ? { ...user, [field]: value } : user));
    setAccessGroup((prev) => ({ ...prev, accessGroupUsers: updatedUsers }));
  };

  const handleRemoveUser = (index: number) => {
    const updatedUsers = accessGroup.accessGroupUsers.filter((_, i) => i !== index);
    setAccessGroup((prev) => ({ ...prev, accessGroupUsers: updatedUsers }));
  };

  const handleChange = (field: string, value: any) => {
    setAccessGroup((prev) => ({ ...prev, [field]: value }));
  };

  const { mutate: addAccessGroup } = useAddAccessGroup(); // `mutate` is used to trigger the mutation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(accessGroup);

    addAccessGroup(accessGroup);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Create Access-Group Page
      </Typography>
      <form onSubmit={handleSubmit}>
        <Paper className="p-4 mb-4" elevation={3}>
          <TextField label="Name" variant="outlined" fullWidth value={accessGroup.name} onChange={(e) => handleChange("name", e.target.value)} margin="normal" />
          <TextField label="Description" variant="outlined" fullWidth value={accessGroup.description} onChange={(e) => handleChange("description", e.target.value)} margin="normal" />

          <Typography variant="h6" gutterBottom>
            Assigned Users
          </Typography>

          {accessGroup.accessGroupUsers.map((user, index) => (
            <Paper key={index} className="p-3 my-3" elevation={1}>
              <TextField label="Email" variant="outlined" fullWidth value={user.email} onChange={(e) => handleUserChange(index, "email", e.target.value)} margin="normal" />
              <FormControl fullWidth margin="normal">
                <InputLabel>User Privilege</InputLabel>
                <Select value={user.userPrivilege} onChange={(e) => handleUserChange(index, "userPrivilege", e.target.value)}>
                  <MenuItem value={UserPrivilege.Viewer}>Viewer</MenuItem>
                  <MenuItem value={UserPrivilege.Member}>Member</MenuItem>
                  <MenuItem value={UserPrivilege.Administrator}>Administrator</MenuItem>
                </Select>
              </FormControl>
              <IconButton aria-label="remove user" onClick={() => handleRemoveUser(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Paper>
          ))}

          <Button startIcon={<AddCircleIcon />} variant="contained" color="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Paper>

        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Save Access Group
        </Button>
      </form>
    </div>
  );
}
