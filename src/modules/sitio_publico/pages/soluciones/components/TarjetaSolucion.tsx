import { Box, Link, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { enlacesExternos } from "../../../constants/navegacionPublica";

interface TarjetaSolucionProps {
  numero: number;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  mostrarRegistro?: boolean;
}

export function TarjetaSolucion({
  numero,
  titulo,
  subtitulo,
  descripcion,
  mostrarRegistro = false,
}: TarjetaSolucionProps) {
  return (
    <Box
      sx={{
        minHeight: { xs: "auto", md: 470 },
        borderLeft: "1px solid var(--borde-azul-medio)",
        pl: { xs: 4, md: 6 },
        pr: { xs: 0, md: 5 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2.5, mb: { xs: 5, md: 6 } }}>
        <Typography
          component="span"
          sx={{
            color: "var(--rojo-timbox)",
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 28, md: 32 },
            lineHeight: 1,
          }}
        >
          {numero}
        </Typography>

        <Typography
          component="h2"
          sx={{
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 29, md: 31 },
            fontWeight: 400,
            lineHeight: 0.95,
          }}
        >
          {titulo}
          <br />
          {subtitulo}
        </Typography>
      </Box>

      <Typography
        sx={{
          maxWidth: 780,
          fontFamily: "var(--fuente-ligera)",
          fontSize: { xs: 19, md: 21 },
          lineHeight: 1.25,
          textAlign: "justify",
          fontWeight: 300,
        }}
      >
        {descripcion}
      </Typography>

      {mostrarRegistro && (
        <Link
          href={enlacesExternos.registro}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            mt: "auto",
            pt: { xs: 5, md: 8 },
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            alignSelf: "flex-start",
            color: "var(--texto-footer-claro)",
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 17, md: 20 },
            "&:hover": {
              color: "var(--azul-timbox)",
              textDecoration: "underline",
            },
          }}
        >
          Regístrate
          <Box
            component="span"
            sx={{
              width: 52,
              height: 52,
              border: "1px solid var(--borde-azul-medio)",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
          </Box>
        </Link>
      )}
    </Box>
  );
}
