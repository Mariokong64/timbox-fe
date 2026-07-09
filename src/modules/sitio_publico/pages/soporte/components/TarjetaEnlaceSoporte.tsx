import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Link } from "@mui/material";
import type { EnlaceSoporte } from "./datosSoporte";

type TarjetaEnlaceSoporteProps = {
  enlace: EnlaceSoporte;
};

export function TarjetaEnlaceSoporte({ enlace }: TarjetaEnlaceSoporteProps) {
  return (
    <Link
      href={enlace.href}
      target="_self"
      underline="none"
      sx={{
        minHeight: { xs: 70, md: 86 },
        px: { xs: 2.5, md: 5 },
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 46px",
        alignItems: "center",
        gap: { xs: 2, md: 4 },
        color: "rgba(255, 255, 255, 0.86)",
        fontFamily: "var(--fuente-ligera)",
        fontSize: { xs: 22, md: 32 },
        lineHeight: 1.15,
        position: "relative",
        transition: "background-color .22s ease, color .22s ease, transform .22s ease",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: "50%",
          width: 3,
          height: 0,
          bgcolor: "var(--rojo-timbox)",
          transform: "translateY(-50%)",
          transition: "height .22s ease",
        },
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.08)",
          color: "var(--blanco-timbox)",
          transform: { xs: "none", md: "translateX(6px)" },
        },
        "&:hover::before": {
          height: "58%",
        },
        "&:hover .flecha-soporte": {
          borderColor: "var(--rojo-timbox)",
          bgcolor: "var(--rojo-timbox)",
          color: "var(--blanco-timbox)",
        },
      }}
    >
      <Box component="span">{enlace.texto}</Box>
      <Box
        component="span"
        className="flecha-soporte"
        sx={{
          width: { xs: 40, md: 45 },
          height: { xs: 40, md: 45 },
          border: "1px solid rgba(255, 255, 255, 0.58)",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          color: "rgba(255, 255, 255, 0.76)",
          transition: "background-color .22s ease, border-color .22s ease, color .22s ease",
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
      </Box>
    </Link>
  );
}
