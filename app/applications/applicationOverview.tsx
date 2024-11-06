import { Application } from "../model/Application";
import { Typography, Button, Card, CardContent } from "@mui/material";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";

interface ApplicationCardProps {
  application: Application;
  onDelete: () => void;
}

export default function ApplicationCard({ application, onDelete }: ApplicationCardProps) {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "applications", application.id));
      alert("Application successfully deleted!");
      onDelete(); // Refresh the list or provide feedback to the user
    } catch (error) {
      console.error("Error deleting application: ", error);
    }
  };

  return (
    <Card className="relative p-4 mb-6 shadow-lg rounded-lg bg-white max-w-md">
      <CardContent>
        <Typography variant="h5" component="div">
          {application.name}
        </Typography>
        <Typography variant="body2" className="text-gray-600 mt-4">
          {application.description}
        </Typography>
      </CardContent>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete Application
      </Button>
    </Card>
  );
}
