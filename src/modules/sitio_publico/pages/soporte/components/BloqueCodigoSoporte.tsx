import { Box } from "@mui/material";
import type { ReactNode } from "react";

type BloqueCodigoSoporteProps = {
  codigo: string;
};

const coloresXml = {
  etiqueta: "#ff2b78",
  valor: "#9cff10",
  texto: "#ffffff",
};

function resaltarEtiquetaXml(etiqueta: string, llave: string): ReactNode {
  return (
    <Box component="span" key={llave}>
      {etiqueta.split(/("[^"]*")/g).map((parte, indice) => {
        if (!parte) {
          return null;
        }

        return (
          <Box
            component="span"
            key={`${llave}-${indice}`}
            sx={{ color: parte.startsWith('"') ? coloresXml.valor : coloresXml.etiqueta }}
          >
            {parte}
          </Box>
        );
      })}
    </Box>
  );
}

function resaltarXml(codigo: string): ReactNode[] {
  return codigo.split(/(<[^>]+>)/g).map((parte, indice) => {
    if (!parte) {
      return null;
    }

    const esEtiqueta = parte.startsWith("<") && parte.endsWith(">");

    if (esEtiqueta) {
      return resaltarEtiquetaXml(parte, `tag-${indice}`);
    }

    return (
      <Box component="span" key={`text-${indice}`} sx={{ color: coloresXml.texto }}>
        {parte}
      </Box>
    );
  });
}

export function BloqueCodigoSoporte({ codigo }: BloqueCodigoSoporteProps) {
  return (
    <Box
      component="pre"
      sx={{
        my: { xs: 2.5, md: 2 },
        p: { xs: 2.2, md: 1.25 },
        height: "auto",
        overflowX: "auto",
        overflowY: "visible",
        bgcolor: "#20231d",
        color: coloresXml.texto,
        border: 0,
        fontFamily: "'Consolas', 'Courier New', monospace",
        fontSize: { xs: 13, md: 17 },
        lineHeight: 1.55,
        whiteSpace: "pre",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255, 255, 255, 0.36) transparent",
        "&::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: "rgba(255, 255, 255, 0.36)",
        },
      }}
    >
      <Box component="code" sx={{ display: "block", minWidth: "max-content" }}>
        {resaltarXml(codigo)}
      </Box>
    </Box>
  );
}
