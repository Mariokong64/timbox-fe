import { useState } from "react";
import { Box, Dialog, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import fondoVideo from "../../../shared/assets/fondo_video_home.webp";

const VIDEO_URL = "https://www.youtube.com/embed/INlqN1lN6HE?autoplay=1&start=4&rel=0";

export function SeccionVideo() {
  const [videoAbierto, setVideoAbierto] = useState(false);

  const abrirVideo = () => {
    setVideoAbierto(true);
  };

  const cerrarVideo = () => {
    setVideoAbierto(false);
  };

  return (
    <>
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
          onClick={abrirVideo}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 100, md: 155 },
            height: { xs: 100, md: 155 },
            bgcolor: "var(--boton-play-fondo)",
            color: "var(--blanco-timbox)",
            "&:hover": {
              bgcolor: "var(--boton-play-fondo-hover)",
              transform: "translate(-50%, -50%) scale(1.04)",
            },
            transition: "transform 180ms ease, background-color 180ms ease",
          }}
        >
          <PlayArrowIcon sx={{ fontSize: { xs: 46, md: 66 } }} />
        </IconButton>
      </Box>

      <Dialog
        open={videoAbierto}
        onClose={cerrarVideo}
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "92vw", md: "78vw" },
              maxWidth: 1100,
              bgcolor: "transparent",
              boxShadow: "none",
              overflow: "visible",
            },
          },
          backdrop: {
            sx: {
              bgcolor: "rgba(9, 27, 41, 0.86)",
            },
          },
        }}
      >
        <IconButton
          aria-label="Cerrar video"
          onClick={cerrarVideo}
          sx={{
            position: "absolute",
            top: -52,
            right: 0,
            color: "var(--blanco-timbox)",
            bgcolor: "rgba(255, 255, 255, 0.14)",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.24)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            bgcolor: "#000",
          }}
        >
          {videoAbierto && (
            <Box
              component="iframe"
              src={VIDEO_URL}
              title="Video de presentación de Timbox"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
}
