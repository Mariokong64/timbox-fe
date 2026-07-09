import { Box, Link, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

export type ItemMenuDocumentacion = {
  texto: string;
  to: string;
};

type LayoutDocumentacionSoporteProps = {
  categoria: string;
  titulo: string;
  menu: ItemMenuDocumentacion[];
  activo: string;
  children?: ReactNode;
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
        height: { md: "100vh" },
        minHeight: { xs: "100vh", md: "auto" },
        overflow: { xs: "visible", md: "hidden" },
        pt: { xs: 17, md: "140px" },
        pb: { xs: 7, md: 0 },
      }}
    >
      <Box
        sx={{
          width: {
            xs: "min(100% - 32px, 760px)",
            md: "min(1652px, calc(100vw - 250px))",
          },
          mx: "auto",
        }}
      >
        <Box
          component="nav"
          aria-label="Breadcrumb"
          sx={{
            mb: { xs: 4, md: "26px" },
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.25, md: 2 },
            color: "rgba(21, 33, 47, 0.74)",
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 14, md: 16 },
          }}
        >
          <Link
            component={RouterLink}
            to="/soporte"
            underline="none"
            sx={{ color: "inherit", "&:hover": { color: "var(--rojo-timbox)" } }}
          >
            Soporte
          </Link>
          <Box component="span" sx={{ color: "rgba(21, 33, 47, 0.42)" }}>
            &gt;
          </Box>
          <Box component="span" sx={{ color: "var(--azul-timbox)" }}>
            {categoria}
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "372px minmax(0, 1fr)" },
            gap: { xs: 4, md: "42px" },
            alignItems: "start",
          }}
        >
          <Box
            component="aside"
            sx={{
              pt: { xs: 0, md: "35px" },
              minWidth: 0,
            }}
          >
            <Box
              component="ul"
              sx={{
                m: 0,
                p: 0,
                listStyle: "none",
                bgcolor: "var(--blanco-timbox)",
                width: "100%",
              }}
            >
              {menu.map((item) => {
                const esActivo = item.to === activo;
                return (
                  <Box key={item.texto} component="li" sx={{ "&:last-of-type a": { borderBottom: 0 } }}>
                    <Link
                      component={RouterLink}
                      to={item.to}
                      underline="none"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        minHeight: 72,
                        pl: 2.5,
                        pr: 2,
                        borderLeft: esActivo ? "3px solid var(--rojo-timbox)" : "3px solid transparent",
                        borderBottom: "1px solid rgba(21, 33, 47, 0.08)",
                        color: esActivo ? "var(--rojo-timbox)" : "var(--azul-timbox)",
                        bgcolor: esActivo ? "rgba(21, 33, 47, 0.015)" : "var(--blanco-timbox)",
                        fontFamily: "var(--fuente-regular)",
                        fontSize: { xs: 17, md: 20 },
                        lineHeight: 1.2,
                        transition: "color .2s ease, background-color .2s ease, border-color .2s ease",
                        "&:hover": {
                          color: "var(--rojo-timbox)",
                          bgcolor: "rgba(21, 33, 47, 0.025)",
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

          <Box
            component="article"
            sx={{
              minWidth: 0,
              bgcolor: "var(--blanco-timbox)",
              height: { md: "calc(100vh - 227px)" },
              overflowY: { xs: "visible", md: "auto" },
              overflowX: "hidden",
              px: { xs: 2.5, sm: 4, md: "58px" },
              pt: { xs: 5, md: "92px" },
              pb: { xs: 6, md: 10 },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Typography
              component="h2"
              sx={{
                mb: { xs: 3.5, md: "27px" },
                pb: { xs: 0, md: "26px" },
                borderBottom: { xs: 0, md: "1px solid rgba(21, 33, 47, 0.08)" },
                fontFamily: "var(--fuente-regular)",
                fontSize: { xs: 31, md: 31 },
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
