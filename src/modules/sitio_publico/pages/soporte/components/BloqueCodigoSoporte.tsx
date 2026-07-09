import { Box } from "@mui/material";

type BloqueCodigoSoporteProps = {
  codigo: string;
};

export function BloqueCodigoSoporte({ codigo }: BloqueCodigoSoporteProps) {
  return (
    <Box
      component="pre"
      sx={{
        my: 3,
        p: { xs: 2.5, md: 3 },
        maxHeight: 520,
        overflow: "auto",
        bgcolor: "#101820",
        color: "rgba(255, 255, 255, 0.86)",
        border: "1px solid rgba(21, 33, 47, 0.14)",
        fontFamily: "'Consolas', 'Courier New', monospace",
        fontSize: { xs: 13, md: 14 },
        lineHeight: 1.65,
        whiteSpace: "pre",
      }}
    >
      <Box component="code">{codigo}</Box>
    </Box>
  );
}
