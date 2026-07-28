import { Box, Link, Typography } from "@mui/material";
import {
  contenidoAvisoPrivacidad,
  type BloqueAvisoPrivacidad,
  type FragmentoAvisoPrivacidad,
  type ItemListaAvisoPrivacidad,
} from "./contenidoAvisoPrivacidad";

type VistaContenidoAvisoPrivacidadProps = {
  contenido?: BloqueAvisoPrivacidad[];
};

function renderizarFragmentos(fragmentos: FragmentoAvisoPrivacidad[]) {
  return fragmentos.map((fragmento, indice) => {
    if (typeof fragmento === "string") {
      return fragmento;
    }

    if (fragmento.href) {
      return (
        <Link
          href={fragmento.href}
          key={`${fragmento.texto}-${indice}`}
          underline="none"
          sx={{
            color: "var(--rojo-timbox)",
            fontWeight: fragmento.negrita ? 700 : "inherit",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {fragmento.texto}
        </Link>
      );
    }

    return (
      <Box
        component={fragmento.negrita ? "strong" : "span"}
        key={`${fragmento.texto}-${indice}`}
        sx={{ fontWeight: fragmento.negrita ? 700 : "inherit" }}
      >
        {fragmento.texto}
      </Box>
    );
  });
}

function ItemListaAviso({ item }: { item: ItemListaAvisoPrivacidad }) {
  return (
    <Box component="li">
      {renderizarFragmentos(item.contenido)}
      {item.subitems && (
        <Box component="ul">
          {item.subitems.map((subitem, indice) => (
            <ItemListaAviso item={subitem} key={`subitem-${indice}`} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export function VistaContenidoAvisoPrivacidad({
  contenido = contenidoAvisoPrivacidad,
}: VistaContenidoAvisoPrivacidadProps) {
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
        "& ul ul": {
          mt: 1,
          mb: 1.5,
        },
        "& li": {
          mb: 0.75,
          pl: 0.5,
        },
      }}
    >
      {contenido.map((bloque, indice) => {
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
                <ItemListaAviso item={item} key={`item-${itemIndice}`} />
              ))}
            </Box>
          );
        }

        return (
          <Typography component="p" key={`${bloque.tipo}-${indice}`}>
            {renderizarFragmentos(bloque.contenido)}
          </Typography>
        );
      })}
    </Box>
  );
}
