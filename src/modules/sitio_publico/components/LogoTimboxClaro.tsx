import { Box } from "@mui/material";
import iconoTimbox from "../../../shared/assets/logo_timbox_blanco.svg";

interface LogoTimboxClaroProps {
  ancho?: number;
}

export function LogoTimboxClaro({ ancho = 600 }: LogoTimboxClaroProps) {
  return (
    <Box
      component="img"
      src={iconoTimbox}
      alt="Logo de Timbox"
      sx={{
        width: ancho,
        height: "auto",
        display: "block",
      }}
    />
  );
}