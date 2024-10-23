"use client";

import Button from "@mui/material/Button";

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  variant?: "text" | "outlined" | "contained"; // Optional prop for button variant
}

export default function CustomButton({ onClick, label, variant = "contained" }: CustomButtonProps) {
  return (
    <Button variant={variant} onClick={onClick}>
      {label}
    </Button>
  );
}
