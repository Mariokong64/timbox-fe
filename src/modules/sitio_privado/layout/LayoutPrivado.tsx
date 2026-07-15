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
        height: { xs: "auto", md: "100vh" },
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: menuAbierto ? "300px minmax(0, 1fr)" : "86px minmax(0, 1fr)" },
        bgcolor: "var(--blanco-timbox)",
        overflow: { xs: "visible", md: "hidden" },
        transition: "grid-template-columns 220ms ease",
      }}
    >
      <MenuLateralPrivado abierto={menuAbierto} onAlternar={() => setMenuAbierto((actual) => !actual)} />

      <Box
        sx={{
          minWidth: 0,
          minHeight: 0,
          height: { xs: "auto", md: "100vh" },
          display: "grid",
          gridTemplateRows: "80px minmax(0, 1fr)",
          overflow: { xs: "visible", md: "hidden" },
        }}
      >
        <NavbarPrivado />

        <Box
          component="main"
          sx={{
            minHeight: 0,
            minWidth: 0,
            height: { xs: "auto", md: "100%" },
            px: { xs: 2, md: 3.2 },
            py: 2.5,
            overflowX: "hidden",
            overflowY: { xs: "visible", md: "auto" },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
