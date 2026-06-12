import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { enlacesExternos } from "../constants/navegacionPublica";
import { LogoTimboxClaro } from "./LogoTimboxClaro";

export function BarraAccesoPublica() {
  return (
    <Box
      component="header"
      sx={{
        position: "absolute",
        inset: "0 0 auto",
        zIndex: 20,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "29% 62% 9%" },
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          px: { xs: 3, sm: 5, md: "7vw" },
          pt: { xs: 8.5, md: 2.75 },
          pointerEvents: "auto",
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          aria-label="Ir al inicio"
          sx={{ display: "inline-flex", textDecoration: "none" }}
        >
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <LogoTimboxClaro ancho={220} />
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <LogoTimboxClaro ancho={200} />
          </Box>
        </Box>
      </Box>

      <Box
        component="nav"
        aria-label="Accesos de usuario"
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-end",
          alignItems: "flex-start",
          justifySelf: "end",
          width: 420,
          mr: "7vw",
          mt: 3,
          borderTop: "1px solid rgba(255,255,255,.65)",
          borderBottom: "1px solid rgba(255,255,255,.65)",
          pointerEvents: "auto",
        }}
      >
        {[
          { texto: "Regístrate", url: enlacesExternos.registro },
          { texto: "Inicio de sesión", url: enlacesExternos.inicioSesion },
        ].map((enlace, indice) => (
          <Link
            key={enlace.texto}
            href={enlace.url}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              minWidth: 170,
              py: 1.25,
              px: 3,
              color: "rgba(255,255,255,.75)",
              textAlign: "center",
              fontFamily: "var(--fuente-regular)",
              fontSize: 14,
              borderRight:
                indice === 0 ? "1px solid rgba(255,255,255,.8)" : "none",
              "&:hover": { color: "#fff" },
            }}
          >
            {enlace.texto}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
