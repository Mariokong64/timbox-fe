import { useState } from "react";
import { Box, Collapse, IconButton, Link, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface EnlaceHerramienta {
  texto: string;
  href: string;
}

interface TarjetaHerramientaProps {
  titulo: string;
  enlaces: EnlaceHerramienta[];
}

export function TarjetaHerramienta({ titulo, enlaces }: TarjetaHerramientaProps) {
  const [abierta, setAbierta] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: "var(--blanco-timbox)",
        px: { xs: 2, md: 5 },
        py: { xs: 4.5, md: 4 },
        minHeight: abierta ? { xs: "auto", md: 330 } : { xs: 112, md: 116 },
        transition: "min-height 220ms ease",
      }}
    >
      <Box
        component="button"
        type="button"
        onClick={() => setAbierta((valor) => !valor)}
        aria-expanded={abierta}
        sx={{
          width: "100%",
          border: 0,
          bgcolor: "transparent",
          color: "var(--azul-timbox)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 2, md: 5 },
          cursor: "pointer",
          p: 0,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 26, md: 30 },
            lineHeight: 1,
          }}
        >
          {titulo}
        </Typography>

        <IconButton
          component="span"
          aria-hidden="true"
          tabIndex={-1}
          sx={{
            width: 44,
            height: 44,
            border: "1px solid var(--azul-timbox)",
            color: "var(--azul-timbox)",
            transform: abierta ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 180ms ease",
            pointerEvents: "none",
          }}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Collapse in={abierta} timeout={220}>
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            p: 0,
            mt: { xs: 5, md: 6 },
            mb: 0,
            mx: "auto",
            maxWidth: 520,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            columnGap: { xs: 2, md: 7 },
            rowGap: 1.2,
          }}
        >
          {enlaces.map((enlace) => (
            <Box component="li" key={enlace.href}>
              <Link
                href={enlace.href}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{
                  color: "var(--azul-timbox)",
                  fontFamily: "var(--fuente-ligera)",
                  fontSize: { xs: 24, md: 30 },
                  lineHeight: 1.25,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {enlace.texto}
              </Link>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
