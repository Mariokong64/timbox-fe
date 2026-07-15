import { useMemo, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { cerrarSesion, obtenerSesionGuardada } from "../login/servicio/autenticacionServicio";

export function NavbarPrivado() {
  const navigate = useNavigate();
  const sesion = obtenerSesionGuardada();
  const [menuCuenta, setMenuCuenta] = useState<HTMLElement | null>(null);
  const menuAbierto = Boolean(menuCuenta);
  const iniciales = useMemo(() => {
    const nombre = sesion?.usuario.nombre || sesion?.usuario.usuario || "U";

    return nombre
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0]?.toUpperCase())
      .join("");
  }, [sesion]);

  const abrirMenuCuenta = (event: MouseEvent<HTMLElement>) => {
    setMenuCuenta(event.currentTarget);
  };

  const cerrarMenuCuenta = () => {
    setMenuCuenta(null);
  };

  const navegarA = (ruta: string) => {
    cerrarMenuCuenta();
    navigate(ruta);
  };

  const cerrarSesionActual = () => {
    cerrarMenuCuenta();
    cerrarSesion();
    navigate("/login", { replace: true });
  };

  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        zIndex: 1,
        minHeight: 80,
        bgcolor: "var(--rojo-timbox)",
        color: "var(--blanco-timbox)",
        px: { xs: 2.5, md: 3 },
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        component="button"
        type="button"
        aria-label="Abrir menu de usuario"
        aria-controls={menuAbierto ? "menu-cuenta-privada" : undefined}
        aria-haspopup="menu"
        aria-expanded={menuAbierto ? "true" : undefined}
        onClick={abrirMenuCuenta}
        sx={{
          border: 0,
          bgcolor: "transparent",
          color: "var(--blanco-timbox)",
          cursor: "pointer",
          p: 0.6,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: 1.4,
          transition: "background-color 180ms ease",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.12)",
          },
          "&:focus-visible": {
            outline: "2px solid rgba(255, 255, 255, 0.86)",
            outlineOffset: 2,
          },
        }}
      >
        <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: { xs: 15, md: 18 }, fontWeight: 700 }}>
          {sesion?.usuario.nombre ?? "Usuario"}
        </Typography>

        <Box
          sx={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            border: "2px solid var(--azul-timbox)",
            bgcolor: "var(--azul-timbox)",
            color: "var(--blanco-timbox)",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--fuente-regular)",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {iniciales || "U"}
        </Box>
      </Box>

      <Menu
        id="menu-cuenta-privada"
        anchorEl={menuCuenta}
        open={menuAbierto}
        onClose={cerrarMenuCuenta}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 230,
              borderRadius: "8px",
              border: "1px solid #dce1e7",
              boxShadow: "0 18px 45px rgba(21, 33, 47, 0.18)",
            },
          },
          list: {
            sx: {
              py: 0.8,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.1 }}>
          <Typography sx={{ color: "var(--azul-timbox)", fontFamily: "var(--fuente-regular)", fontSize: 14, fontWeight: 800 }} noWrap>
            {sesion?.usuario.nombre ?? "Usuario"}
          </Typography>
          <Typography sx={{ color: "#6b7685", fontFamily: "var(--fuente-regular)", fontSize: 12.5 }} noWrap>
            {sesion?.usuario.correo ?? "Sin correo"}
          </Typography>
        </Box>

        <Divider sx={{ my: 0.6 }} />

        <MenuItem onClick={() => navegarA("/privado/perfil")} sx={{ fontFamily: "var(--fuente-regular)", fontSize: 14.5 }}>
          <ListItemIcon>
            <PersonRoundedIcon fontSize="small" sx={{ color: "var(--azul-timbox)" }} />
          </ListItemIcon>
          Ver perfil
        </MenuItem>

        <MenuItem onClick={() => navegarA("/")} sx={{ fontFamily: "var(--fuente-regular)", fontSize: 14.5 }}>
          <ListItemIcon>
            <HomeRoundedIcon fontSize="small" sx={{ color: "var(--azul-timbox)" }} />
          </ListItemIcon>
          Ir a sitio publico
        </MenuItem>

        <Divider sx={{ my: 0.6 }} />

        <MenuItem onClick={cerrarSesionActual} sx={{ color: "var(--rojo-timbox)", fontFamily: "var(--fuente-regular)", fontSize: 14.5, fontWeight: 700 }}>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" sx={{ color: "var(--rojo-timbox)" }} />
          </ListItemIcon>
          Cerrar sesion
        </MenuItem>
      </Menu>
    </Box>
  );
}
