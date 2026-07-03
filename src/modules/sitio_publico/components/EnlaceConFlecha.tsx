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
  const color = claro ? "var(--blanco-timbox)" : "var(--azul-timbox)";
  const borde = claro ? "var(--texto-blanco-medio)" : "var(--borde-azul-medio)";

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
        fontSize: { xs: 16, md: 23 },
        "&:hover": { color, opacity: 1, textDecoration: "underline" },
      }}
    >
      {texto}
      <Box
        component="span"
        sx={{
          width: { xs: 42, md: 45 },
          height: { xs: 42, md: 45 },
          border: `1px solid ${borde}`,
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
