export interface OpcionNavegacion {
  texto: string;
  ruta: string;
}

export interface EnlaceFooter {
  texto: string;
  url: string;
}

export const opcionesMenuPublico: OpcionNavegacion[] = [
  { texto: "Planes", ruta: "/planes" },
  { texto: "Integradores", ruta: "/integradores" },
  { texto: "Soluciones", ruta: "/soluciones" },
  { texto: "Validador", ruta: "/validador" },
  { texto: "Empresa", ruta: "/empresa" },
  { texto: "Soporte", ruta: "/soporte" },
  { texto: "Contacto", ruta: "/contacto" },
];

export const enlacesExternos = {
  registro: "https://dashboard.timbox.com.mx/registro",
  inicioSesion: "https://dashboard.timbox.com.mx/acceso",
  // registro: "http://grupotum.com:9020/registro",
  // inicioSesion: "http://grupotum.com:9020/acceso",
};

export const columnasFooter: EnlaceFooter[][] = [
  [
    { texto: "Soporte", url: "/soporte" },
    { texto: "Material de Apoyo", url: "/soporte" },
    { texto: "Políticas", url: "/politicas" },
  ],
  [
    { texto: "Aviso de privacidad integral", url: "/aviso-privacidad-integral" },
    { texto: "Ayuda", url: "/contacto" },
    { texto: "Política de protección de datos", url: "/proteccion-datos" },
    { texto: "Acuerdo Niveles de Servicios", url: "/niveles-servicio" },
  ],
  [
    { texto: "Términos y condiciones", url: "/terminos-condiciones" },
    { texto: "Preguntas frecuentes", url: "/preguntas-frecuentes" },
    { texto: "Aplicación Gratuita", url: "https://appgratis.timbox.com.mx/acceso" },
  ],
];
