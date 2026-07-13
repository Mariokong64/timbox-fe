import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { MenuLateralPrivado } from "./MenuLateralPrivado";
import { NavbarPrivado } from "./NavbarPrivado";

export function LayoutPrivado() {
  const [menuAbierto, setMenuAbierto] = useState(true);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: menuAbierto ? "300px minmax(0, 1fr)" : "86px minmax(0, 1fr)" },
        bgcolor: "var(--blanco-timbox)",
        transition: "grid-template-columns 220ms ease",
      }}
    >
      <MenuLateralPrivado abierto={menuAbierto} onAlternar={() => setMenuAbierto((actual) => !actual)} />

      <Box sx={{ minWidth: 0, display: "grid", gridTemplateRows: "80px minmax(0, 1fr)" }}>
        <NavbarPrivado />

        <Box
          component="main"
          sx={{
            minHeight: "calc(100vh - 80px)",
            minWidth: 0,
            px: { xs: 2, md: 3.2 },
            py: 2.5,
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
