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
        bgcolor: "#15212f",
        backgroundImage: `url(${fondoHome})`,
        backgroundSize: "cover",
        backgroundPosition: { xs: "58% center", md: "center" },
        color: "#fff",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          inset: "0 auto auto 0",
          width: "29%",
          height: 580,
          bgcolor: "#15212f",
        }}
      />

      <Typography
        component="h1"
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          top: 205,
          left: "37.2vw",
          width: 470,
          m: 0,
          color: "#fff",
          fontFamily: "var(--fuente-ligera)",
          fontSize: 64,
          fontWeight: 400,
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
          top: 278,
          left: "8vw",
          width: 275,
          maxWidth: "80vw",
          m: 0,
          color: "#fff",
          fontFamily: "var(--fuente-ligera)",
          fontSize: 45,
          fontWeight: 400,
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
          bgcolor: "#dc3e26",
          display: "flex",
          alignItems: "center",
          pl: { xs: "8vw", md: "8vw" },
          pr: { xs: "6vw", md: "2vw" },
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              mb: 1,
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 21, md: 24 },
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
