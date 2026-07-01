import { Box, Typography } from "@mui/material";
import logoSat from "../../../../../shared/assets/logo_SAT.png";
import { EnlaceConFlecha } from "../../../components/EnlaceConFlecha";

export function SeccionQuienesSomos() {
  return (
    <Box
      component="section"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "29% 71%" },
        minHeight: { xs: 610, md: 500 },
        bgcolor: "var(--fondo-timbox)",
      }}
    >
      <Box sx={{ display: { xs: "none", md: "block" }, bgcolor: "var(--rojo-timbox)" }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 150px" },
          alignItems: "center",
          gap: { xs: 4, md: 6 },
          pl: { xs: "8vw", md: "8vw" },
          pr: { xs: "8vw", md: "5vw" },
          pt: { xs: 15, md: 8 },
          pb: { xs: 10, md: 12 },
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              mb: 4,
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 40, md: 40 },
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            Quiénes Somos
          </Typography>
          <Typography
            sx={{
              maxWidth: 780,
              mb: 2,
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 22, md: 24 },
              lineHeight: 1.05,
            }}
          >
            Disminuimos tus riesgos fiscales, brindándote soluciones innovadoras,
            integración muy amigable y estabilidad en nuestras soluciones.
          </Typography>
          <EnlaceConFlecha texto="Empieza ahora" href="/empresa" />
        </Box>

        <Box
          component="a"
          href="http://omawww.sat.gob.mx/tramitesyservicios/Paginas/pac_timbox.htm"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "block",
            justifySelf: { xs: "start", md: "center" },
          }}
        >
          <Box
            component="img"
            src={logoSat}
            alt="SAT Proveedor Autorizado PCCFDI 0184"
            sx={{ width: { xs: 105, md: 120 }, height: "auto", opacity: 0.58 }}
          />
        </Box>
      </Box>
    </Box>
  );
}
