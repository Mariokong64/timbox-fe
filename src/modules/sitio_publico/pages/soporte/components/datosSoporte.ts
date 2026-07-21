export type EnlaceSoporte = {
  texto: string;
  href: string;
};

export type GrupoSoporte = {
  titulo: string;
  enlaces: EnlaceSoporte[];
};

export const gruposSoporte: GrupoSoporte[] = [
  {
    titulo: "Documentación",
    enlaces: [
      { texto: "Timbrar", href: "/timbrar-cfdi" },
      { texto: "Cancelar", href: "/cancelar-cfdi/" },
      { texto: "Utilerías", href: "/buscar-cfdis/" },
      { texto: "Retenciones", href: "/timbrar-retenciones/" },
      { texto: "Servicios de validación", href: "/validar-cfdi/" },
      { texto: "Manifiesto", href: "/firmar-manifiesto/" },
    ],
  },
  {
    titulo: "Material de apoyo",
    enlaces: [
      { texto: "Generar CFDI", href: "/generar-cfdi/" },
      { texto: "Generar CFDI Retenciones", href: "/generar-cfdi-retenciones/" },
      { texto: "Generar Certificado", href: "/generar-certificado/" },
      { texto: "Generar Sello", href: "/generar-sello/" },
      { texto: "RFC's Ambiente de Pruebas SAT", href: "/rfcs-ambiente-de-pruebas-sat/" },
      { texto: "Ejemplos", href: "/timbox-integracion/" },
    ],
  },
  {
    titulo: "Integración con TXT",
    enlaces: [
      { texto: "TXT ¿Qué es?", href: "/layout-que-es/" },
      { texto: "TXT CFDI 4.0", href: "/layout-cfdi-4-0/" },
      { texto: "TXT Nómina", href: "/layout-nomina/" },
    ],
  },
  {
    titulo: "Layout Windows",
    enlaces: [
      { texto: "Layout - Windows ¿Qué es?", href: "/layout-que-es-windows/" },
      { texto: "Layout CFDI 4.0 Windows", href: "/layout-windows/" },
      { texto: "Layout REP 2.0", href: "/layout-rep-windows/" },
      { texto: "Layout Comercio Exterior", href: "/layout-comercio-windows/" },
      { texto: "Layout Carta Porte", href: "/layout-windows-cartaporte/" },
    ],
  },
];
