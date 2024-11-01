import Link from "next/link";
import { Box, Button } from "@mui/material";

export default function NavigationMenu() {
  return (
    <Box component="nav" display="flex" justifyContent="center" p={2} gap={2}>
      <Link href="/feedbacks/dashboard">
        <Button variant="contained" color="primary">
          Dashboard
        </Button>
      </Link>
      <Link href="/feedbacks/add">
        <Button variant="contained" color="primary">
          Add Feedback
        </Button>
      </Link>
      <Link href="/login">
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Link>
    </Box>
  );
}
