import { Box, Typography } from "@mui/material";
import { TarjetaHerramienta } from "./TarjetaHerramienta";
import { clavesURL } from "../../../components/urls/servicio/urlsServicio";

const codigoIntegracion = [
  { texto: ".NET", clave: clavesURL.integradores.net },
  { texto: "JAVA", clave: clavesURL.integradores.java },
  { texto: "PHP", clave: clavesURL.integradores.php },
  { texto: "PYTHON", clave: clavesURL.integradores.python },
  { texto: "RUBY", clave: clavesURL.integradores.ruby },
  { texto: "WEB DEV", clave: clavesURL.integradores.webDev },
  { texto: "VFOXPRO", clave: clavesURL.integradores.vfoxpro },
  { texto: "VB", clave: clavesURL.integradores.vb },
  { texto: "NodeJS", clave: clavesURL.integradores.nodejs },
  { texto: "Laravel", clave: clavesURL.integradores.laravel },
];

const integracionDll = [
  { texto: "VISUAL C#", clave: clavesURL.integradores.visualCsharpDll },
  { texto: "Visual Basic", clave: clavesURL.integradores.visualBasicDll },
  { texto: "FoxPro", clave: clavesURL.integradores.foxproDll },
  { texto: "DELPHI", clave: clavesURL.integradores.delphiDll },
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
