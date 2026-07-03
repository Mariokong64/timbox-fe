import { Box, Link } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface RectanguloPlanProps {
  texto: string;
  href: string;
}

export function RectanguloPlan({ texto, href }: RectanguloPlanProps) {
  return (
    <Link
      href={href}
      underline="none"
      sx={{
        minHeight: { xs: 130, md: 145 },
        bgcolor: "var(--fondo-timbox)",
        color: "var(--azul-timbox)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 4, md: 6 },
        fontFamily: "var(--fuente-ligera)",
        fontSize: { xs: 25, md: 30 },
        lineHeight: 1,
        transition: "background-color 180ms ease, color 180ms ease",
        "&:hover": {
          bgcolor: "var(--azul-timbox)",
          color: "var(--blanco-timbox)",
        },
        "&:hover .flecha-plan": {
          borderColor: "var(--blanco-timbox)",
        },
      }}
    >
      {texto}
      <Box
        component="span"
        className="flecha-plan"
        sx={{
          width: 52,
          height: 52,
          border: "1px solid var(--azul-timbox)",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          transition: "border-color 180ms ease",
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
      </Box>
    </Link>
  );
}
