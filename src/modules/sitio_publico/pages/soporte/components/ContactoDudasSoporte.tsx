import { Box, Link, Typography } from "@mui/material";
import imagenDudasDefault from "../assets/Componente-32.png";

type ContactoDudasSoporteProps = {
  imagen?: string;
  href?: string;
};

export function ContactoDudasSoporte({ imagen = imagenDudasDefault, href = "/contacto" }: ContactoDudasSoporteProps) {
  return (
    <Box
      sx={{
        my: { xs: 4.5, md: 5.5 },
        mx: { xs: -2.5, sm: -4, md: "-58px" },
        py: { xs: 3, md: 4 },
        bgcolor: "var(--fondo-timbox)",
      }}
    >
      <Link
      href={href}
      underline="none"
      sx={{
        minHeight: { xs: 210, md: 340 },
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
          bgcolor: "rgba(21, 33, 47, 0)",
          transition: "background-color .28s ease",
          zIndex: -1,
        },
        "& .cta-dudas": {
          opacity: 0,
          transform: "translateY(14px)",
          transition: "opacity .28s ease, transform .28s ease",
        },
        "&:hover::before, &:focus-visible::before": {
          bgcolor: "rgba(21, 33, 47, 0.7)",
        },
        "&:hover .cta-dudas, &:focus-visible .cta-dudas": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
    >
      <Box className="cta-dudas" sx={{ textAlign: "center", px: 3 }}>
        <Typography
          sx={{
            mb: 1,
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 25, md: 34 },
            fontWeight: 300,
            letterSpacing: 0,
            lineHeight: 1.1,
          }}
        >
          Queremos solucionar tus dudas
        </Typography>
        <Typography
          sx={{
            color: "var(--blanco-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 17, md: 19 },
            fontWeight: 700,
            lineHeight: 1,
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
        >
          Contáctanos
        </Typography>
      </Box>
      </Link>
    </Box>
  );
}
