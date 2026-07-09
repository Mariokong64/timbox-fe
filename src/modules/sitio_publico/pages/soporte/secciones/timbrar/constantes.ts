import imagenDudasTres from "../../assets/Componente-32.png";
import imagenDudasDos from "../../assets/Componente-34.png";
import imagenDudasUno from "../../assets/Componente-35.png";
import imagenDudasCuatro from "../../assets/Componente-36.png";

export const menuTimbrar = [
  { texto: "Timbrar CFDI", to: "/timbrar-cfdi" },
  { texto: "Timbrar CFDI 4.0", to: "/timbrar-cfdi-4-0" },
  { texto: "Timbrar Referencia", to: "/timbrar-referencia" },
  { texto: "Timbrar ZIP", to: "/timbrar-zip" },
];

export const imagenesDudasTimbrar = {
  uno: imagenDudasUno,
  dos: imagenDudasDos,
  tres: imagenDudasTres,
  cuatro: imagenDudasCuatro,
};

export const parametrosPeticionCfdi = [
  ["username", "Usuario del web service", "Sí"],
  ["password", "Contraseña del web service", "Sí"],
  ["sxml", "XML del comprobante convertido a una cadena en base64.", "Sí"],
];

export const parametrosPeticionReferencia = [
  ...parametrosPeticionCfdi,
  [
    "external_id",
    "ID del comprobante en la base de datos del sistema integrador. Soporta hasta 30 caracteres numéricos.",
    "Sí",
  ],
];

export const parametrosRespuestaXml = [
  ["xml", "Campo que contiene el comprobante con el nodo TFD (Timbre Fiscal Digital)."],
];

export const erroresPeticionCfdi = [
  ["101", "Los datos de autentificación enviados son incorrectos."],
  ["102", "Su plan ha caducado, favor de contratar un nuevo plan."],
  ["103", "Se han agotado la cantidad de timbres, favor de contratar un nuevo plan."],
  ["104", "El valor del parámetro external_id no es válido. Error exclusivo del método timbrar_cfdi_referencia."],
  ["200", "Resultado exitoso."],
  ["111", "Por el momento solo se acepta 1 comprobante en el ZIP. Error exclusivo del método timbrar_zip."],
  ["112", "Archivo ZIP corrupto, no se pudieron recuperar los comprobantes. Error exclusivo del método timbrar_zip."],
  ["301", "El XML recibido no contiene una estructura válida."],
  ["302", "El parámetro sxml no contiene información."],
];

export const erroresPeticionReferencia = [
  ...erroresPeticionCfdi,
  ["303", "El XML recibido contiene un carácter Unicode inválido."],
  ["304", "El parámetro sxml debe contener un valor válido."],
  ["305", "La codificación del XML no está en UTF-8."],
  ["307", "El CFDI ya contiene un timbre previo; revise el nodo complemento."],
  ["308", "El XML no contiene la declaración del namespace xmlns:xsi conforme al Anexo 20."],
  ["309", "El XML no contiene la declaración del namespace xmlns:cfdi o de algún complemento conforme al Anexo 20."],
  ["310", "El XML no contiene la declaración xsi:schemaLocation conforme al Anexo 20."],
  ["999", "Error de comunicación con el servicio de timbrado."],
];

export const matricesSatCfdi33 = [
  [
    "CFDI33101 - CFDI33196",
    "Matriz de validaciones para el Comprobante Fiscal Digital por Internet versión 3.3.",
    "CFDI",
    "http://omawww.sat.gob.mx/tramitesyservicios/Paginas/anexo_20_version3-3.htm",
  ],
  [
    "CCE145 - CCE218",
    "Matriz de validaciones para complemento Comercio Exterior 1.1.",
    "Comercio Exterior",
    "https://www.sat.gob.mx/consultas/61165/comprobante-de-comercio-exterior",
  ],
  [
    "ECC121 - ECC125",
    "Matriz de validaciones para complemento Estado de Cuenta de Combustibles de Monederos Electrónicos 1.2.",
    "Estado de cuenta de combustibles",
    "https://www.sat.gob.mx/consulta/21885/genera-tus-facturas-electronicas-con-el-complemento-para-el-estado-de-cuenta-de-combustibles-para-monederos-electronicos",
  ],
  [
    "GCEH101 - GCEH133",
    "Matriz de validaciones para complemento de Gastos del Consorcio derivados de la Ejecución de un Contrato de Exploración o Extracción de Hidrocarburos 1.0.",
    "Gastos - Hidrocarburos",
    "https://www.sat.gob.mx/consulta/50282/conoce-los-complementos-para-consorcios-en-materia-de-hidrocarburos",
  ],
  [
    "IEEH101 - IEEH105",
    "Matriz de validaciones para complemento de Ingresos atribuibles a los Integrantes de un Consorcio.",
    "Ingresos - Hidrocarburos",
    "https://www.sat.gob.mx/consulta/50282/conoce-los-complementos-para-consorcios-en-materia-de-hidrocarburos",
  ],
  [
    "INE180 - INE188",
    "Matriz de validaciones para el CFDI versión 3.3 con complemento INE 1.1.",
    "INE",
    "https://www.sat.gob.mx/consulta/09695/genera-tus-facturas-con-el-complemento-del-ine-version-1.1",
  ],
  [
    "NOM132 - NOM225",
    "Matriz de validaciones para complemento Nómina 1.2.",
    "Nómina",
    "http://omawww.sat.gob.mx/tramitesyservicios/Paginas/complemento_nomina.htm",
  ],
  [
    "CRP101 - CRP239",
    "Matriz de validaciones del Complemento para Recepción de Pagos.",
    "Recepción de Pagos",
    "http://omawww.sat.gob.mx/tramitesyservicios/Paginas/recepcion_de_pagos.htm",
  ],
];

export const matricesSatCfdi40 = [
  [
    "CFDI40101 - CFDI40221",
    "Matriz de validaciones para el Comprobante Fiscal Digital por Internet versión 4.0.",
    "CFDI",
    "http://omawww.sat.gob.mx/tramitesyservicios/Paginas/anexo_20_version4-0.htm",
  ],
  [
    "CCE101 - CCE218",
    "Matriz de validaciones para complemento Comercio Exterior 1.1 Revisión C.",
    "Comercio Exterior",
    "https://www.sat.gob.mx/consultas/61165/comprobante-de-comercio-exterior",
  ],
  [
    "ECC121 - ECC125",
    "Matriz de validaciones para complemento Estado de Cuenta de Combustibles de Monederos Electrónicos 1.2.",
    "Estado de cuenta de combustibles",
    "https://www.sat.gob.mx/consulta/21885/genera-tus-facturas-electronicas-con-el-complemento-para-el-estado-de-cuenta-de-combustibles-para-monederos-electronicos",
  ],
  [
    "GCEH101 - GCEH133",
    "Matriz de validaciones para el complemento de Gastos del Consorcio derivados de un Contrato de Exploración o Extracción de Hidrocarburos 1.0.",
    "Gastos - Hidrocarburos",
    "https://www.sat.gob.mx/consulta/50282/conoce-los-complementos-para-consorcios-en-materia-de-hidrocarburos",
  ],
  [
    "IEEH101 - IEEH105",
    "Matriz de validaciones para complemento de Ingresos atribuibles a los Integrantes de un Consorcio.",
    "Ingresos - Hidrocarburos",
    "https://www.sat.gob.mx/consulta/50282/conoce-los-complementos-para-consorcios-en-materia-de-hidrocarburos",
  ],
  [
    "INE180 - INE188",
    "Matriz de validaciones para el CFDI versión 4.0 con complemento INE 1.1.",
    "INE",
    "https://www.sat.gob.mx/consulta/09695/genera-tus-facturas-con-el-complemento-del-ine-version-1.1",
  ],
  [
    "NOM1 - NOM109",
    "Matriz de validaciones para complemento Nómina 1.2.",
    "Nómina",
    "http://omawww.sat.gob.mx/tramitesyservicios/Paginas/complemento_nomina.htm",
  ],
  [
    "CRP20101 - CRP20274",
    "Matriz de validaciones del Complemento para Recepción de Pagos 2.0.",
    "Recepción de Pagos",
    "http://omawww.sat.gob.mx/tramitesyservicios/Paginas/recepcion_de_pagos.htm",
  ],
];
