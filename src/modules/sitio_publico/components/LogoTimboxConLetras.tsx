import { Box } from "@mui/material";
import logoTimboxClaro from "../../../shared/assets/logo_timbox_blanco.svg";
import logoTimboxOscuro from "../../../shared/assets/logo_timbox.svg";

interface LogoTimboxClaroProps {
  ancho?: number;
  variante?: "claro" | "oscuro";
}

export function LogoTimboxConLetras({
  ancho = 600,
  variante = "claro",
}: LogoTimboxClaroProps) {
  const logo = variante === "oscuro" ? logoTimboxOscuro : logoTimboxClaro;

  return (
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
}