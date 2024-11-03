import { Card, CardContent, Typography, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

interface CustomApplicationCardProps {
  title: string;
  description: string;
  onSettingsClick?: () => void;
}

export default function ApplicationCard({
  title,
  description,
  onSettingsClick,
}: CustomApplicationCardProps) {
  return (
    <Card className="relative p-4 mb-6 shadow-lg rounded-lg bg-white max-w-md">
      
      {/* Title and description */}
      <CardContent className="p-0">
        <Typography
          variant="h5"
          component="div"
          className="font-semibold text-xl mb-4 text-gray-800"
        >
          {title}
        </Typography>
        <Typography variant="body2" className="text-gray-600 mt-4">
          {description}
        </Typography>
      </CardContent>
      
      {/* Settings icon */}
      <IconButton
        aria-label="settings"
        onClick={onSettingsClick}
        className="text-gray-500 hover:text-gray-700"
      >
        <SettingsIcon />
      </IconButton>
    </Card>
  );
}
