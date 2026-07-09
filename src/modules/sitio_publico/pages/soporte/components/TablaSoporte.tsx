import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { ReactNode } from "react";

type TablaSoporteProps = {
  columnas: string[];
  filas: ReactNode[][];
};

export function TablaSoporte({ columnas, filas }: TablaSoporteProps) {
  return (
    <TableContainer
      component={Box}
      sx={{
        my: 3,
        overflowX: "auto",
        border: "1px solid rgba(21, 33, 47, 0.12)",
        bgcolor: "rgba(255, 255, 255, 0.55)",
      }}
    >
      <Table size="small" sx={{ minWidth: 620 }}>
        <TableHead>
          <TableRow>
            {columnas.map((columna) => (
              <TableCell
                key={columna}
                sx={{
                  py: 1.6,
                  px: 2,
                  color: "var(--azul-timbox)",
                  fontFamily: "var(--fuente-regular)",
                  fontSize: 16,
                  fontWeight: 700,
                  borderBottom: "1px solid rgba(21, 33, 47, 0.18)",
                }}
              >
                {columna}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filas.map((fila, indice) => (
            <TableRow key={indice}>
              {fila.map((celda, celdaIndice) => (
                <TableCell
                  key={`${indice}-${celdaIndice}`}
                  sx={{
                    py: 1.45,
                    px: 2,
                    color: "rgba(21, 33, 47, 0.76)",
                    fontFamily: celdaIndice === 0 ? "var(--fuente-regular)" : "var(--fuente-ligera)",
                    fontSize: 16,
                    lineHeight: 1.45,
                    borderBottom: "1px solid rgba(21, 33, 47, 0.08)",
                    verticalAlign: "top",
                    "& a": {
                      color: "var(--rojo-timbox)",
                      textDecoration: "none",
                    },
                    "& a:hover": { textDecoration: "underline" },
                  }}
                >
                  {celda}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
