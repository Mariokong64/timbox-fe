import { Box, Typography } from "@mui/material";
import fondoHome from "../../../../../shared/assets/fondo_home.png";
import { EnlaceConFlecha } from "../../../components/EnlaceConFlecha";

export function HeroInicio() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: 900, md: 810 },
        bgcolor: "var(--azul-timbox)",
        backgroundImage: `url(${fondoHome})`,
        backgroundSize: "cover",
        backgroundPosition: { xs: "58% center", md: "center" },
        color: "var(--blanco-timbox)",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          inset: "0 auto auto 0",
          width: "29%",
          height: 580,
          bgcolor: "var(--azul-timbox)",
        }}
      />

      <Typography
        component="h1"
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          top: 70,
          left: "37.2vw",
          width: 530,
          m: 0,
          color: "var(--blanco-timbox)",
          fontFamily: "var(--fuente-ligera)",
          fontSize: 80,
          fontWeight: 200,
          lineHeight: 1,
        }}
      >
        Hablemos
        <br />
        de innovación
        <br />
        y seguridad en
        <br />
        timbrado fiscal.
      </Typography>

      <Typography
        component="h1"
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          top: 300,
          left: "8vw",
          width: 300,
          maxWidth: "80vw",
          m: 0,
          color: "var(--blanco-timbox)",
          fontFamily: "var(--fuente-ligera)",
          fontSize: 45,
          fontWeight: 200,
          lineHeight: 1,
        }}
      >
        Hablemos de innovación y seguridad en timbrado fiscal.
      </Typography>

      <Box
        sx={{
          position: "absolute",
          left: { xs: 0, md: "29%" },
          bottom: 0,
          width: { xs: "95%", md: "35%" },
          height: 230,
          bgcolor: "var(--rojo-timbox)",
          display: "flex",
          alignItems: "center",
          pl: { xs: "8vw", md: "8vw" },
          pr: { xs: "6vw", md: "2vw" },
        }}
      >
        <Box>
          <Typography
            component="h1"
            sx={{
              mb: 1,
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 25, md: 30 },
              fontWeight: 400,
            }}
          >
            Integración el mismo día
          </Typography>
          <EnlaceConFlecha texto="Empieza ahora" href="/planes" claro />
        </Box>
      </Box>
    </Box>
  );
}
