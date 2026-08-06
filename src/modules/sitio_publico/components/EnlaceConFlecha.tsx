import { Box, Link } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { abrirURLPorClave } from "./urls/servicio/urlsServicio";

interface EnlaceConFlechaProps {
  texto: string;
  href?: string;
  claveURL?: string;
  claro?: boolean;
  separado?: boolean;
}

export function EnlaceConFlecha({
  texto,
  href,
  claveURL,
  claro = false,
  separado = false,
}: EnlaceConFlechaProps) {
  const color = claro ? "var(--blanco-timbox)" : "var(--azul-timbox)";
  const borde = claro ? "var(--texto-blanco-medio)" : "var(--borde-azul-medio)";

  return (
    <Link
      href={claveURL ? "/404" : href}
      target={claveURL ? "_blank" : undefined}
      rel={claveURL ? "noopener noreferrer" : undefined}
      onClick={claveURL ? (evento) => {
        evento.preventDefault();
        abrirURLPorClave(claveURL);
      } : undefined}
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
