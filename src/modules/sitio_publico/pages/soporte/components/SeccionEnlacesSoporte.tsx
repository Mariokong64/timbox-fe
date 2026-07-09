import { Box, Typography } from "@mui/material";
import type { GrupoSoporte } from "./datosSoporte";
import { TarjetaEnlaceSoporte } from "./TarjetaEnlaceSoporte";

type SeccionEnlacesSoporteProps = {
  grupo: GrupoSoporte;
};

export function SeccionEnlacesSoporte({ grupo }: SeccionEnlacesSoporteProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "var(--azul-timbox)",
        color: "var(--blanco-timbox)",
        pt: { xs: 8, md: 9 },
        pb: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          width: "min(1540px, 84vw)",
          mx: "auto",
        }}
      >
        <Typography
          component="h2"
          sx={{
            mb: { xs: 4, md: 6 },
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 38, md: 43 },
            fontWeight: 300,
            lineHeight: 1,
            textAlign: "center",
            letterSpacing: 0,
          }}
        >
          {grupo.titulo}
        </Typography>

        <Box
          component="ul"
          sx={{
            m: 0,
            p: 0,
            listStyle: "none",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            columnGap: { xs: 0, md: 10 },
            rowGap: { xs: 0.75, md: 1.25 },
          }}
        >
          {grupo.enlaces.map((enlace) => (
            <Box key={enlace.href} component="li">
              <TarjetaEnlaceSoporte enlace={enlace} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
