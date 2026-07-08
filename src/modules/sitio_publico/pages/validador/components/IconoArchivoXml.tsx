import { Box } from "@mui/material";

export function IconoArchivoXml() {
  return (
    <Box sx={{ position: "relative", width: 92, height: 104, mx: "auto", mb: 3 }}>
      <Box
        sx={{
          position: "absolute",
          left: 4,
          top: 13,
          width: 69,
          height: 92,
          bgcolor: "var(--fondo-timbox)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 69,
          height: 93,
          bgcolor: "var(--rojo-timbox)",
        }}
      />
    </Box>
  );
}
