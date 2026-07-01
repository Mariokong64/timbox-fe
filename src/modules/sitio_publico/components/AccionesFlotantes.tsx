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
          bgcolor: "var(--azul-timbox)",
          color: "var(--rojo-timbox)",
          "&:hover": { bgcolor: "var(--blanco-timbox)" },
        }}
      >
        <SupportAgentIcon sx={{ fontSize: 17 }} />
      </IconButton>
      <IconButton
        aria-label="Compartir"
        sx={{
          width: 42,
          height: 42,
          bgcolor: "var(--azul-timbox)",
          color: "var(--blanco-timbox)",
          "&:hover": { bgcolor: "var(--blanco-timbox)", color: "var(--azul-timbox)" },
        }}
      >
        <ShareIcon sx={{ fontSize: 17 }} />
      </IconButton>
    </Box>
  );
}
