import { Box, Typography } from "@mui/material";
import { TarjetaHerramienta } from "./TarjetaHerramienta";

const codigoIntegracion = [
  { texto: ".NET", href: "https://github.com/TimboxIntegracion/timbox-.net" },
  { texto: "JAVA", href: "https://github.com/TimboxIntegracion/timbox-java" },
  { texto: "PHP", href: "https://github.com/TimboxIntegracion/timbox-php" },
  { texto: "PYTHON", href: "https://github.com/TimboxIntegracion/timbox-python" },
  { texto: "RUBY", href: "https://github.com/TimboxIntegracion/timbox-ruby" },
  { texto: "WEB DEV", href: "https://github.com/TimboxIntegracion/timbox-webdev" },
  { texto: "VFOXPRO", href: "https://github.com/TimboxIntegracion/timbox-vfoxpro" },
  { texto: "VB", href: "https://github.com/TimboxIntegracion/timbox-vb" },
  { texto: "NodeJS", href: "https://github.com/TimboxIntegracion/NodeJS-WebServiceAPI" },
  { texto: "Laravel", href: "https://github.com/TimboxIntegracion/Laravel-WebServiceAPI" },
];

const integracionDll = [
  { texto: "VISUAL C#", href: "https://github.com/TimboxIntegracion/Ejemplo-CSharp-DLL" },
  { texto: "Visual Basic", href: "https://github.com/TimboxIntegracion/Ejemplo-VB-DLL" },
  { texto: "FoxPro", href: "https://github.com/TimboxIntegracion/Ejemplo-VFP-DLL" },
  { texto: "DELPHI", href: "https://github.com/TimboxIntegracion/Ejemplo-Delphi-DLL" },
];

export function SeccionHerramientas() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "var(--fondo-timbox)",
        color: "var(--azul-timbox)",
        textAlign: "center",
        px: { xs: 0, md: "7vw" },
        py: { xs: 8, md: 20 },
      }}
    >
      <Box className="texto" sx={{ px: { xs: 3, md: 0 } }}>
        <Typography
          component="h2"
          sx={{
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 40, md: 50 },
            fontWeight: 400,
            lineHeight: 1,
            mb: { xs: 4, md: 5 },
          }}
        >
          Innovación tecnológica.
        </Typography>

        <Typography
          sx={{
            maxWidth: 1750,
            mx: "auto",
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 24, md: 30 },
            lineHeight: 1.05,
            fontWeight: 300,
          }}
        >
          Estamos preparados con equipos de trabajo altamente especializados,
          utilizamos hardware y software de última generación para que la integración
          sea ágil y efectiva.
        </Typography>

        <Typography
          component="h3"
          sx={{
            mt: { xs: 8, md: 10 },
            mb: { xs: 6, md: 9 },
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 28, md: 31 },
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          Herramientas de Ayuda
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 0.25, md: 3 },
        }}
      >
        <TarjetaHerramienta titulo="Código de Integración" enlaces={codigoIntegracion} />
        <TarjetaHerramienta titulo="Integración con las DLL" enlaces={integracionDll} />
      </Box>
    </Box>
  );
}
