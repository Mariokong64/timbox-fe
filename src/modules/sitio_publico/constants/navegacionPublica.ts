export interface OpcionNavegacion {
  texto: string;
  ruta: string;
}

export interface EnlaceFooter {
  texto: string;
  url: string;
}

export const opcionesMenuPublico: OpcionNavegacion[] = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Empresa", ruta: "/empresa" },
  { texto: "Planes", ruta: "/planes" },
  { texto: "Integración", ruta: "/integracion" },
  { texto: "Soluciones", ruta: "/soluciones" },
  { texto: "Soporte", ruta: "/soporte" },
  { texto: "Validador", ruta: "/validador" },
  { texto: "Contacto", ruta: "/contacto" },
];

export const enlacesExternos = {
  registro: "https://dashboard.timbox.com.mx/registro",
  inicioSesion: "https://dashboard.timbox.com.mx/acceso",
};

export const columnasFooter: EnlaceFooter[][] = [
  [
    { texto: "Soporte", url: "/soporte" },
    { texto: "Material de Apoyo", url: "/soporte" },
    { texto: "Políticas", url: "/politicas" },
  ],
  [
    { texto: "Aviso de privacidad integral", url: "/aviso-privacidad" },
    { texto: "Ayuda", url: "/ayuda" },
    { texto: "Política de protección de datos", url: "/proteccion-datos" },
    { texto: "Acuerdo Niveles de Servicios", url: "/niveles-servicio" },
  ],
  [
    { texto: "Términos y condiciones", url: "/terminos-condiciones" },
    { texto: "Preguntas frecuentes", url: "/preguntas-frecuentes" },
    { texto: "Aplicación Gratuita", url: "https://appgratis.timbox.com.mx/acceso" },
  ],
];
