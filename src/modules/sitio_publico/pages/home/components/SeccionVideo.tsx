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
        backgroundImage: `linear-gradient(rgba(9,27,41,.58), rgba(9,27,41,.58)), url(${fondoVideo})`,
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
          bgcolor: "rgba(255,255,255,.32)",
          color: "#fff",
          "&:hover": { bgcolor: "rgba(255,255,255,.46)" },
        }}
      >
        <PlayArrowIcon sx={{ fontSize: { xs: 46, md: 66 } }} />
      </IconButton>
    </Box>
  );
}
