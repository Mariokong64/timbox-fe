import { Box, Typography } from "@mui/material";
import {
  contenidoPoliticaProteccionDatos,
  type BloquePoliticaProteccionDatos,
  type FragmentoPoliticaProteccionDatos,
} from "./contenidoPoliticaProteccionDatos";

type VistaContenidoPoliticaProteccionDatosProps = {
  contenido?: BloquePoliticaProteccionDatos[];
};

function renderizarFragmentos(fragmentos: FragmentoPoliticaProteccionDatos[]) {
  return fragmentos.map((fragmento, indice) =>
    typeof fragmento === "string" ? (
      fragmento
    ) : (
      <Box
        component={fragmento.negrita ? "strong" : "span"}
        key={`${fragmento.texto}-${indice}`}
        sx={{ fontWeight: fragmento.negrita ? 700 : "inherit" }}
      >
        {fragmento.texto}
      </Box>
    ),
  );
}

export function VistaContenidoPoliticaProteccionDatos({
  contenido = contenidoPoliticaProteccionDatos,
}: VistaContenidoPoliticaProteccionDatosProps) {
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
                  {renderizarFragmentos(item.contenido)}
                </Box>
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
