import { Box, Typography } from "@mui/material";
import rubikTimbox from "../../../../../shared/assets/rubik_timbox.webp";
import { EnlaceConFlecha } from "../../../components/EnlaceConFlecha";
import { enlacesExternos } from "../../../constants/navegacionPublica";

export function SeccionTiemposEmpresa() {
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
          minHeight: { xs: "auto", md: "117vh" },
          display: "flex",
          alignItems: "center",
          pl: { xs: "8vw", md: "15vw" },
          pr: { xs: "8vw", md: "5vw" },
          py: { xs: 10, md: 12 },
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 42, md: 56 },
              fontWeight: 400,
              lineHeight: 1,
              mb: 5,
            }}
          >
            Tiempos
          </Typography>

          <Typography
            sx={{
              maxWidth: 560,
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 25, md: 32 },
              lineHeight: 1.05,
              fontWeight: 300,
              mb: 7,
            }}
          >
            Mejora en arquitectura de datos e infraestructura de comunicación,
            disminuyendo tiempos de respuesta a milisegundos, sí, milisegundos.
          </Typography>

          <EnlaceConFlecha texto="Empieza ahora" href={enlacesExternos.registro} separado />
        </Box>
      </Box>

      <Box
        sx={{
          order: { xs: 0, md: 1 },
          minHeight: { xs: "60vh", md: "117vh" },
          backgroundImage: `url(${rubikTimbox})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Box>
  );
}
