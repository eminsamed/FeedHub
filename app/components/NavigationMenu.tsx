import Link from "next/link";
import { Box, Button } from "@mui/material";

const navItems = [
  { href: "/feedbacks/dashboard", label: "Dashboard" },
  { href: "/feedbacks/add", label: "Add Feedback" },
  { href: "/login", label: "Login" },
];

export default function NavigationMenu() {
  return (
    <Box component="nav" display="flex" justifyContent="center" p={2} gap={2}>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} passHref>
          <Button variant="contained" color="primary">
            {item.label}
          </Button>
        </Link>
      ))}
    </Box>
  );
}
