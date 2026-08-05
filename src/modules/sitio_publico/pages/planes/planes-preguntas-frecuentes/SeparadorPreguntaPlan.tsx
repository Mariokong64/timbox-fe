import { Box } from "@mui/material";

export function SeparadorPreguntaPlan() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        height: { xs: 24, md: 32 },
        mx: { xs: -2.5, sm: -4, md: "-58px" },
        mt: { xs: 5, md: 8 },
        mb: { xs: 6, md: 8 },
        bgcolor: "var(--fondo-timbox)",
      }}
    />
  );
}
