import { Box, Typography } from "@mui/material";
import {
  contenidoDerechosArco,
  type BloqueDerechosArco,
} from "./contenidoDerechosArco";

type VistaContenidoDerechosArcoProps = {
  contenido?: BloqueDerechosArco[];
};

export function VistaContenidoDerechosArco({
  contenido = contenidoDerechosArco,
}: VistaContenidoDerechosArcoProps) {
  return (
    <Box
      sx={{
        color: "var(--azul-timbox)",
        fontFamily: "var(--fuente-ligera)",
        "& p": {
          m: 0,
          mb: { xs: 2.5, md: 2.7 },
          fontFamily: "var(--fuente-ligera)",
          fontSize: { xs: 17, md: 20 },
          fontWeight: 300,
          lineHeight: 1.5,
        },
        "& h3": {
          m: 0,
          mt: { xs: 4.5, md: 5.5 },
          mb: { xs: 2, md: 2.5 },
          fontFamily: "var(--fuente-regular)",
          fontSize: { xs: 25, md: 30 },
          fontWeight: 700,
          lineHeight: 1.16,
        },
        "& ul": {
          mt: 0,
          mb: { xs: 3, md: 3.5 },
          pl: { xs: 3, md: 4 },
          fontFamily: "var(--fuente-ligera)",
          fontSize: { xs: 17, md: 20 },
          fontWeight: 300,
          lineHeight: 1.5,
        },
        "& li": {
          mb: 1,
          pl: 0.5,
        },
      }}
    >
      {contenido.map((bloque, indice) => {
        if (bloque.tipo === "separador") {
          return (
            <Box
              aria-hidden="true"
              key={`separador-${indice}`}
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

        if (bloque.tipo === "titulo") {
          return (
            <Typography component="h3" key={`${bloque.tipo}-${indice}`}>
              {bloque.texto}
            </Typography>
          );
        }

        if (bloque.tipo === "lista") {
          return (
            <Box component="ul" key={`${bloque.tipo}-${indice}`}>
              {bloque.items.map((item, itemIndice) => (
                <Box component="li" key={`item-${itemIndice}`}>
                  {item}
                </Box>
              ))}
            </Box>
          );
        }

        return (
          <Typography component="p" key={`${bloque.tipo}-${indice}`}>
            {bloque.texto}
          </Typography>
        );
      })}
    </Box>
  );
}
