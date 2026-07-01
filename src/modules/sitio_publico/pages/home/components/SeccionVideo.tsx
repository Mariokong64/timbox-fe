import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import fondoVideo from "../../../../../shared/assets/fondo_video_home.png";

export function SeccionVideo() {
  return (
    <Box
      component="section"
      aria-label="Video de presentación de Timbox"
      sx={{
        position: "relative",
        minHeight: { xs: "60vh", md: "90vh" },
        backgroundImage: `linear-gradient(var(--video-overlay), var(--video-overlay)), url(${fondoVideo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <IconButton
        aria-label="Reproducir video"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 100, md: 155 },
          height: { xs: 100, md: 155 },
          bgcolor: "var(--boton-play-fondo)",
          color: "var(--blanco-timbox)",
          "&:hover": { bgcolor: "var(--boton-play-fondo-hover)" },
        }}
      >
        <PlayArrowIcon sx={{ fontSize: { xs: 46, md: 66 } }} />
      </IconButton>
    </Box>
  );
}
