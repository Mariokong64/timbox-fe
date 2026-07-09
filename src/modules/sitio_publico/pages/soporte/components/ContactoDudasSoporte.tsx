import { Box, Link, Typography } from "@mui/material";
import imagenDudasDefault from "../assets/Componente-32-–-1@2x.png";

type ContactoDudasSoporteProps = {
  imagen?: string;
  href?: string;
};

export function ContactoDudasSoporte({ imagen = imagenDudasDefault, href = "/contacto" }: ContactoDudasSoporteProps) {
  return (
    <Link
      href={href}
      underline="none"
      sx={{
        my: { xs: 5, md: 6 },
        minHeight: { xs: 180, md: 230 },
        display: "grid",
        placeItems: "center",
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(${imagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "var(--blanco-timbox)",
        isolation: "isolate",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(21, 33, 47, 0.2)",
          transition: "background-color .24s ease",
          zIndex: -1,
        },
        "& .cta-dudas": {
          opacity: 0,
          transform: "translateY(12px)",
          transition: "opacity .24s ease, transform .24s ease",
        },
        "&:hover::before": {
          bgcolor: "rgba(21, 33, 47, 0.76)",
        },
        "&:hover .cta-dudas": {
          opacity: 1,
          transform: "translateY(0)",
        },
        "@media (hover: none)": {
          "&::before": { bgcolor: "rgba(21, 33, 47, 0.68)" },
          "& .cta-dudas": { opacity: 1, transform: "none" },
        },
      }}
    >
      <Box className="cta-dudas" sx={{ textAlign: "center", px: 3 }}>
        <Typography
          sx={{
            mb: 1,
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 21, md: 30 },
            fontWeight: 700,
            letterSpacing: 0,
            textTransform: "uppercase",
          }}
        >
          Queremos solucionar tus dudas
        </Typography>
        <Typography
          sx={{
            color: "var(--rojo-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 17, md: 22 },
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Contáctanos
        </Typography>
      </Box>
    </Link>
  );
}
