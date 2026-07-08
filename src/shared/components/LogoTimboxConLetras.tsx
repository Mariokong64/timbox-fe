import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logoTimboxClaro from "../assets/logo_timbox_blanco.svg";
import logoTimboxOscuro from "../assets/logo_timbox.svg";

interface LogoTimboxConLetrasProps {
  ancho?: number;
  variante?: "claro" | "oscuro";
  to?: string;
  onClick?: () => void;
  sx?: object;
}

export function LogoTimboxConLetras({
  ancho = 600,
  variante = "claro",
  to,
  onClick,
  sx,
}: LogoTimboxConLetrasProps) {
  const logo = variante === "oscuro" ? logoTimboxOscuro : logoTimboxClaro;
  const imagen = (
    <Box
      component="img"
      src={logo}
      alt="Logo de Timbox"
      sx={{
        width: ancho,
        height: "auto",
        display: "block",
      }}
    />
  );

  if (to) {
    return (
      <Box
        component={RouterLink}
        to={to}
        aria-label="Ir al inicio"
        onClick={onClick}
        sx={{
          display: "inline-flex",
          textDecoration: "none",
          ...sx,
        }}
      >
        {imagen}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "inline-flex",
        ...sx,
      }}
    >
      {imagen}
    </Box>
  );
}
