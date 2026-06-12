import { Box, IconButton } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ShareIcon from "@mui/icons-material/Share";

export function AccionesFlotantes() {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        position: "fixed",
        left: "5vw",
        bottom: "5vh",
        zIndex: 50,
        flexDirection: "column",
        gap: 1,
      }}
    >
      <IconButton
        aria-label="Ir a soporte"
        sx={{
          width: 42,
          height: 42,
          bgcolor: "#15212f",
          color: "#dc3e26",
          "&:hover": { bgcolor: "#fff" },
        }}
      >
        <SupportAgentIcon sx={{ fontSize: 17 }} />
      </IconButton>
      <IconButton
        aria-label="Compartir"
        sx={{
          width: 42,
          height: 42,
          bgcolor: "#15212f",
          color: "#fff",
          "&:hover": { bgcolor: "#fff", color: "#15212f" },
        }}
      >
        <ShareIcon sx={{ fontSize: 17 }} />
      </IconButton>
    </Box>
  );
}
