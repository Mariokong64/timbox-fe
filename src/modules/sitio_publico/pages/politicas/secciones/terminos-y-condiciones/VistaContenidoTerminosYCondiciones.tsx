import { Box, Typography } from "@mui/material";
import {
  contenidoTerminosYCondiciones,
  type BloqueTerminosYCondiciones,
} from "./contenidoTerminosYCondiciones";

type ContenidoTerminosYCondicionesProps = {
  contenido?: BloqueTerminosYCondiciones[];
};

export function ContenidoTerminosYCondiciones({
  contenido = contenidoTerminosYCondiciones,
}: ContenidoTerminosYCondicionesProps) {
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
        "& h3 + h3": {
          mt: { xs: 2.5, md: 3 },
        },
      }}
    >
      {contenido.map((bloque, indice) =>
        bloque.tipo === "titulo" ? (
          <Typography component="h3" key={`${bloque.tipo}-${indice}`}>
            {bloque.texto}
          </Typography>
        ) : (
          <Typography component="p" key={`${bloque.tipo}-${indice}`}>
            {bloque.texto}
          </Typography>
        ),
      )}
    </Box>
  );
}
