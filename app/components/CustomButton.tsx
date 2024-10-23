import Button from "@mui/material/Button";

interface CustomButtonProps {
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained";
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

export default function CustomButton({ onClick, variant = "contained", type = "button", children }: CustomButtonProps) {
  return (
    <Button onClick={onClick} variant={variant} type={type}>
      {children}
    </Button>
  );
}
