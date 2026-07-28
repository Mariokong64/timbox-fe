import { Box, Typography } from "@mui/material";
import {
  contenidoAvisoPrivacidadIntegral,
  type BloqueAvisoPrivacidadIntegral,
  type ItemAvisoPrivacidadIntegral,
} from "./contenidoAvisoPrivacidadIntegral";

type VistaContenidoAvisoPrivacidadIntegralProps = {
  contenido?: BloqueAvisoPrivacidadIntegral[];
};

function ItemListaIntegral({ item }: { item: ItemAvisoPrivacidadIntegral }) {
  if (!item.etiqueta) {
    return item.texto;
  }

  return (
    <>
      <Box component="strong" sx={{ fontWeight: 700 }}>
        {item.etiqueta}
      </Box>
      {item.texto.slice(item.etiqueta.length)}
    </>
  );
}

export function VistaContenidoAvisoPrivacidadIntegral({
  contenido = contenidoAvisoPrivacidadIntegral,
}: VistaContenidoAvisoPrivacidadIntegralProps) {
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
          const sinMargenSuperior =
            indice === 0 || contenido[indice - 1]?.tipo === "separador";

          return (
            <Typography
              component="h3"
              key={`${bloque.tipo}-${indice}`}
              sx={sinMargenSuperior ? { mt: "0 !important" } : undefined}
            >
              {bloque.texto}
            </Typography>
          );
        }

        if (bloque.tipo === "lista") {
          return (
            <Box component="ul" key={`${bloque.tipo}-${indice}`}>
              {bloque.items.map((item, itemIndice) => (
                <Box component="li" key={`item-${itemIndice}`}>
                  <ItemListaIntegral item={item} />
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
