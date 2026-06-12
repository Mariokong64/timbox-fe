import { Box, Typography } from "@mui/material";
import iconoTimbox from "../../../shared/assets/icono_timbox.svg";

interface LogoTimboxClaroProps {
  ancho?: number;
}

export function LogoTimboxClaro({ ancho = 200 }: LogoTimboxClaroProps) {
  return (
    <Box sx={{ width: ancho, color: "#fff" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
        <Box
          component="img"
          src={iconoTimbox}
          alt=""
          sx={{ width: ancho * 0.2, height: "auto" }}
        />
        <Typography
          component="span"
          sx={{
            fontFamily: "var(--fuente-regular)",
            fontSize: ancho * 0.205,
            lineHeight: 1,
            letterSpacing: 0,
            whiteSpace: "nowrap",
          }}
        >
          Timbox
        </Typography>
      </Box>
      <Typography
        component="span"
        sx={{
          display: "block",
          mt: 0.3,
          ml: `${ancho * 0.38}px`,
          fontFamily: "var(--fuente-regular)",
          fontSize: ancho * 0.055,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        Innovación Fiscal
      </Typography>
    </Box>
  );
}
