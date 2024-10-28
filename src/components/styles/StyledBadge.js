import { Badge, styled } from "@mui/material";

export const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      display:"none",
    },
  }));