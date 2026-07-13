import { NavLink } from "react-router-dom";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import iconoTimbox from "../../../shared/assets/icono_timbox.svg";
import { LogoTimboxConLetras } from "../../../shared/components/LogoTimboxConLetras";
import { opcionesMenuPrivado } from "./opcionesMenuPrivado";

interface MenuLateralPrivadoProps {
  abierto: boolean;
  onAlternar: () => void;
}

const anchoMenuAbierto = 300;
const anchoMenuCerrado = 86;

export function MenuLateralPrivado({ abierto, onAlternar }: MenuLateralPrivadoProps) {
  return (
    <Box
      component="aside"
      sx={{
        position: "relative",
        zIndex: 5,
        width: { xs: "100%", md: abierto ? anchoMenuAbierto : anchoMenuCerrado },
        minHeight: { xs: "auto", md: "100vh" },
        bgcolor: "var(--azul-timbox)",
        color: "var(--blanco-timbox)",
        px: abierto ? 3 : 1.3,
        py: 1.2,
        transition: "width 220ms ease, padding 220ms ease",
        boxShadow: "8px 0 22px rgba(0, 0, 0, 0.12)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          minHeight: 82,
          display: "grid",
          gridTemplateColumns: abierto ? "1fr 38px" : "1fr",
          alignItems: "start",
          gap: 1,
        }}
      >
        {abierto ? (
          <LogoTimboxConLetras ancho={214} variante="claro" to="/privado" />
        ) : (
          <Box
            component={NavLink}
            to="/privado"
            aria-label="Ir al dashboard"
            sx={{
              display: "grid",
              placeItems: "center",
              width: 48,
              height: 48,
              mx: "auto",
              textDecoration: "none",
            }}
          >
            <Box component="img" src={iconoTimbox} alt="" sx={{ width: 34, display: "block" }} />
          </Box>
        )}

        <Tooltip title={abierto ? "Contraer menú" : "Abrir menú"} placement="right">
          <IconButton
            type="button"
            aria-label={abierto ? "Contraer menú" : "Abrir menú"}
            onClick={onAlternar}
            sx={{
              justifySelf: abierto ? "end" : "center",
              mt: 0.4,
              color: "var(--blanco-timbox)",
              bgcolor: "rgba(255, 255, 255, 0.08)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.16)",
              },
            }}
          >
            {abierto ? <ChevronLeftRoundedIcon /> : <ChevronRightRoundedIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Box component="nav" sx={{ display: "grid", gap: 1.3, mt: { xs: 1, md: 6 } }}>
        {opcionesMenuPrivado.map((opcion) => {
          const Icono = opcion.icono;

          return (
            <Tooltip key={opcion.ruta} title={abierto ? "" : opcion.texto} placement="right">
              <Box
                component={NavLink}
                to={opcion.ruta}
                end
                sx={{
                  position: "relative",
                  minHeight: 50,
                  px: abierto ? 0 : 1,
                  display: "grid",
                  gridTemplateColumns: abierto ? "28px 1fr" : "1fr",
                  alignItems: "center",
                  justifyItems: abierto ? "start" : "center",
                  columnGap: 1.2,
                  color: "rgba(255, 255, 255, 0.82)",
                  textDecoration: "none",
                  fontFamily: "var(--fuente-regular)",
                  borderRadius: "6px",
                  transition: "background-color 180ms ease, color 180ms ease",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                    color: "var(--blanco-timbox)",
                  },
                  "&.active": {
                    color: "var(--blanco-timbox)",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: abierto ? 0 : "50%",
                      bottom: 2,
                      width: abierto ? 162 : 34,
                      height: 5,
                      transform: abierto ? "none" : "translateX(-50%)",
                      bgcolor: "var(--rojo-timbox)",
                    },
                  },
                }}
              >
                <Icono sx={{ fontSize: 27, color: "currentColor" }} />
                {abierto && (
                  <Typography
                    sx={{
                      fontFamily: "var(--fuente-regular)",
                      fontSize: 23,
                      fontWeight: 700,
                      lineHeight: 1.15,
                      whiteSpace: "normal",
                    }}
                  >
                    {opcion.texto}
                  </Typography>
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
