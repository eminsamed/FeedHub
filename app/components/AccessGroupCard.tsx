import { Card, CardContent, Typography, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { AccessGroup } from "../model/AccessGroup";

interface AccessGroupCardProps {
  accessGroup: AccessGroup
  onSettingsClick?: () => void;
}

export default function AccessGroupCard({
  accessGroup,
  onSettingsClick,
}: AccessGroupCardProps) {
  return (
    <Card className="relative p-4 mb-6 shadow-lg rounded-lg bg-white max-w-md">
      
      {/* Title and description */}
      <CardContent className="p-0">
        <Typography
          variant="h5"
          component="div"
          className="font-semibold text-xl mb-4 text-gray-800"
        >
          {accessGroup.name}
        </Typography>
        <Typography variant="body2" className="text-gray-600 mt-4">
          {accessGroup.description}
        </Typography>
        {accessGroup.accessGroupUsers.map((user) => (
          <>
          <div>
            {user.email} - {user.userPrivilege}
            </div>
          </>
        ))}
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
