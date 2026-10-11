import type { ReactNode } from "react";
import {
  Box,
  CircularProgress,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  type TableCellProps,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface ColumnaTablaPrivada {
  id: string;
  titulo: string;
  align?: TableCellProps["align"];
}

interface TablaPrivadaProps {
  columnas: ColumnaTablaPrivada[];
  filas: ReactNode;
  anchoMinimo: number;
  cargando: boolean;
  vacia: boolean;
  mensajeCargando: string;
  mensajeVacio: string;
  descripcionVacio?: string;
  busqueda: string;
  onCambiarBusqueda: (valor: string) => void;
  herramientas?: ReactNode;
}

export function TablaPrivada({
  columnas,
  filas,
  anchoMinimo,
  cargando,
  vacia,
  mensajeCargando,
  mensajeVacio,
  descripcionVacio,
  busqueda,
  onCambiarBusqueda,
  herramientas,
}: TablaPrivadaProps) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, mb: 1.8 }}>
        {herramientas}
        <TextField
          size="small"
          placeholder="Buscar"
          value={busqueda}
          onChange={(event) => onCambiarBusqueda(event.target.value)}
          sx={{ ml: { sm: "auto" }, width: { xs: "100%", sm: 340 }, "& .MuiOutlinedInput-root": { borderRadius: "20px" } }}
          slotProps={{
            htmlInput: { "aria-label": "Buscar en estos resultados" },
            input: { startAdornment: <InputAdornment position="start"><SearchRoundedIcon /></InputAdornment> },
          }}
        />
      </Box>
      <Box sx={{ border: "1px solid #dce1e7", borderRadius: "8px", overflow: "hidden", bgcolor: "white" }}>
        {cargando ? (
          <Box sx={{ py: 8, display: "grid", placeItems: "center", gap: 1.5 }}>
            <CircularProgress size={30} sx={{ color: "var(--rojo-timbox)" }} />
            <Typography color="#687485">{mensajeCargando}</Typography>
          </Box>
        ) : vacia ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography sx={{ fontWeight: 700 }}>{mensajeVacio}</Typography>
            {descripcionVacio && (
              <Typography sx={{ color: "#6b7685", mt: 0.5 }}>{descripcionVacio}</Typography>
            )}
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto", maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
            <Table stickyHeader sx={{ minWidth: anchoMinimo }}>
              <TableHead>
                <TableRow sx={{ "& th": { bgcolor: "var(--azul-timbox)", color: "white", fontWeight: 800 } }}>
                  {columnas.map((columna) => (
                    <TableCell key={columna.id} align={columna.align}>{columna.titulo}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{filas}</TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </Box>
  );
}
