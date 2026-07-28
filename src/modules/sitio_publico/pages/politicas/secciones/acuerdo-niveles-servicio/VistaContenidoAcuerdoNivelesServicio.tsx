import { Box, Link, Typography } from "@mui/material";
import {
  contenidoAcuerdoNivelesServicio,
  type BloqueAcuerdoNivelesServicio,
  type FragmentoAcuerdoNivelesServicio,
} from "./contenidoAcuerdoNivelesServicio";

type VistaContenidoAcuerdoNivelesServicioProps = {
  contenido?: BloqueAcuerdoNivelesServicio[];
};

function renderizarFragmentos(fragmentos: FragmentoAcuerdoNivelesServicio[]) {
  return fragmentos.map((fragmento, indice) =>
    typeof fragmento === "string" ? (
      fragmento
    ) : (
      <Link
        href={fragmento.href}
        key={`${fragmento.href}-${indice}`}
        target={fragmento.href.startsWith("http") ? "_blank" : undefined}
        rel={fragmento.href.startsWith("http") ? "noreferrer" : undefined}
        underline="hover"
        sx={{ color: "var(--rojo-timbox)" }}
      >
        {fragmento.texto}
      </Link>
    ),
  );
}

export function VistaContenidoAcuerdoNivelesServicio({
  contenido = contenidoAcuerdoNivelesServicio,
}: VistaContenidoAcuerdoNivelesServicioProps) {
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

        return (
          <Typography component="p" key={`${bloque.tipo}-${indice}`}>
            {renderizarFragmentos(bloque.contenido)}
          </Typography>
        );
      })}
    </Box>
  );
}
