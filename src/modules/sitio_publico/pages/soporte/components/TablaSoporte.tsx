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
        my: { xs: 2.5, md: 2 },
        overflowX: "auto",
        border: 0,
        bgcolor: "var(--blanco-timbox)",
      }}
    >
      <Table sx={{ minWidth: 620, borderCollapse: "separate", borderSpacing: 0, tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            {columnas.map((columna) => (
              <TableCell
                key={columna}
                sx={{
                  py: { xs: 2, md: 2.35 },
                  px: { xs: 2.2, md: 2.5 },
                  bgcolor: "var(--fondo-timbox)",
                  color: "var(--azul-timbox)",
                  fontFamily: "var(--fuente-regular)",
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 700,
                  borderBottom: 0,
                }}
              >
                {columna}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filas.map((fila, indice) => (
            <TableRow
              key={indice}
              sx={{
                bgcolor: indice % 2 === 1 ? "var(--fondo-timbox)" : "var(--blanco-timbox)",
              }}
            >
              {fila.map((celda, celdaIndice) => (
                <TableCell
                  key={`${indice}-${celdaIndice}`}
                  sx={{
                    py: { xs: 2, md: 2.45 },
                    px: { xs: 2.2, md: 2.5 },
                    color: "rgba(21, 33, 47, 0.76)",
                    fontFamily: "var(--fuente-ligera)",
                    fontSize: { xs: 16, md: 20 },
                    lineHeight: 1.5,
                    borderBottom: 0,
                    verticalAlign: "middle",
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
