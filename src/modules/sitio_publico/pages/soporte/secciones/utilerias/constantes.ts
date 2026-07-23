import imagenDudasTres from "../../assets/Componente-32.png";
import imagenDudasDos from "../../assets/Componente-34.png";
import imagenDudasUno from "../../assets/Componente-35.png";
import imagenDudasCuatro from "../../assets/Componente-36.png";

export const menuUtilerias = [
  { texto: "Buscar CFDI'S", to: "/buscar-cfdis/" },
  { texto: "Buscar Acuse Recepción", to: "/buscar-acuse-recepcion/" },
  { texto: "Recuperar Comprobante", to: "/recuperar-comprobante/" },
  { texto: "Recuperar Comprobante Referencia", to: "/recuperar-comprobante-referencia/" },
  { texto: "Obtener Consumo", to: "/obtener-consumo/" },
];

export const imagenesDudasUtilerias = {
  uno: imagenDudasUno,
  dos: imagenDudasDos,
  tres: imagenDudasTres,
  cuatro: imagenDudasCuatro,
};

export const urlTimbrado = {
  pruebas33: "https://staging.ws.timbox.com.mx/timbrado_cfdi33/wsdl",
  pruebas40: "https://staging.ws.timbox.com.mx/timbrado_cfdi40/wsdl",
  produccion33: "https://sistema.timbox.com.mx/timbrado_cfdi33/wsdl",
  produccion40: "https://sistema.timbox.com.mx/timbrado_cfdi40/wsdl",
};

export const regexRfc = "/[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]/";
export const regexUuid = "/^[a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12}$/";
