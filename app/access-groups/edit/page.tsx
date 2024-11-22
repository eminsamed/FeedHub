"use client";

import { useState, useEffect } from "react";
import { Typography, Button, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AccessGroup, UserPrivilege } from "@/app/model/AccessGroup";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams(); // Get Access Group ID from parameters
  const router = useRouter(); // Router for page navigation
  const [accessGroup, setAccessGroup] = useState<AccessGroup | null>(null);

  // Fetch Access Group data from Firestore
  useEffect(() => {
    const fetchAccessGroup = async () => {
      try {
        const docRef = doc(db, "accessgroups", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAccessGroup(docSnap.data() as AccessGroup);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchAccessGroup();
  }, [id]);

  // Remove user from Access Group
  const handleRemoveUser = async (index: number) => {
    if (!accessGroup) return;

    const updatedUsers = accessGroup.accessGroupUsers.filter((_, i) => i !== index);
    setAccessGroup((prev) => prev && { ...prev, accessGroupUsers: updatedUsers });

    try {
      // Update Access Group in Firebase
      const accessGroupRef = doc(db, "accessgroups", id);
      await updateDoc(accessGroupRef, {
        accessGroupUsers: updatedUsers,
      });
      alert("User successfully removed from Access Group!");
    } catch (error) {
      console.error("Error removing user: ", error);
    }
  };

  // Delete Access Group
  const handleDeleteAccessGroup = async () => {
    try {
      const accessGroupRef = doc(db, "accessgroups", id);
      await deleteDoc(accessGroupRef); // Delete Access Group from Firestore
      alert("Access Group successfully deleted!");
      router.push("/access-groups"); // Redirect to Access Groups page
    } catch (error) {
      console.error("Error deleting Access Group: ", error);
    }
  };

  return (
    <div>
      {accessGroup ? (
        <>
          <Typography variant="h4" gutterBottom>
            Edit Access Group: {accessGroup.name}
          </Typography>
          <Paper className="p-4 mb-4" elevation={3}>
            <Typography variant="h6" gutterBottom>
              Assigned Users
            </Typography>

            {/* List users and provide delete functionality */}
            {accessGroup.accessGroupUsers.length > 0 ? (
              accessGroup.accessGroupUsers.map((user, index) => (
                <Paper key={index} className="p-3 my-3" elevation={1}>
                  <Typography variant="body1">
                    {user.email} - {UserPrivilege[user.userPrivilege]}
                  </Typography>
                  <IconButton aria-label="remove user" onClick={() => handleRemoveUser(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Paper>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No users assigned to this Access Group.
              </Typography>
            )}
          </Paper>
          <Button variant="contained" color="secondary" onClick={handleDeleteAccessGroup} sx={{ marginTop: 2 }}>
            Delete Access Group
          </Button>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
}
