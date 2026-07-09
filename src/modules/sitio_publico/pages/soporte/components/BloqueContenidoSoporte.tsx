import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type BloqueContenidoSoporteProps = {
  titulo: string;
  children: ReactNode;
};

export function BloqueContenidoSoporte({ titulo, children }: BloqueContenidoSoporteProps) {
  return (
    <Box sx={{ mb: { xs: 5, md: 6 } }}>
      <Typography
        component="h3"
        sx={{
          mb: 2,
          fontFamily: "var(--fuente-regular)",
          fontSize: { xs: 24, md: 30 },
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        {titulo}
      </Typography>
      <Box
        sx={{
          fontFamily: "var(--fuente-ligera)",
          fontSize: { xs: 18, md: 21 },
          lineHeight: 1.65,
          color: "rgba(21, 33, 47, 0.78)",
          "& p": { mt: 0, mb: 2.5 },
          "& a": {
            color: "var(--rojo-timbox)",
            textDecoration: "none",
            overflowWrap: "anywhere",
          },
          "& a:hover": { textDecoration: "underline" },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
