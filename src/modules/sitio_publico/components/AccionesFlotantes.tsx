import { Box, IconButton, Link, Typography } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ShareIcon from "@mui/icons-material/Share";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const estiloContenedor = {
  display: "flex",
  alignItems: "center",
  width: 44,
  height: 44,
  overflow: "hidden",
  borderRadius: "999px",
  bgcolor: "var(--blanco-timbox)",
  boxShadow: "0 8px 24px rgba(21, 33, 47, 0.2)",
  textDecoration: "none",
  willChange: "width, transform",
  transition:
    "width 380ms cubic-bezier(0.16, 1, 0.3, 1), transform 220ms ease, box-shadow 220ms ease",
  "&:hover, &:focus-visible, &:focus-within": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 30px rgba(21, 33, 47, 0.26)",
    "& .contenido-accion": {
      opacity: 1,
      transform: "translateX(0)",
      pointerEvents: "auto",
    },
  },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
    "& .contenido-accion": {
      transition: "none",
    },
  },
} as const;

const estiloIconoPrincipal = {
  width: 44,
  height: 44,
  minWidth: 44,
  flex: "0 0 44px",
  display: "grid",
  placeItems: "center",
  borderRadius: "50%",
  bgcolor: "var(--azul-timbox)",
} as const;

const estiloContenido = {
  opacity: 0,
  transform: "translateX(-14px)",
  pointerEvents: "none",
  transition:
    "opacity 240ms ease 120ms, transform 320ms cubic-bezier(0.16, 1, 0.3, 1) 80ms",
} as const;

export function AccionesFlotantes() {
  return (
    <Box
      component="aside"
      aria-label="Accesos rápidos"
      sx={{
        display: { xs: "none", md: "flex" },
        position: "fixed",
        left: "5vw",
        bottom: "5vh",
        zIndex: 50,
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 1.25,
      }}
    >
      <Box
        component="a"
        href="/soporte"
        aria-label="Ir a soporte"
        sx={{
          ...estiloContenedor,
          "&:hover, &:focus-visible": {
            width: 158,
            transform: "translateY(-2px)",
            boxShadow: "0 12px 30px rgba(21, 33, 47, 0.26)",
            "& .contenido-accion": {
              opacity: 1,
              transform: "translateX(0)",
              pointerEvents: "auto",
            },
          },
        }}
      >
        <Box
          component="span"
          sx={{
            ...estiloIconoPrincipal,
            color: "var(--rojo-timbox)",
          }}
        >
          <SupportAgentIcon sx={{ fontSize: 19 }} />
        </Box>

        <Typography
          component="span"
          className="contenido-accion"
          sx={{
            ...estiloContenido,
            pl: 2.25,
            pr: 2.5,
            color: "var(--azul-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.14em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          SOPORTE
        </Typography>
      </Box>

      <Box
        role="group"
        aria-label="Redes sociales de Timbox"
        sx={{
          ...estiloContenedor,
          "&:hover, &:focus-within": {
            width: 150,
            transform: "translateY(-2px)",
            boxShadow: "0 12px 30px rgba(21, 33, 47, 0.26)",
            "& .contenido-accion": {
              opacity: 1,
              transform: "translateX(0)",
              pointerEvents: "auto",
            },
          },
        }}
      >
        <IconButton
          aria-label="Mostrar redes sociales"
          disableRipple
          sx={{
            ...estiloIconoPrincipal,
            color: "var(--blanco-timbox)",
            p: 0,
            "&:hover, &:focus-visible": {
              bgcolor: "var(--azul-timbox)",
              color: "var(--rojo-timbox)",
            },
          }}
        >
          <ShareIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <Box
          className="contenido-accion"
          sx={{
            ...estiloContenido,
            pl: 1.75,
            pr: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.25,
          }}
        >
          <Link
            // href="https://www.facebook.com/TimboxPAC/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook de Timbox"
            sx={{
              display: "inline-flex",
              color: "var(--azul-timbox)",
              transition: "color 160ms ease, transform 160ms ease",
              "&:hover, &:focus-visible": {
                color: "var(--rojo-timbox)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <FacebookRoundedIcon sx={{ fontSize: 21 }} />
          </Link>

          <Box
            aria-hidden="true"
            sx={{
              width: "1px",
              height: 18,
              bgcolor: "rgba(21, 33, 47, 0.22)",
            }}
          />

          <Link
            // href="https://www.linkedin.com/company/timbox/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Timbox"
            sx={{
              display: "inline-flex",
              color: "var(--azul-timbox)",
              transition: "color 160ms ease, transform 160ms ease",
              "&:hover, &:focus-visible": {
                color: "var(--rojo-timbox)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <LinkedInIcon sx={{ fontSize: 22 }} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
