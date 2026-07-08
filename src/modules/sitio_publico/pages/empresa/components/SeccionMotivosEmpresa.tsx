import { Box, Typography } from "@mui/material";

const motivos = [
  "Para disminuir tus riesgos fiscales",
  "Para brindarte soluciones innovadoras y sencillas de utilizar, pero con un gran potencial empresarial",
];

export function SeccionMotivosEmpresa() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "var(--blanco-timbox)",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "29% 71%" },
        minHeight: { xs: "auto", md: "85vh" },
      }}
    >
      <Box sx={{ display: { xs: "none", md: "block" }, bgcolor: "var(--azul-timbox)" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: { xs: "9vw", md: "19vw" },
          py: { xs: 9, md: 10 },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 42, md: 54 },
              fontWeight: 400,
              lineHeight: 1,
              mb: { xs: 5, md: 6 },
            }}
          >
            ¿Por qué estamos aquí?
          </Typography>

          <Box component="ol" sx={{ listStyle: "none", p: 0, m: 0 }}>
            {motivos.map((motivo, indice) => (
              <Box
                component="li"
                key={motivo}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "42px 1fr",
                  gap: 1,
                  py: { xs: 4, md: 5 },
                  borderBottom: "2px solid var(--fondo-timbox)",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: "var(--rojo-timbox)",
                    fontFamily: "var(--fuente-ligera)",
                    fontSize: { xs: 28, md: 32 },
                    lineHeight: 1,
                  }}
                >
                  {indice + 1}
                </Typography>

                <Typography
                  component="h3"
                  sx={{
                    fontFamily: "var(--fuente-ligera)",
                    fontSize: { xs: 28, md: 32 },
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  {motivo}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
