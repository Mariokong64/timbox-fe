import { Box } from "@mui/material";
import { RectanguloPlan } from "./components/RectanguloPlan";
import { TarjetaPlan } from "./components/TarjetaPlan";

export function Planes() {
  return (
    <Box component="section" sx={{ bgcolor: "var(--blanco-timbox)" }}>
      <Box
        sx={{
          width: "min(1180px, 90vw)",
          mx: "auto",
          pt: { xs: 24, md: 25 },
          pb: { xs: 6, md: 6 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 4, md: 12 },
        }}
      >
        <TarjetaPlan
          titulo="Bajo demanda"
          subtitulo="Cantidad de timbres: Ilimitados"
          vigencia="Vigencia: Mensual"
          descripcion="El cobro se realiza de manera mensual dependiendo del número de timbres generados."
          variante="gris"
        />

        <TarjetaPlan
          titulo="Timbres Prepago"
          subtitulo="Compra mínima de 100 timbres"
          vigencia="Sin Vigencia"
          descripcion="Se realiza el pago en una sola exhibición y se asignan los timbres comprados."
          variante="rojo"
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          bgcolor: "var(--fondo-timbox)",
        }}
      >
        <RectanguloPlan texto="Preguntas frecuentes" href="planes/preguntas-frecuentes" />
        <RectanguloPlan texto="Información general" href="/contacto" />
      </Box>
    </Box>
  );
}
