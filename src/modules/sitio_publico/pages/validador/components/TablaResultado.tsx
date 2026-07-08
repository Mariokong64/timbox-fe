import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import type { FilaTablaResultado } from "../servicio/validadorServicio";

interface TablaResultadoProps {
  columnas: string[];
  filas: FilaTablaResultado[];
  mostrarEstatus?: boolean;
}

export function TablaResultado({ columnas, filas, mostrarEstatus = false }: TablaResultadoProps) {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Table
        sx={{
          minWidth: mostrarEstatus ? 920 : 620,
          border: "1px solid #d8dee4",
          "& th, & td": {
            border: "1px solid #d8dee4",
            fontFamily: "var(--fuente-ligera)",
            color: "var(--azul-timbox)",
            textAlign: "center",
            verticalAlign: "top",
          },
          "& th": {
            fontFamily: "var(--fuente-regular)",
            fontSize: 16,
            py: 1.7,
          },
          "& td": {
            fontSize: 15,
            lineHeight: 1.45,
            py: 1.6,
          },
        }}
      >
        <TableHead>
          <TableRow>
            {columnas.map((columna) => (
              <TableCell key={columna}>{columna}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {filas.map((fila) => (
            <TableRow key={`${fila.atributo}-${fila.valor}`}>
              <TableCell sx={{ width: 155 }}>{fila.atributo}</TableCell>
              <TableCell>
                <Box sx={{ maxWidth: 1360, mx: "auto", overflowX: "auto", whiteSpace: "normal", wordBreak: "break-word" }}>
                  {fila.valor}
                </Box>
              </TableCell>
              {mostrarEstatus && (
                <TableCell sx={{ width: 76 }}>
                  {fila.estatus === false ? (
                    <CloseIcon sx={{ color: "red", fontSize: 22, fontWeight: 700 }} />
                  ) : (
                    <CheckIcon sx={{ color: "green", fontSize: 22, fontWeight: 700 }} />
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
