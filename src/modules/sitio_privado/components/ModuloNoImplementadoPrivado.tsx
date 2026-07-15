import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

export function ModuloNoImplementadoPrivado() {

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 130px)",
        display: "grid",
        placeItems: "center",
        color: "var(--azul-timbox)",
      }}
    >
      <Box
        sx={{
          width: "min(620px, 100%)",
          border: "1px solid #dce1e7",
          borderRadius: "8px",
          bgcolor: "var(--blanco-timbox)",
          px: { xs: 2.5, sm: 4.5 },
          py: { xs: 4, sm: 5 },
          textAlign: "center",
          boxShadow: "0 18px 45px rgba(21, 33, 47, 0.08)",
        }}
      >
        <Box
          sx={{
            width: 66,
            height: 66,
            mx: "auto",
            mb: 2.5,
            borderRadius: "50%",
            bgcolor: "rgba(220, 62, 38, 0.1)",
            color: "var(--rojo-timbox)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <ConstructionRoundedIcon sx={{ fontSize: 34 }} />
        </Box>

        <Typography
          component="h1"
          sx={{
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 28, sm: 34 },
            fontWeight: 800,
            lineHeight: 1.15,
            mb: 1.2,
          }}
        >
          MÓDULO AÚN NO DISPONIBLE
        </Typography>

        <Typography
          sx={{
            color: "#6b7685",
            fontFamily: "var(--fuente-regular)",
            fontSize: 16,
            lineHeight: 1.6,
            mb: 3,
          }}
        >
          El presente módulo está en desarrollo y aún no se encuentra disponible.
        </Typography>

        <Button
          component={RouterLink}
          to="/privado"
          startIcon={<DashboardRoundedIcon />}
          sx={{
            minHeight: 40,
            px: 2.4,
            borderRadius: "6px",
            bgcolor: "var(--rojo-timbox)",
            color: "var(--blanco-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontWeight: 700,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#f04a32",
            },
          }}
        >
          Ir al dashboard
        </Button>
      </Box>
    </Box>
  );
}
