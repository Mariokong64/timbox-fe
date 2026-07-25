import { Box, Typography } from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import type { MensajeChat as MensajeChatTipo } from "../servicio/chatbot/chatbot.types";

interface MensajeChatProps {
  mensaje: MensajeChatTipo;
}

export function MensajeChat({ mensaje }: MensajeChatProps) {
  const esChatbot = mensaje.remitente === "chatbot";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: esChatbot ? "flex-start" : "flex-end",
        alignItems: "flex-end",
        gap: 1,
      }}
    >
      {esChatbot && (
        <Box
          aria-hidden="true"
          sx={{
            width: 30,
            height: 30,
            flex: "0 0 30px",
            display: "grid",
            placeItems: "center",
            borderRadius: "10px 10px 3px 10px",
            bgcolor: "var(--rojo-timbox)",
            color: "var(--blanco-timbox)",
            boxShadow: "0 6px 14px rgba(220, 62, 38, 0.2)",
          }}
        >
          <SmartToyOutlinedIcon sx={{ fontSize: 17 }} />
        </Box>
      )}

      <Box
        sx={{
          maxWidth: "82%",
          px: 1.75,
          py: 1.25,
          borderRadius: esChatbot
            ? "18px 18px 18px 5px"
            : "18px 18px 5px 18px",
          bgcolor: esChatbot ? "var(--blanco-timbox)" : "var(--azul-timbox)",
          color: esChatbot ? "var(--azul-timbox)" : "var(--blanco-timbox)",
          border: esChatbot ? "1px solid rgba(21, 33, 47, 0.08)" : "none",
          boxShadow: esChatbot
            ? "0 8px 22px rgba(21, 33, 47, 0.07)"
            : "0 8px 20px rgba(21, 33, 47, 0.16)",
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--fuente-regular)",
            fontSize: 14,
            lineHeight: 1.48,
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
          }}
        >
          {mensaje.contenido}
        </Typography>

        <Typography
          component="time"
          sx={{
            display: "block",
            mt: 0.5,
            color: esChatbot
              ? "rgba(21, 33, 47, 0.45)"
              : "rgba(255, 255, 255, 0.62)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 10,
            lineHeight: 1,
            textAlign: "right",
          }}
        >
          {mensaje.hora}
        </Typography>
      </Box>
    </Box>
  );
}
