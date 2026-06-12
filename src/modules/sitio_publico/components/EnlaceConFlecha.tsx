import { Box, Link } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface EnlaceConFlechaProps {
  texto: string;
  href: string;
  claro?: boolean;
  separado?: boolean;
}

export function EnlaceConFlecha({
  texto,
  href,
  claro = false,
  separado = false,
}: EnlaceConFlechaProps) {
  const color = claro ? "#fff" : "#15212f";

  return (
    <Link
      href={href}
      underline="none"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: separado ? 6 : 2,
        color,
        opacity: claro ? 0.65 : 0.55,
        fontFamily: "var(--fuente-regular)",
        fontSize: { xs: 16, md: 17 },
        "&:hover": { color, opacity: 1, textDecoration: "underline" },
      }}
    >
      {texto}
      <Box
        component="span"
        sx={{
          width: { xs: 42, md: 50 },
          height: { xs: 42, md: 50 },
          border: `1px solid ${claro ? "rgba(255,255,255,.55)" : "rgba(21,33,47,.55)"}`,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
      </Box>
    </Link>
  );
}
