import imagenDudasTres from "../../assets/Componente-32.webp";
import imagenDudasDos from "../../assets/Componente-34.webp";
import imagenDudasUno from "../../assets/Componente-35.webp";
import imagenDudasCuatro from "../../assets/Componente-36.webp";

export const menuCancelar = [
  { texto: "Cancelar CFDI", to: "/cancelar-cfdi/" },
  { texto: "Cancelar CFDI seguro", to: "/cancelar-cfdi-seguro/" },
  { texto: "Consultar estatus", to: "/consultar-estatus/" },
  { texto: "Consultar documento relacionado", to: "/consultar-documento-relacionado/" },
  { texto: "Consultar peticiones pendientes", to: "/consultar-peticiones-pendientes/" },
  { texto: "Procesar respuesta", to: "/procesar-respuesta/" },
];

export const imagenesDudasCancelar = {
  uno: imagenDudasUno,
  dos: imagenDudasDos,
  tres: imagenDudasTres,
  cuatro: imagenDudasCuatro,
};

export const urlCancelacion = {
  pruebas: "https://staging.ws.timbox.com.mx/cancelacion/wsdl",
  produccion: "https://sistema.timbox.com.mx/cancelacion/wsdl",
};

export const regexUuid = "/^[a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}$/";

export const erroresPeticionReceptor = [
  ["CANC001", "Los datos de autentificación enviados son incorrectos."],
  ["CANC002", "Se han agotado la cantidad de timbres."],
  ["CANC003", "Parámetro inválido."],
  ["CANC302", "La llave_pem es una llave inválida."],
  ["CANC303", "El certificado de sellos no corresponde al receptor."],
  ["CANC304", "El certificado no se encuentra en la lista de LCO del SAT."],
  ["CANC305", "La fecha de cancelación no está dentro de la vigencia de CSD del receptor."],
  ["CANC306", "El certificado utilizado es de tipo FIEL; no es un CSD."],
  ["CANC307", "El certificado no fue expedido por el SAT."],
  ["CANC308", "La llave privada no corresponde al certificado."],
  ["CANC998", "Error de comunicación con el servicio del SAT; se generó un timeout."],
  ["CANC999", "Error de comunicación con el servicio de cancelación."],
];

export const parametrosReceptor = [
  ["username", "Usuario del web service.", "Sí"],
  ["password", "Contraseña del web service.", "Sí"],
  ["rfc_receptor", "El RFC que recibió el comprobante.", "Sí"],
  ["cert_pem", "El certificado, en formato PEM, que corresponde al receptor del comprobante.", "Sí"],
  ["llave_pem", "La llave, en formato PEM, que corresponde al receptor del comprobante.", "Sí"],
];
