import { enviarContacto } from "../api/contactoApi";
import { limpiarFormularioContacto, type ContactoFormularioValores } from "./contactoServicio";

export interface SolicitudContacto {
  valores: ContactoFormularioValores;
  captchaToken: string;
}

export function crearPayloadContacto({ valores, captchaToken }: SolicitudContacto) {
  return {
    ...limpiarFormularioContacto(valores),
    captchaToken,
  };
}

export function enviarSolicitudContacto(solicitud: SolicitudContacto): Promise<unknown> {
  const payload = crearPayloadContacto(solicitud);

  return enviarContacto(payload);
}
