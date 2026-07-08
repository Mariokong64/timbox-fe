import { Box, Typography } from "@mui/material";
import { LogoSat } from "../../../components/LogoSat";

export function SeccionSatEmpresa() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "var(--fondo-timbox)",
        px: { xs: "8vw", md: "13vw" },
        py: { xs: 8, md: 19 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 170px" },
          gap: { xs: 5, md: 8 },
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            maxWidth: 1150,
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 27, md: 31 },
            lineHeight: 1.05,
            fontWeight: 300,
          }}
        >
          Timbox es una empresa Mexicana, dedicada 100% a soluciones de facturación
          electrónica, somos unos de los 70 Proveedores de certificación de
          Comprobante Fiscal Digital por Internet (PAC) autorizados por el SAT.
          <br />
          <br />
          <br />
          Contamos con diferentes métodos de programación muy completos, para lograr
          una integración en nuestras soluciones de timbrado de forma muy sencilla y
          estable, contamos con más de 7 años de experiencia en el rubro de
          facturación electrónica.
        </Typography>

        <Box sx={{ justifySelf: { xs: "start", md: "center" } }}>
          <LogoSat />
        </Box>
      </Box>
    </Box>
  );
}
