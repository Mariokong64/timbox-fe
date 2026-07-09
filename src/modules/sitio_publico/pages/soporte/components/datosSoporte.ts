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
      { texto: "Cancelar", href: "https://www.timbox.com.mx/cancelar-cfdi/" },
      { texto: "Utilerías", href: "https://www.timbox.com.mx/buscar-cfdis/" },
      { texto: "Retenciones", href: "https://www.timbox.com.mx/timbrar-retenciones/" },
      { texto: "Servicios de validación", href: "https://www.timbox.com.mx/validar-cfdi/" },
      { texto: "Manifiesto", href: "https://www.timbox.com.mx/firmar-manifiesto/" },
    ],
  },
  {
    titulo: "Material de apoyo",
    enlaces: [
      { texto: "Generar CFDI", href: "https://www.timbox.com.mx/generar-cfdi/" },
      { texto: "Generar CFDI Retenciones", href: "https://www.timbox.com.mx/generar-cfdi-retenciones/" },
      { texto: "Generar Certificado", href: "https://www.timbox.com.mx/generar-certificado/" },
      { texto: "Generar Sello", href: "https://www.timbox.com.mx/generar-sello/" },
      { texto: "RFC's Ambiente de Pruebas SAT", href: "https://www.timbox.com.mx/rfcs-ambiente-de-pruebas-sat/" },
      { texto: "Ejemplos", href: "https://www.timbox.com.mx/timbox-integracion/" },
    ],
  },
  {
    titulo: "Integración con TXT",
    enlaces: [
      { texto: "TXT ¿Qué es?", href: "https://www.timbox.com.mx/layout-que-es/" },
      { texto: "TXT CFDI 4.0", href: "https://www.timbox.com.mx/layout-cfdi-4-0/" },
      { texto: "TXT Nómina", href: "https://www.timbox.com.mx/layout-nomina/" },
    ],
  },
  {
    titulo: "Layout Windows",
    enlaces: [
      { texto: "Layout - Windows ¿Qué es?", href: "https://www.timbox.com.mx/layout-que-es-windows/" },
      { texto: "Layout CFDI 4.0 Windows", href: "https://www.timbox.com.mx/layout-windows/" },
      { texto: "Layout REP 2.0", href: "https://www.timbox.com.mx/layout-rep-windows/" },
      { texto: "Layout Comercio Exterior", href: "https://www.timbox.com.mx/layout-comercio-windows/" },
      { texto: "Layout Carta Porte", href: "https://www.timbox.com.mx/layout-windows-cartaporte/" },
    ],
  },
];
