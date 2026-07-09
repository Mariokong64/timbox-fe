import { Box, Link, Typography } from "@mui/material";
import type { ReactNode } from "react";

export type ItemMenuDocumentacion = {
  texto: string;
  href: string;
};

type LayoutDocumentacionSoporteProps = {
  categoria: string;
  titulo: string;
  menu: ItemMenuDocumentacion[];
  activo: string;
  children: ReactNode;
};

export function LayoutDocumentacionSoporte({
  categoria,
  titulo,
  menu,
  activo,
  children,
}: LayoutDocumentacionSoporteProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "var(--fondo-timbox)",
        color: "var(--azul-timbox)",
        pt: { xs: 18, md: 20 },
        pb: { xs: 8, md: 14 },
      }}
    >
      <Box sx={{ width: "min(1420px, 86vw)", mx: "auto" }}>
        <Box
          component="nav"
          aria-label="Breadcrumb"
          sx={{
            mb: { xs: 5, md: 8 },
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            color: "rgba(21, 33, 47, 0.58)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 16,
          }}
        >
          <Link href="/soporte" underline="none" sx={{ color: "inherit", "&:hover": { color: "var(--rojo-timbox)" } }}>
            Soporte
          </Link>
          <Box component="span">/</Box>
          <Box component="span" sx={{ color: "var(--azul-timbox)" }}>
            {categoria}
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "285px minmax(0, 1fr)" },
            gap: { xs: 5, md: 9 },
            alignItems: "start",
          }}
        >
          <Box
            component="aside"
            sx={{
              position: { xs: "static", md: "sticky" },
              top: { md: 120 },
            }}
          >
            <Typography
              component="h1"
              sx={{
                mb: 3,
                fontFamily: "var(--fuente-ligera)",
                fontSize: { xs: 36, md: 42 },
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              {categoria}
            </Typography>

            <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
              {menu.map((item) => {
                const esActivo = item.href === activo;
                return (
                  <Box key={item.texto} component="li">
                    <Link
                      href={item.href}
                      underline="none"
                      sx={{
                        display: "block",
                        py: 1.4,
                        pl: 2,
                        pr: 1,
                        borderLeft: esActivo ? "3px solid var(--rojo-timbox)" : "3px solid transparent",
                        color: esActivo ? "var(--azul-timbox)" : "rgba(21, 33, 47, 0.55)",
                        bgcolor: esActivo ? "rgba(21, 33, 47, 0.06)" : "transparent",
                        fontFamily: "var(--fuente-regular)",
                        fontSize: 18,
                        transition: "color .2s ease, background-color .2s ease, border-color .2s ease",
                        "&:hover": {
                          color: "var(--azul-timbox)",
                          bgcolor: "rgba(21, 33, 47, 0.05)",
                          borderLeftColor: "var(--rojo-timbox)",
                        },
                      }}
                    >
                      {item.texto}
                    </Link>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box component="article" sx={{ minWidth: 0 }}>
            <Typography
              component="h2"
              sx={{
                mb: { xs: 4, md: 5 },
                fontFamily: "var(--fuente-regular)",
                fontSize: { xs: 34, md: 44 },
                fontWeight: 700,
                lineHeight: 1.08,
              }}
            >
              {titulo}
            </Typography>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
