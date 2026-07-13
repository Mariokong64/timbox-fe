import { Box, MenuItem, Select, Typography } from "@mui/material";
import bandejaEntradaIcono from "../../../../shared/assets/icons/bandeja-de-entrada.png";
import campanaIcono from "../../../../shared/assets/icons/campana-de-notificacion.png";
import intercambiarCorreosIcono from "../../../../shared/assets/icons/intercambiar-correos.png";

const tarjetas = [
  {
    titulo: "Total de solicitudes",
    valor: "975",
    color: "var(--azul-timbox)",
    icono: campanaIcono,
  },
  {
    titulo: "Solicitudes atendidas",
    valor: "75",
    color: "var(--rojo-timbox)",
    icono: intercambiarCorreosIcono,
  },
  {
    titulo: "Solicitudes por atender",
    valor: "900",
    color: "#d4d4d4",
    icono: bandejaEntradaIcono,
  },
];

const semanas = [
  { etiqueta: "Semana 1", valor: 75 },
  { etiqueta: "Semana 2", valor: 325 },
  { etiqueta: "Semana 3", valor: 575 },
  { etiqueta: "Semana 4", valor: 0 },
];

export function DashboardPrivado() {
  return (
    <Box sx={{ color: "#111", fontFamily: "var(--fuente-regular)" }}>
      <Typography component="h1" sx={{ fontFamily: "var(--fuente-regular)", fontSize: 26, fontWeight: 700, mb: 1.8 }}>
        Dashboard
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.8, mb: 4 }}>
        {["2026", "Mayo", "Todo el mes"].map((valor, indice) => (
          <Box key={valor} sx={{ width: { xs: "100%", sm: 180 } }}>
            <Typography sx={{ color: "#b2b2b2", fontSize: 14 }}>
              {indice === 0 ? "Año" : indice === 1 ? "Mes" : "Semana"}
            </Typography>
            <Select
              size="small"
              value={valor}
              fullWidth
              sx={{
                height: 32,
                bgcolor: "var(--blanco-timbox)",
                borderRadius: 1,
                fontFamily: "var(--fuente-ligera)",
                fontSize: 18,
              }}
            >
              <MenuItem value={valor}>{valor}</MenuItem>
            </Select>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" }, gap: { xs: 2.5, md: 9 }, mb: 6 }}>
        {tarjetas.map((tarjeta) => (
          <Box
            key={tarjeta.titulo}
            sx={{
              width: "min(275px, 100%)",
              mx: "auto",
              border: "3px solid",
              borderColor: tarjeta.color,
              borderRadius: "8px",
              overflow: "hidden",
              bgcolor: "var(--blanco-timbox)",
            }}
          >
            <Box sx={{ height: 32, bgcolor: tarjeta.color, borderRadius: "0 0 8px 8px" }} />
            <Box sx={{ minHeight: 106, px: 2, py: 1.2, display: "grid", gridTemplateColumns: "58px 1fr", alignItems: "center" }}>
              <Box component="img" src={tarjeta.icono} alt="" sx={{ width: 45, justifySelf: "center" }} />
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 19, fontFamily: "var(--fuente-ligera)" }}>{tarjeta.titulo}</Typography>
                <Typography sx={{ color: tarjeta.color, fontSize: 48, fontWeight: 800, lineHeight: 1 }}>{tarjeta.valor}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "380px minmax(0, 1fr)" }, gap: { xs: 5, lg: 8 }, alignItems: "center" }}>
        <Box
          sx={{
            width: 280,
            height: 280,
            mx: "auto",
            borderRadius: "50%",
            border: "18px solid #e5e5e5",
            borderTopColor: "#376df0",
            borderRightColor: "#376df0",
            borderBottomColor: "#376df0",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: 42, fontWeight: 800, lineHeight: 1 }}>84.89%</Typography>
            <Typography sx={{ color: "#777", fontSize: 16 }}>Meta 95%</Typography>
            <Typography sx={{ color: "#376df0", fontSize: 13, fontWeight: 700, mt: 1 }}>+0.5% vs la semana anterior</Typography>
          </Box>
        </Box>

        <Box sx={{ minHeight: 300, display: "grid", alignItems: "end", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, borderLeft: "4px solid #376df0", borderBottom: "4px solid #376df0", px: 2, pt: 2 }}>
          {semanas.map((semana) => (
            <Box key={semana.etiqueta} sx={{ alignSelf: "end", textAlign: "center" }}>
              <Typography sx={{ fontSize: 12, mb: 0.6 }}>{semana.valor || ""}</Typography>
              <Box
                sx={{
                  height: Math.max(5, semana.valor * 0.38),
                  bgcolor: semana.valor ? "var(--azul-timbox)" : "transparent",
                  width: "70%",
                  mx: "auto",
                }}
              />
              <Typography sx={{ fontSize: 12, mt: 1 }}>{semana.etiqueta}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
