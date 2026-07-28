import { Box, Link, Typography } from "@mui/material";
import type {
  BloquePreguntaFrecuente,
  FragmentoPreguntaFrecuente,
} from "../tiposPreguntasFrecuentes";

type VistaPreguntasFrecuentesProps = {
  contenido: BloquePreguntaFrecuente[];
};

function renderizarFragmentos(fragmentos: FragmentoPreguntaFrecuente[]) {
  return fragmentos.map((fragmento, indice) => {
    if (typeof fragmento === "string") {
      return fragmento;
    }

    if (fragmento.tipo === "salto") {
      return <br key={`salto-${indice}`} />;
    }

    return (
      <Link
        href={fragmento.href}
        key={`${fragmento.texto}-${indice}`}
        underline="none"
        sx={{
          color: "var(--rojo-timbox)",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        {fragmento.texto}
      </Link>
    );
  });
}

export function VistaPreguntasFrecuentes({
  contenido,
}: VistaPreguntasFrecuentesProps) {
  return (
    <Box
      sx={{
        color: "var(--azul-timbox)",
        "& h3": {
          m: 0,
          mt: { xs: 4.5, md: 5.5 },
          mb: { xs: 2, md: 2.5 },
          fontFamily: "var(--fuente-regular)",
          fontSize: { xs: 25, md: 30 },
          fontWeight: 700,
          lineHeight: 1.16,
        },
        "& h3:first-of-type": {
          mt: 0,
        },
        "& p": {
          m: 0,
          mb: { xs: 2.5, md: 2.7 },
          fontFamily: "var(--fuente-ligera)",
          fontSize: { xs: 17, md: 20 },
          fontWeight: 300,
          lineHeight: 1.5,
        },
        "& ul": {
          mt: -1,
          mb: { xs: 3, md: 3.5 },
          pl: { xs: 3, md: 4 },
          fontFamily: "var(--fuente-ligera)",
          fontSize: { xs: 17, md: 20 },
          fontWeight: 300,
          lineHeight: 1.5,
        },
        "& li": {
          mb: 0.5,
          pl: 0.5,
        },
      }}
    >
      {contenido.map((bloque, indice) => {
        if (bloque.tipo === "pregunta") {
          return (
            <Typography component="h3" key={`${bloque.tipo}-${indice}`}>
              {bloque.texto}
            </Typography>
          );
        }

        if (bloque.tipo === "lista") {
          return (
            <Box component="ul" key={`${bloque.tipo}-${indice}`}>
              {bloque.items.map((item) => (
                <Box component="li" key={item}>
                  {item}
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
