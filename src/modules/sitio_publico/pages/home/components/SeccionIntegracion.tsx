import { Box, Typography } from "@mui/material";
import desarrollador from "../../../../../shared/assets/desarrollador_timbox.png";
import { EnlaceConFlecha } from "../../../components/EnlaceConFlecha";

export function SeccionIntegracion() {
  return (
    <Box
      component="section"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "50% 50%" },
        bgcolor: "var(--gris-timbox)",
      }}
    >
      <Box
        sx={{
          order: { xs: 1, md: 0 },
          minHeight: { xs: "50vh", md: "120vh" },
          display: "flex",
          alignItems: "center",
          pl: { xs: "8vw", md: "15vw" },
          pr: { xs: "8vw", md: "7vw" },
          py: { xs: 10, md: 12 },
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              mb: 4,
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 42, md: 40 },
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            Integración
          </Typography>
          <Typography
            sx={{
              mb: 7,
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 22, md: 24 },
              lineHeight: 1.05,
            }}
          >
            Equipos de trabajo especializados con hardware y software de última
            generación.
          </Typography>
          <EnlaceConFlecha texto="Ver más" href="/integracion" separado />
        </Box>
      </Box>

      <Box
        sx={{
          order: { xs: 0, md: 1 },
          minHeight: { xs: "60vh", md: "120vh" },
          backgroundImage: `url(${desarrollador})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Box>
  );
}
