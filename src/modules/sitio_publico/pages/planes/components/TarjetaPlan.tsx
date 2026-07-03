import { Box, Link, Typography } from "@mui/material";

interface TarjetaPlanProps {
  titulo: string;
  subtitulo: string;
  vigencia: string;
  descripcion: string;
  variante: "gris" | "rojo";
}

export function TarjetaPlan({
  titulo,
  subtitulo,
  vigencia,
  descripcion,
  variante,
}: TarjetaPlanProps) {
  const esRoja = variante === "rojo";
  const colorTexto = esRoja ? "var(--blanco-timbox)" : "var(--azul-timbox)";
  const fondo = esRoja ? "var(--rojo-timbox)" : "var(--fondo-timbox)";
  const borde = esRoja ? "rgba(21, 33, 47, 0.14)" : "rgba(21, 33, 47, 0.1)";
  const colorBarra = esRoja ? "var(--azul-timbox)" : "var(--rojo-timbox)";
  const fondoBotonHover = esRoja ? "var(--blanco-timbox)" : "var(--rojo-timbox)";
  const colorBotonHover = esRoja ? "var(--azul-timbox)" : "var(--blanco-timbox)";

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: 430, md: 470 },
        bgcolor: fondo,
        color: colorTexto,
        textAlign: "center",
        display: "grid",
        gridTemplateRows: "1fr auto",
        cursor: "pointer",
        "&:hover .barra-hover-plan": {
          transform: "scaleX(1)",
        },
        "&:hover .boton-plan": {
          bgcolor: fondoBotonHover,
          color: colorBotonHover,
        },
      }}
    >
      <Box
        className="barra-hover-plan"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 16,
          bgcolor: colorBarra,
          transform: "scaleX(0)",
          transformOrigin: "left center",
          transition: "transform 900ms ease",
        }}
      />

      <Box sx={{ px: { xs: 4, md: 5 }, pt: { xs: 7, md: 8 }, pb: { xs: 5, md: 5 } }}>
        <Typography
          component="h1"
          sx={{
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 44, md: 50 },
            fontWeight: 400,
            lineHeight: 1,
            mb: 2.5,
          }}
        >
          {titulo}
        </Typography>

        <Typography
          component="h2"
          sx={{
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 25, md: 30 },
            fontWeight: 400,
            lineHeight: 1.15,
          }}
        >
          {subtitulo}
        </Typography>
      </Box>

      <Box
        sx={{
          borderTop: `1px solid ${borde}`,
          px: { xs: 4, md: 5 },
          py: { xs: 5, md: 4.75 },
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 19, md: 20 },
            fontWeight: 400,
            lineHeight: 1.15,
            mb: 1.5,
          }}
        >
          {vigencia}
        </Typography>

        <Typography
          sx={{
            maxWidth: 260,
            mx: "auto",
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 16, md: 16 },
            lineHeight: 1.05,
            mb: { xs: 4.5, md: 4.75 },
          }}
        >
          {descripcion}
        </Typography>

        <Link
          href="/contacto"
          underline="none"
          className="boton-plan"
          sx={{
            display: "inline-block",
            px: 2,
            py: 1,
            color: colorTexto,
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 18, md: 20 },
            fontWeight: 600,
            transition: "background-color 180ms ease, color 180ms ease",
            "&:hover": {
              bgcolor: fondoBotonHover,
              color: colorBotonHover,
            },
          }}
        >
          Solicitar Cotización
        </Link>
      </Box>
    </Box>
  );
}
