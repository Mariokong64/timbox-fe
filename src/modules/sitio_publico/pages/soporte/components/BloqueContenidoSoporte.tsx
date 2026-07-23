import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type BloqueContenidoSoporteProps = {
  titulo?: string;
  children: ReactNode;
};

export function BloqueContenidoSoporte({ titulo, children }: BloqueContenidoSoporteProps) {
  return (
    <Box sx={{ mb: { xs: 4.5, md: 3.2 } }}>
      {titulo && (
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
      )}
      <Box
        sx={{
          fontFamily: "var(--fuente-ligera)",
          fontSize: { xs: 18, md: 20 },
          lineHeight: 1.48,
          color: "rgba(21, 33, 47, 0.78)",
          "& p": { mt: 0, mb: 2.1 },
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
