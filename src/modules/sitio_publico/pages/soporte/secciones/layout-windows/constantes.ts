const rutasLayoutWindows = [
  "/layout-que-es-windows/",
  "/layout-windows/",
  "/layout-rep-windows/",
  "/layout-comercio-windows/",
  "/layout-windows-cartaporte/",
] as const;

const textosQueEs: Record<(typeof rutasLayoutWindows)[number], string> = {
  "/layout-que-es-windows/": "Layout ¿Qué es?",
  "/layout-windows/": "Layout  ¿Qué es?",
  "/layout-rep-windows/": "Layout ¿Que es?",
  "/layout-comercio-windows/": "Layout ¿Que es?",
  "/layout-windows-cartaporte/": "Layout  ¿Qué es?",
};

export function obtenerMenuLayoutWindows(activo: (typeof rutasLayoutWindows)[number]) {
  return [
    { texto: textosQueEs[activo], to: rutasLayoutWindows[0] },
    { texto: "Layout CFDI 4.0", to: rutasLayoutWindows[1] },
    { texto: "Layout REP 2.0", to: rutasLayoutWindows[2] },
    { texto: "Layout Comercio Exterior", to: rutasLayoutWindows[3] },
    { texto: "Layout Carta Porte", to: rutasLayoutWindows[4] },
  ];
}

export const categoriaLayoutWindows = "Layout Windows";

