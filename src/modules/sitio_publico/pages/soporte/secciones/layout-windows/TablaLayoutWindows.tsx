import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export type CeldaLayoutWindows = {
  t: string;
  c?: "r" | "a" | "o" | "n";
  r?: number;
  s?: number;
};

type TablaLayoutWindowsProps = {
  datos: readonly (readonly CeldaLayoutWindows[])[];
};

const colorCelda = {
  r: "#ff0000",
  a: "#f0b900",
  o: "#ff9900",
  n: "#000000",
};

export function TablaLayoutWindows({ datos }: TablaLayoutWindowsProps) {
  const [encabezado, ...filas] = datos;

  return (
    <TableContainer
      component={Box}
      sx={{ my: { xs: 2.5, md: 2 }, overflowX: "auto", bgcolor: "var(--blanco-timbox)" }}
    >
      <Table
        sx={{
          minWidth: encabezado.length === 4 ? 920 : 760,
          borderCollapse: "separate",
          borderSpacing: 0,
          tableLayout: "fixed",
        }}
      >
        <TableHead>
          <TableRow>
            {encabezado.map((celda, indice) => (
              <TableCell
                key={`${celda.t}-${indice}`}
                colSpan={celda.s}
                sx={{
                  py: { xs: 2, md: 2.35 },
                  px: { xs: 2.2, md: 2.5 },
                  width: encabezado.length === 3
                    ? indice === 0 ? "27%" : indice === 1 ? "16%" : "57%"
                    : indice === 0 ? "26%" : indice === 1 ? "22%" : indice === 2 ? "17%" : "35%",
                  bgcolor: "var(--fondo-timbox)",
                  color: "var(--azul-timbox)",
                  fontFamily: "var(--fuente-regular)",
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 700,
                  borderBottom: 0,
                }}
              >
                {celda.t}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filas.map((fila, filaIndice) => (
            <TableRow
              key={filaIndice}
              sx={{ bgcolor: filaIndice % 2 === 1 ? "var(--fondo-timbox)" : "var(--blanco-timbox)" }}
            >
              {fila.map((celda, celdaIndice) => (
                <TableCell
                  key={`${filaIndice}-${celdaIndice}`}
                  rowSpan={celda.r}
                  colSpan={celda.s}
                  sx={{
                    py: { xs: 2, md: 2.45 },
                    px: { xs: 2.2, md: 2.5 },
                    bgcolor: celda.r ? "inherit" : undefined,
                    color: celda.c ? colorCelda[celda.c] : "rgba(21, 33, 47, 0.84)",
                    fontFamily: "var(--fuente-ligera)",
                    fontSize: { xs: 16, md: 20 },
                    lineHeight: 1.5,
                    borderBottom: 0,
                    verticalAlign: "middle",
                    overflowWrap: "anywhere",
                  }}
                >
                  {celda.t}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

