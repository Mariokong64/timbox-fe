import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { EnlacePolitica } from "./datosPoliticas";

interface TarjetaPoliticaProps {
  enlace: EnlacePolitica;
}

export function TarjetaPolitica({ enlace }: TarjetaPoliticaProps) {
  return (
    <Box
      component={RouterLink}
      to={enlace.ruta}
      sx={{
        minHeight: { xs: 92, md: 112 },
        px: { xs: 3, sm: 4, md: 6.25 },
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        alignItems: "center",
        gap: { xs: 2, md: 4 },
        bgcolor: "var(--azul-timbox)",
        color: "var(--blanco-timbox)",
        fontFamily: "var(--fuente-ligera)",
        fontSize: { xs: 23, sm: 27, md: 30 },
        fontWeight: 300,
        lineHeight: 1.2,
        textDecoration: "none",
        transition:
          "background-color 260ms ease, color 260ms ease, box-shadow 260ms ease",
        "&:hover, &:focus-visible": {
          bgcolor: "#a5abb1",
          color: "rgba(21, 33, 47, 0.48)",
          boxShadow: "0 8px 22px rgba(21, 33, 47, 0.08)",
          outline: "none",
        },
        "&:hover .flecha-politica, &:focus-visible .flecha-politica": {
          borderColor: "rgba(21, 33, 47, 0.82)",
          color: "rgba(21, 33, 47, 0.82)",
        },
        "&:hover .icono-politica, &:focus-visible .icono-politica": {
          transform: "translateX(2px)",
        },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "& .icono-politica": {
            transition: "none",
          },
        },
      }}
    >
      <Box component="span">{enlace.titulo}</Box>

      <Box
        component="span"
        className="flecha-politica"
        aria-hidden="true"
        sx={{
          width: { xs: 44, md: 51 },
          height: { xs: 44, md: 51 },
          border: "1px solid rgba(255, 255, 255, 0.9)",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          color: "rgba(255, 255, 255, 0.92)",
          transition: "border-color 260ms ease, color 260ms ease",
        }}
      >
        <ArrowForwardIosRoundedIcon
          className="icono-politica"
          sx={{
            fontSize: { xs: 14, md: 16 },
            transition: "transform 260ms ease",
          }}
        />
      </Box>
    </Box>
  );
}
