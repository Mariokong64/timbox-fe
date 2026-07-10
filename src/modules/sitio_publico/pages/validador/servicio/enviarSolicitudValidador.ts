import { enviarFormDataValidador } from "../api/validadorApi";

const ACCION_VALIDAR_XML_TIMBOX = "validar_xml_timbox";

export interface SolicitudValidacionComprobante {
  archivo: File;
  captchaToken: string;
}

export function crearFormDataValidacionComprobante({
  archivo,
  captchaToken,
}: SolicitudValidacionComprobante): FormData {
  const formData = new FormData();

  formData.append("action", ACCION_VALIDAR_XML_TIMBOX);
  formData.append("file", archivo);
  formData.append("g-recaptcha-response", captchaToken);

  return formData;
}

export function enviarSolicitudValidacionComprobante(
  solicitud: SolicitudValidacionComprobante
): Promise<unknown> {
  const formData = crearFormDataValidacionComprobante(solicitud);

  return enviarFormDataValidador(formData);
}
