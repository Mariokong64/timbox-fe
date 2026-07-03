import { Box } from "@mui/material";
import logoSat from "../../../shared/assets/logo_SAT.png";

const LOGO_SAT_WIDTH = 150;
const LOGO_SAT_HEIGHT = 226.65;

export function LogoSat() {
  return (
    <Box
      component="a"
      href="http://omawww.sat.gob.mx/tramitesyservicios/Paginas/pac_timbox.htm"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "block",
        width: LOGO_SAT_WIDTH,
        height: LOGO_SAT_HEIGHT,
      }}
    >
      <Box
        component="img"
        src={logoSat}
        alt="SAT Proveedor Autorizado PCCFDI 0184"
        sx={{
          display: "block",
          width: LOGO_SAT_WIDTH,
          height: LOGO_SAT_HEIGHT,
          objectFit: "contain",
          opacity: 0.58,
        }}
      />
    </Box>
  );
}