import { Box, Typography } from "@mui/material";
import type { ResultadoValidador } from "../servicio/validadorServicio";
import { TablaResultado } from "./TablaResultado";

interface ResultadoValidadorVistaProps {
  resultado: ResultadoValidador;
}

export function ResultadoValidadorVista({ resultado }: ResultadoValidadorVistaProps) {
  return (
    <Box
      component="section"
      sx={{
        width: "100vw",
        ml: "calc(50% - 50vw)",
        mt: { xs: 7, md: 0 },
        bgcolor: "var(--blanco-timbox)",
        color: "var(--azul-timbox)",
        px: { xs: 3, md: "5vw" },
        py: { xs: 6, md: 4 },
        textAlign: "center",
      }}
    >
      <Typography
        component="h2"
        sx={{
          color: resultado.valido ? "#20ce00" : "red",
          fontFamily: "var(--fuente-ligera)",
          fontSize: { xs: 31, md: 36 },
          fontWeight: 400,
          lineHeight: 1,
          mb: { xs: 6, md: 9 },
        }}
      >
        {resultado.titulo}
      </Typography>

      {resultado.consultaSat && (
        <Box sx={{ mb: 5 }}>
          <Typography sx={{ fontFamily: "var(--fuente-ligera)", fontSize: { xs: 25, md: 30 }, lineHeight: 1.1 }}>
            Consulta SAT:
          </Typography>
          <Typography sx={{ fontFamily: "var(--fuente-ligera)", fontSize: { xs: 20, md: 24 }, lineHeight: 1.15 }}>
            {resultado.consultaSat}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          mb: 2.5,
          display: "grid",
          gap: 1.4,
          fontFamily: "var(--fuente-regular)",
          fontSize: { xs: 17, md: 20 },
          lineHeight: 1.2,
        }}
      >
        {resultado.uuid && <Typography>UUID: {resultado.uuid}</Typography>}
        {resultado.numeroCertificadoSat && <Typography>Num. Certificado SAT: {resultado.numeroCertificadoSat}</Typography>}
        {resultado.fechaTimbrado && <Typography>Fecha de Timbrado: {resultado.fechaTimbrado}</Typography>}
        {resultado.rfcPac && <Typography>RFC PAC: {resultado.rfcPac}</Typography>}
      </Box>

      {resultado.errores.length > 0 && (
        <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 2.5, mb: 3.5 }}>
          <Typography
            component="h3"
            sx={{
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 27, md: 30 },
              fontWeight: 400,
              mb: 1,
            }}
          >
            Errores
          </Typography>
          <Box sx={{ width: "min(920px, 100%)", mx: "auto" }}>
            <TablaResultado
              columnas={["Error", "Mensaje"]}
              filas={resultado.errores.map((error) => ({
                atributo: error.error,
                valor: error.mensaje,
              }))}
            />
          </Box>
        </Box>
      )}

      {resultado.informacionCfdi.length > 0 && (
        <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 2.5 }}>
          <Typography
            component="h3"
            sx={{
              color: "#2196f3",
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 28, md: 31 },
              fontWeight: 400,
              mb: 1.5,
            }}
          >
            Información del CFDI
          </Typography>
          <TablaResultado columnas={["Atributo", "Valor", "Estatus"]} filas={resultado.informacionCfdi} mostrarEstatus />
        </Box>
      )}
    </Box>
  );
}
