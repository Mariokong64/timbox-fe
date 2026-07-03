import { Box, Typography } from "@mui/material";
import { EnlaceConFlecha } from "../../../components/EnlaceConFlecha";

export function SeccionPlanes() {
  return (
    <Box
      component="section"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "50% 50%" },
        minHeight: { md: "104vh" },
      }}
    >
      <Box
        sx={{
          minHeight: { xs: "40vh", md: "104vh" },
          bgcolor: "var(--azul-timbox)",
          color: "var(--blanco-timbox)",
          display: "flex",
          alignItems: "center",
          px: { xs: "8vw", md: "15vw" },
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 42, md: 50 },
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          Planes
          <br />
          de timbrado
        </Typography>
      </Box>

      <Box>
        <Plan
          titulo="Bajo demanda"
          descripcion="Ilimitados"
          fondo="var(--fondo-timbox)"
          color="var(--azul-timbox)"
        />
        <Plan
          titulo="Timbres Prepago"
          descripcion="Compra mínima de 100 timbres"
          fondo="var(--rojo-timbox)"
          color="var(--blanco-timbox)"
          claro
        />
      </Box>
    </Box>
  );
}

interface PlanProps {
  titulo: string;
  descripcion: string;
  fondo: string;
  color: string;
  claro?: boolean;
}

function Plan({ titulo, descripcion, fondo, color, claro = false }: PlanProps) {
  return (
    <Box
      sx={{
        minHeight: { xs: "42vh", md: "52vh" },
        bgcolor: fondo,
        color,
        display: "flex",
        alignItems: "center",
        px: { xs: "8vw", md: "7vw" },
        py: 8,
      }}
    >
      <Box>
        <Typography
          component="h3"
          sx={{
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 40, md: 50 },
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          {titulo}
        </Typography>
        <Typography
          sx={{
            mt: 0.5,
            mb: 7,
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 21, md: 32 },
            lineHeight: 1.1,
          }}
        >
          {descripcion}
        </Typography>
        <EnlaceConFlecha texto="Empieza ahora" href="/planes" claro={claro} />
      </Box>
    </Box>
  );
}
