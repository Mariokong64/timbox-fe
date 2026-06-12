import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  IconButton,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  enlacesExternos,
  opcionesMenuPublico,
} from "../constants/navegacionPublica";
import { LogoTimboxClaro } from "./LogoTimboxClaro";

export function MenuLateralPublico() {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <Box
        component="button"
        type="button"
        onClick={() => setAbierto(true)}
        aria-label="Abrir menú principal"
        sx={{
          position: { xs: "absolute", md: "fixed" },
          top: { xs: 58, md: 0 },
          right: 0,
          zIndex: 60,
          width: { xs: 70, md: 105 },
          height: { xs: 70, md: 222 },
          border: 0,
          bgcolor: { xs: "transparent", md: "#15212f" },
          color: "#fff",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            display: { xs: "none", md: "block" },
            mt: 3,
            fontFamily: "var(--fuente-regular)",
            fontSize: 14,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Menú
        </Typography>
        <MoreVertIcon
          sx={{
            mt: { xs: 0, md: 7 },
            color: "rgba(255,255,255,.55)",
            fontSize: { xs: 38, md: 28 },
          }}
        />
      </Box>

      <Box
        aria-hidden={!abierto}
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          bgcolor: "#15212f",
          color: "#fff",
          overflowY: "auto",
          opacity: abierto ? 1 : 0,
          visibility: abierto ? "visible" : "hidden",
          transform: abierto ? "translateX(0)" : "translateX(100%)",
          transition: "opacity .3s ease, transform .3s ease, visibility .3s",
        }}
      >
        <IconButton
          onClick={() => setAbierto(false)}
          aria-label="Cerrar menú principal"
          sx={{
            position: "absolute",
            top: 24,
            right: { xs: 22, md: 44 },
            color: "#fff",
          }}
        >
          <CloseIcon sx={{ fontSize: 34 }} />
        </IconButton>

        <Box
          sx={{
            width: "min(1120px, 84vw)",
            mx: "auto",
            pt: { xs: 12, md: 14 },
            pb: 7,
          }}
        >
          <Box sx={{ mb: { xs: 5, md: 7 } }}>
            <LogoTimboxClaro ancho={190} />
          </Box>

          <List disablePadding>
            {opcionesMenuPublico.map((opcion) => (
              <ListItem key={opcion.ruta} disablePadding sx={{ py: 0.7 }}>
                <Link
                  component={RouterLink}
                  to={opcion.ruta}
                  onClick={() => setAbierto(false)}
                  underline="none"
                  sx={{
                    color: "rgba(255,255,255,.35)",
                    fontFamily: "var(--fuente-ligera)",
                    fontSize: { xs: 29, md: 35 },
                    "&:hover": {
                      color: "#fff",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {opcion.texto}
                </Link>
              </ListItem>
            ))}
          </List>

          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: "1px solid rgba(255,255,255,.2)",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
              color: "rgba(255,255,255,.55)",
            }}
          >
            <Box>
              <Link
                href={enlacesExternos.registro}
                color="inherit"
                underline="hover"
                sx={{ mr: 4 }}
              >
                Regístrate
              </Link>
              <Link
                href={enlacesExternos.inicioSesion}
                color="inherit"
                underline="hover"
              >
                Inicio de sesión
              </Link>
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, justifyContent: { md: "flex-end" } }}>
              <FacebookIcon />
              <LinkedInIcon />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
